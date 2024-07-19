if (!this.myPlugin) {
    this.myPlugin = {};
}

/**
 * 创建一个图片瀑布流
 */
this.myPlugin.createWaterFall = function (option) {
    let defaultOptions = {
        minGap: 10, // 最小间隙
        imgSrcs: [], // 图片路径的数组
        imgWidth: 300, // 单张图片的宽度
        container: document.body // 容器
    };
    option = Object.assign({}, defaultOptions, option);
    let imgs = []; // 存放所有图片的dom对象

    // 处理父元素
    handleParent();
    // 创建图片元素
    createImage();
    // 窗口尺寸改变事件
    let debounce = myPlugin.debounce(setImgPosition, 300)
    window.onresize = debounce

    /**
     * 设置每一张图片的坐标
     */
    function setImgPosition() {
        let info = getHorizontalInfo();
        let arr = new Array(info.number); // 存放每一列下一张图片的top值
        arr.fill(0);
        imgs.forEach(function (img) {
            // 设置图片的坐标
            let minTop = Math.min.apply(null, arr);
            img.style.top = minTop + "px";
            let index = arr.indexOf(minTop); // 找到对应的列编号
            arr[index] += img.clientHeight + info.gap;

            // 横坐标
            img.style.left = index * (option.imgWidth + info.gap) + "px";
        });
        // 设置容器高度
        let maxTop = Math.max.apply(null, arr);
        option.container.style.height = maxTop - info.gap + "px";
    }

    /**
     * 得到图片上水平方向的信息
     */
    function getHorizontalInfo() {
        let obj = {};
        // 容器宽度
        obj.containerWidth = option.container.clientWidth;
        // 计算一行图片的数量
        obj.number = (obj.containerWidth + option.minGap) / (option.imgWidth + option.minGap);
        obj.number = Math.floor(obj.number); // 每行图片只能少，不能多
        // 计算水平空隙
        obj.gap = (obj.containerWidth - obj.number * option.imgWidth) / (obj.number - 1);

        return obj;
    }

    /**
     * 创建图片
     */
    function createImage() {
        let debounce = myPlugin.debounce(setImgPosition, 20); // 函数节流
        // 循环图片路径数组
        for(let i = 0; i <= option.imgSrcs.length - 1; i++) {
            let img = document.createElement("img");
            img.src = option.imgSrcs[i];
            img.style.width = option.imgWidth + "px";
            img.style.position = "absolute";
            img.style.transition = ".5s";
            imgs.push(img);
            img.onload = debounce; // 设置图片位置
            option.container.appendChild(img);
        }
    }

    /**
     * 处理父元素，因为图片都是绝对定位，父元素必须是一个定位元素
     */
    function handleParent() {
        // 如果父元素不是定位元素，则将其变为相对定位
        let style = getComputedStyle(option.container);
        if(style.position === "static") {
            option.container.style.position = "relative";
        }
        console.log(style.position);
    }

    console.log(option);
}


// if (!this.myPlugin) {
//     this.myPlugin = {};
// }

// /**
//  * 创建一个图片瀑布流
//  */
// this.myPlugin.imageWaterfallFlow = function(option) {
//     let defaultOption = {
//         defaultImgWidth: 220,
//         container: document.body,
//         defaultGap: 10,
//         imgSrcs: []
//     }

//     option = Object.assign({}, defaultOption, option);

    
// }
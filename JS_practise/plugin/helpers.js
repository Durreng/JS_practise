if (!this.myPlugin) {
    this.myPlugin = {};
}

// 继承
this.myPlugin.inherit = (function () {
    let Temp = function () {
        return function (son, father) {
            Temp.prototype = father.prototype;
            son.prototype = new Temp();
            son.prototype.constructor = son;
            son.prototype.uber = father.prototype;
        }
    }
}());

// obj2混合到obj1产生新的对象
this.myPlugin.mixin = function (obj1, obj2) {
    let newObj = {};

    for (let props in obj2) {
        newObj[props] = obj2[props];
    }

    for (let props in obj1) {
        if (!(props in obj2)) {
            newObj[props] = obj1[props];
        }
    }

    return newObj;
}

/**
 * 克隆一个对象
 * @param {boolean} deep 是否深度克隆
 */
this.myPlugin.clone = function (obj, deep) {
    // 判断类型
    if (Array.isArray(obj)) {
        if (deep) {
            // 数组深度克隆
            let newArr = [];
            for (let i = 0; i < obj.length; i++) {
                newArr.push(this.clone(obj[i], deep));
            }
        } else {
            return obj.slice(); // 复制数组
        }
    } else if (typeof obj === "object") {
        let newObj = {};
        for (let props in obj) {
            if (deep) {
                // 深度克隆
                newObj[props] = this.clone(obj[props], deep);
            } else {
                newObj[props] = obj[props];
            }
        }
        return newObj;
    } else {
        // 函数原始类型
        return obj; // 递归的终止条件
    }
}

/**
 * 函数防抖
 */
this.myPlugin.debounce = function (callback, time) {
    let timer;
    return function () {
        clearTimeout(timer); // 清除之前的计时器
        let args = arguments; // 利用闭包保存参数数组
        timer = setTimeout(() => {
            callback.apply(null, args);
        }, time);
    }
}

/**
 * 函数节流
 */
this.myPlugin.throttle = function (callback, time) {
    let timer;
    return function () {
        if(timer) {
            return;
        }

        let args = arguments; // 利用闭包保存参数数组
        timer = setTimeout(() => {
            callback.apply(null, args);
            timer = null; // 将计时器清空
        }, time);
    }
}
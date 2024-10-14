(async function () {
    /**
     * 从网格获取歌词数据
     * @returns 
     */
    async function getLrc() {
        return await fetch("https://study.duyiedu.com/api/lyrics")
            .then((resp) => resp.json())
            .then((resp) => resp.data);
    }

    const doms = {
        audio: document.querySelector('audio'),
        ul: document.querySelector('.lrc'),
        container: document.querySelector('.container')
    }

    const size = {
        liHeight: 30,
        constainerHeight: 420
    }

    let lrcData;

    // 1.初始化
    async function init() {
        // 拿到歌词，生成 li ，放入到 ul 中
        const lrc = await getLrc();
        // 将lrc -> [{ time: 86.09, words: '歌词内容' } ...]
        lrcData = lrc.split("\n").filter((s) => s).map((s) => {
            const parts = s.split("]");
            const timeParts = parts[0].replace('[', '').split(':');

            return {
                times: +timeParts[0] * 60 + +timeParts[1],
                words: parts[1],
            };
        });

        // 生成 li ，加入到 ul 中
        doms.ul.innerHTML = lrcData.map((lrc) => `<li>${lrc.words}</li>`).join('');
    }
    await init();

    // 2.交互事件
    // 1) 什么事件 2) 如何处理
    // audio 元素的播放进度变化的事件
    doms.audio.addEventListener('timeupdate', function () {
        setStatus(this.currentTime);
    });

    // 根据当前的播放进度，设置歌词状态
    function setStatus(time) {
        time += 0.5;
        // 1.根据时间找到对应的 li 高亮
        // 消除之前的 active
        const activeLi = document.querySelector('.active');
        activeLi && activeLi.classList.remove('active');
        const index = lrcData.findIndex(lrc => lrc.times > time) - 1;

        if (index < 0) {
            return;
        }
        doms.ul.children[index].classList.add('active');
        // 2.设置ul的滚动位置
        let top = size.liHeight * index + size.liHeight / 2 - size.constainerHeight / 2;
        top = -top;
        if (top > 0) {
            top = 0;
        }
        doms.ul.style.transform = `translateY(${top}px)`;
    }
})();
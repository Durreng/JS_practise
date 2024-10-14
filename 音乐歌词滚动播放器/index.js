(function () {
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

    // 1.初始化
    async function init() {
        // 拿到歌词，生成li，放入到ul中
        const lrc = await getLrc();
        // 将lrc -> [{ time: 86.09, words: '歌词内容' } ...]
        const result = lrc.split("\n").filter((s) => s).map((s) => {
            const parts = s.split("]");
            const timeParts = parts[0].replace('[', '').split(':');

            return {
                times: +timeParts[0] * 60 + +timeParts[1],
                words: parts[1],
            };
        });

        console.log(result);
    }
    init();

    // 2.交互事件
})();
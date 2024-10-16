(async function () {
  /**
   * 从网格获取当前数据
   * @returns Promise
   */
  async function getHeroes() {
    return fetch("https://study.duyiedu.com/api/herolist")
      .then((resp) => resp.json())
      .then((resp) => resp.data.reverse());
  }

  const doms = {
    ul: document.querySelector(".list"),
    radios: document.querySelectorAll(".radio"),
    txtKetword: document.querySelector(".input input"),
  };

  // 1. 初始化:加载所有的英雄数据,生成 li ,加入到 ul 中
  const allHeroes = await getHeroes();
  //   console.log(allHeroes);
  setHeroHTML(allHeroes);

  /**
   * 根据指定的英雄数组,生成对应 HTML ,放入到 ul 中
   * @param {*} heroes
   */
  function setHeroHTML(heroes) {
    doms.ul.innerHTML = heroes
      .map(
        (h) => `<li>
          <a href="https://pvp.qq.com/web201605/herodetail/${h.id_name}.shtml" target="_blank">
            <img
              src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/${h.ename}/${h.ename}.jpg"
              alt=""
            />
            <span>${h.cname}</span>
          </a>
        </li>`
      )
      .join("");
  }

  // 2. 用户交互
  for (const radios of doms.radios) {
    radios.addEventListener("click", function () {
      // 1. 更改 radio 的样式
      setChose(this);
      // 2. 更改 ul 中的数据
      searcHeros(this);
    });
  }

  doms.txtKetword.addEventListener("input", function () {
    const heroes = allHeroes.filter(h => h.cname.includes(this.value));
    setHeroHTML(heroes);
    // 设置 全部 为选中状态
    setChose(document.querySelector('.radio[data-type="all"'));
  });

  /**
   * 根据 radio 中提供的自定义属性,查询英雄数据,然后设置 html
   * @param {*} radio
   */
  function searcHeros(radio) {
    let heroes;
    // 笔记
    const type = radio.dataset.type;
    const value = radio.dataset.value;
    if (type === "all") {
      heroes = allHeroes;
    } else if (type === "pay_type") {
      heroes = allHeroes.filter((h) => h.pay_type === +value);
    } else if (type === "hero_type") {
      heroes = allHeroes.filter((h) => h.hero_type === +value);
    }

    setHeroHTML(heroes);
  }

  /**
   * 设置被选中的 radio
   */
  function setChose(radio) {
    // 删除之前的 checked 样式
    const checkedReadio = document.querySelector(".radio.checked");
    checkedReadio && checkedReadio.classList.remove("checked");
    // 给当前的 radio 添加样式
    radio.classList.add("checked");
  }
})();

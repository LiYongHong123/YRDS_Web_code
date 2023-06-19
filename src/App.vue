<template>
  <div class="container" id="container">
    <div class="page__hd"></div>
    <router-view />
    <div class="weui-footer">
      <div class="footer-top">
        <img src="./assets/left.png" />
        温馨提示
        <img src="./assets/right.png" />
      </div>兑换过程中，如果有任何疑问，请拨打
      <br />客服电话：
      <a href="tel:4000367567">4000367567</a>
    </div>
    <div class="footer"></div>
  </div>
</template>


<script>
export default {
  name: "App",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      name: "",
      code: ""
    };
  },
  onLoad() {
    let msg = "{{msg}}";
    if (msg && msg != "None") weui.topTips(msg);
    if (typeof history.pushState === "function") {
      history.pushState("jibberish", null, null);
      window.onpopstate = function() {
        history.pushState("newjibberish", null, null);
      };
    } else {
      let ignoreHashChange = true;
      window.onhashchange = function() {
        if (!ignoreHashChange) {
          ignoreHashChange = true;
          window.location.hash = Math.random();
        } else {
          ignoreHashChange = false;
        }
      };
    }
  },
  methods: {
    sub: function() {
      //卡密过滤
      if ($("#kami").val()) {
        //判断是否有卡密
        var kami = $("#kami").val();
        var reg = /[\u4e00-\u9fa5]/g; //正则 过滤汉字、字符
        kami = kami.replace(reg, "");
        $("#kami").val(kami);
      }
      //卡密过滤

      weui.form.validate(
        "form",
        function(error) {
          if (!error) {
            $("form").submit();
          }
        },
        {}
      );
    }
  }
};
</script>

<style>
@import url("./assets/weui.min.css");
@import url("./assets/weui.min.css");
html {
  height: 100%;
  background: #da3833;
}
.container {
  /* 底部背景图片 */
  background: url("./assets/bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
  margin: 0px auto;
  max-width: 480px;
  color: white;
}
h3,
h4 {
  text-align: center;
}
.page__hd {
  height: 420px;
  background-size: 100%;
  background-repeat: no-repeat;
}
.remark {
  padding: 10px;
  border: 4px solid #e5c57b;
  margin: 0 5px;
  border-radius: 14px;
}
.remark_info {
  padding: 10px;
  border: 4px solid #e5c57b;
  margin: 0 5px;
  border-radius: 14px;
  width: 79%;
  margin: 0 auto;
}
.kuang {
  position: fixed;
  top: 27%;
  left: 0;
  right: 0;
  margin: 0px auto;
  width: 80%;
  background: white;
  border: solid 5px #990011;
  color: black;
  border-radius: 19px;
  padding: 20px;
  z-index: 2;
}
.kuang p {
  color: #000;
}
.kuang .ok {
  width: 50%;
  margin: 0 auto;
  padding: 10px;
  text-align: center;
  background: #990011;
  border-radius: 8px;
  color: white;
  margin-top: 20px;
}

/* phoneKuang样式 */
.phoneKuang {
  position: fixed;
  display: none;
  top: 27%;
  left: 0;
  right: 0;
  margin: 0px auto;
  width: 80%;
  background: white;
  border: solid 5px #da3833;
  background-color: #fff;
  color: #000;
  border-radius: 19px;
  padding: 20px;
  z-index: 2;
}
.con {
  display: flex;
  justify-content: space-between; /* 两端对齐*/
}
.phoneKuang .ok {
  width: 35%;
  margin: 0 auto;
  padding: 10px;
  text-align: center;
  background: #da3833;
  border-radius: 8px;
  color: white;
  margin-top: 20px;
}
.fix {
  width: 100%;
  height: 100%;
  background: #ada4a4b0;
  position: fixed;
  top: 0;
  left: 0;
}
.kuang_title {
  font-weight: 800;
  text-align: center;
  margin-bottom: 8px;
}
</style>

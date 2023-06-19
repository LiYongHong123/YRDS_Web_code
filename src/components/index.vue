<template>
  <form
    class="weui-cells weui-cells_form"
    method="post"
    v-if="!code_info.activity &&!over_info.status"
  >
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <input
          class="weui-input"
          id="kami"
          placeholder="请输入权益券码"
          :οnkeyup="name = name.replace(/\s+/g,'')"
          name="name"
          v-model="name"
          required
        />
      </div>
    </div>
    <div>{{ code_info.activity }}</div>
    <div class="weui-cell weui-cell_vcode" style="padding: 10px 16px;">
      <div class="weui-cell__bd">
        <input
         :οnkeyup="code = code.replace(/\s+/g,'')"
          class="weui-input"
          placeholder="请输入验证码"
          name="code"
          v-model="code"
          required
          pattern=".{4}"
          emptyTips="请输入验证码"
          notMatchTips="请输入正确的验证码"
        />
      </div>
      <div class="weui-cell__ft">
        <i class="weui-icon-warn"></i>
        <img
          class="weui-vcode-img"
          src="/ka/code"
          width="120"
          onclick="this.src='/ka/code?t='+Date.now()"
        />
      </div>
    </div>
    <input type="hidden" name="openid" v-model="openid" />
    <div class="weui-cell" style=" padding-top: 30px;">
      <a @click="sub()" class="weui-btn weui-btn_primary">验证</a>
    </div>
  </form>
  <!--  组件之间的数据传递 必须用 :code_info="code_info" 这样的形式才能够将 父级数据传递给子组件-->
  <Code
    v-else-if="code_info.activity && !step"
    :code_info="code_info"
    :name="name"
    :openid="openid"
  ></Code>
  <!--  卡券详情组件-->
  <Info v-else-if="over_info.status==5" :over_info="over_info"></Info>
  <!--兑换完毕后页面-->
  <succ v-else-if="over_info.status!=5" :over_info="over_info"></succ>
</template>
<script src="https://cdn.bootcss.com/zepto/1.0rc1/zepto.min.js"></script>
<script>
//加载组件
import code from "./code.vue";
import info from "./info.vue";
import succ from "./succ.vue";
export default {
  name: "index",
  components: {
    //加载组件
    Code: code, //将别名demo 变成 组件 Demo
    Info: info, //将别名demo 变成 组件 Demo
    Succ: succ //将别名demo 变成 组件 Demo
  },
  mounted() {
    //如果是需要获取openid的产品 在进入卡券兑换页面之后在进行提示 让其在微信环境下打开
    //如果本来就是在微信环境下就不需要提示
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf("micromessenger") != -1;
    var isAndroid = ua.indexOf("android") != -1;
    var isIos = ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1;
    if (!isWeixin) {
    } else {
      console.log("当前微信环境");
      console.log(!this.$route.query.code);
      //当前为微信环境
      //判断当前路径是否有code
      if (!this.$route.query.code) {
        // this.init(""); //调用init获取openid
        //微信环境下没有code 获取appid
      }
    }
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      name: "",
      code: "",
      url: "",
      step: 0,
      //用来存放 check后传递的数据
      code_info: {},
      over_info: {},
      appid: "",
      openid: ""
    };
  },
  methods: {
    init: function(code) {
      //如果有code则调用init接口获取openid
      //如果没有code则获取appid从而获取到code
      //获取用户微信id
      //获取当前路径，判断是否有coed吗
      var _this = this;
      $.ajax({
        type: "POST",
        url: "/ka/api/init",
        data: { code: code },
        async: true,
        cache: true,
        dataType: "json",
        success: function(res) {
          console.log(res["appid"]);
          if (res["openid"]) {
            _this.openid = res["openid"];
          }
          if (res["appid"]) {
            _this.appid = res["appid"];
            window.location.href =
              "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
              res["appid"] +
              "&redirect_uri=https%3A%2F%2Fwx.yrds.com.cn%2Fcore%2F&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
          }
        },
        error: function(msg) {
          weui.topTips("获取微信信息失败", 3000);
        }
      });
    },
    sub: function() {
      //必须将this赋给_this  应为在异步获取中要使用到this的数据而在异步中this指的是异步函数的
      let _this = this;
      //卡密过滤
      if ($("#kami").val()) {
        //判断是否有卡密
        var kami = $("#kami").val();
        var reg = /[\u4e00-\u9fa5]/g; //正则 过滤汉字、字符
        kami = kami.replace(reg, "");
        $("#kami").val(kami);
      }
      //卡密过滤
      //validate 为插件 用来做form表单的提交
      weui.form.validate(
        "form",
        function(error) {
          //如果form表单的数据提交符合要求
          if (!error) {
            //ajax 异步获取数据（调用check接口）
            $.ajax({
              type: "POST",
              url: "/ka/api/check",
              data: { name: _this.name, code: _this.code },
              async: true,
              cache: true,
              dataType: "json",
              success: function(res) {
                console.log(res["step"]);
                let msg = res["msg"];
                //如果msg 有数据则 弹出提示框
                if (msg && msg != "None") weui.topTips(msg);
                // 如果res['sku'] 有值说明 根据卡券和验证吗可以活动相关数据 数据无误
                if (res["sku"]) {
                  //将卡券数据付给code_info 方便后期卡券的兑换
                  _this.code_info = res;
                }
                if (res["step"]) {
                  //已兑换 进行再次兑换
                  _this.over_info = res;
                }
              },
              error: function(msg) {
                weui.topTips("失败请稍后再试", 3000);
              }
            });
          }
        },
        {}
      );
    },
    codes: function() {
      //验证吗图片 函数
      let _this = this;
      $.ajax({
        type: "GET",
        headers: {
          Accept: "*/*"
        },
        url: "/ka/code",
        async: true,
        cache: true,
        dataType: "text",
        success: function(res) {
          let url =
            "data:image/png;base64," +
            btoa(
              new Uint8Array(res).reduce(
                (res, byte) => res + String.fromCharCode(byte),
                ""
              )
            );
          console.log(url);
        },
        error: function(res) {
          weui.topTips("验证码获取失败，请稍后在试", 3000);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  /* color: #42b983; */
  color: #fff;
}
</style>

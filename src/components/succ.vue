<!--
 * @Author: 李永宏 860775126@qq.com
 * @Date: 2022-11-25 10:46:19
 * @LastEditors: 李永宏 860775126@qq.com
 * @LastEditTime: 2022-11-25 11:25:17
 * @FilePath: \core-dev\src\components\succ.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <h3 class="page__title succee" style="color: #DCBF8E">{{over_info.head}}</h3>
    <div class="weui-cell">
      <div style="color: #fff;margin: 0 auto;">
        <h4>兑换{{ over_info.param }}: {{over_info.account}}</h4>
      </div>
    </div>
    <div class="weui-cell" style="color: black;">
      <div class v-if="retry">
        <h4 style="margin: 0 auto;">
          <a style="color: #fff" :href="'retry?id='+retry">请点击链接，稍后再试</a>
        </h4>
      </div>
      <div class v-else style="margin: 0 auto; color: #fff">
        <h4>预计48小时内到账，请关注到账通知</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Succ",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      head: "",
      param: "",
      account: "",
      retry: ""
    };
  },
  props: {
    over_info: {
      //这个就是父组件中子标签自定义名字
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
</style>

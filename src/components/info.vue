<template>
  <div>
    <div class="weui-cell"  style="color: black;    position: inherit;">
      <div class="weui-cell__hd"><label class="weui-label">活动 </label></div>
      <div class="weui-cell__bd">{{over_info.activity}}</div>
    </div>
    <div class="weui-cell" style="color: black" v-if="is_link">
      <div class="weui-cell__hd"><label class="weui-label">兑换链接</label></div>
      <div class="weui-cell__bd"><a :href="over_info.account">点击打开</a></div>
    </div>
    <div class="weui-cell" style="color: black" v-else>
      <div class="weui-cell__hd"><label class="weui-label">卡密</label></div>
      <div class="weui-cell__bd">{{over_info.account}}</div>
    </div>
    <div class=" param  remark_info" style="color: black">
      <div class="weui-cell__hd" style="margin-bottom: 15px;"><label class="weui-label" style="  text-align: left;">说明</label></div>
      <div class="weui-cell__bd text_con">{{over_info.remark}}</div>
    </div>
    <div class="kuang">
      <div class="weui-cell__bd text_show">
        <p class="kuang_title">说明</p>
        {{over_info.remark}}
      </div>
      <div class="ok"  @click="close_read()">确认已阅读</div>
    </div>
    <div class="fix"></div>
  </div>
</template>

<script>
export default {
  name: "info",
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      account:'',
      activity:'',
      remark:'',
      safe:'',
      is_link:0
    }
  },props:{
    over_info:{           //这个就是父组件中子标签自定义名字
      type:Object,
      required:true
    },
  },
  mounted(){
    //渲染说明部分 弹出框的说明 和页面的说明
    // $('.kuang').find(".text_show")[0].innerHTML=this.over_info.remark
    // $('.text_con')[0].innerHTML=this.over_info.remark

    $('.kuang').hide();
    $('.fix').hide();
    if(this.over_info.account.indexOf('http')!= -1){
          this.is_link=1;
        }
  },
  methods:{
    close_read:function(){
      //关闭弹出框
      $('.kuang').hide();
      //关闭灰色图层
      $('.fix').hide();
    }
  }
}
</script>

<style scoped>

</style>

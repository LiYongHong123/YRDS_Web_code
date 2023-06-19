<template>
  <div class="codes" v-if="!over_info.status">
    <form class="weui-cells weui-cells_form" method="post" >
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">活动</label></div>
        <div class="weui-cell__bd">{{code_info.activity}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">商品</label></div>
        <div style="line-height: 32px">
          <li  v-for="(value,index) in code_info.sku">
            <input type="radio" :value="value.id" name="sku" tips="请选择商品" @click="cc(value.param,value.id)" :disable="value.enable==false?'disabled':''"/>{{value.name}}</br>
          </li>
        </div>
      </div>
      <div class="weui-cell param account" style="display:none;">
        <div class="weui-cell__hd"><label class="weui-label">账号</label></div>
        <div class="weui-cell__bd">
          <input v-model="phoneNum" class="weui-input" :οnkeyup="phoneNum = phoneNum.replace(/\s+/g,'')" emptyTips="请输入账号" placeholder="请输入账号">
        </div>
      </div>
      <div class="weui-cell param phone" style="display:none;" >
        <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
        <div class="weui-cell__bd">
          <input v-model="phoneNum" :οnkeyup="phoneNum = phoneNum.replace(/\s+/g,'')" class="weui-input" type="tel" pattern="[0-9]{11}"  emptyTips="请输入手机号" notMatchTips="请输入正确的手机号" placeholder="请输入手机号" maxlength=11>
        </div>
      </div>
      <div class="weui-cell param msgCode" style="display:none;">
        <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" pattern="[0-9]{6}" emptyTips="请输入手机验证吗" notMatchTips="请输入正确的手机验证码" placeholder="请输入手机验证码" maxlength=6>
          <a href="" ></a>
        </div>
      </div>
      {{remark}}
      <div class=" param remark" style="display:none">
        <div class="weui-cell__hd" style="    margin-bottom: 15px;"><label class="">说明:</label></div>
        <div  v-for="(value,index) in code_info.sku" v-if="value.enable !== false" :class="'weui-cell__bd text text_con'+value.id" style="display: none;">{{ value.remark }}</div>
        <div class="weui-cell__bd text_show"></div>

      </div>


      <div class="weui-cell button sub1">
        <a @click="confirmPhone()" class="weui-btn weui-btn_primary">兑换</a>
      </div>
      <div class="weui-cell button sub2" style="display:none">
        <a @click="verifyCodeCheck()" class="weui-btn weui-btn_primary">发送验证码</a>
      </div>


      <input type="hidden" name="name" v-model="name"/>
      <input type="hidden" name="jdsign"/>
      <input type="hidden"  id="openid" v-model="openid">

    </form>
    <!--    {#弹出框#}-->
    <div class="kuang">
      <div class="weui-cell__bd text_show">
        <p class="kuang_title">说明</p>
        <div  v-for="value in code_info.sku"  v-if="value.enable !== false" >{{ value.remark }}</div>
      </div>
      <div class="ok" @click="close_read()">确认已阅读</div>
    </div>
    <div class="fix"></div>
    <!--{#弹出框#}-->

       <!-- 确认手机按钮框 -->
    <div class="phoneKuang">
      <div class="weui-cell__bd text_show" style="color:#000">
        <div></div>
      </div>
      <div class="con">
          <div class="ok" @click="sub()">确认</div>
          <div class="ok" @click="close_confirmPhone()">返回</div>
      </div>
    </div>
    <div class="fix"></div>
    <!-- 确认手机按钮框 END -->
  </div>
  <!--兑换完毕后页面-->
  <succ v-else-if="over_info.status!=5" :over_info="over_info" ></succ>
  <Info v-else-if="over_info.status!=5" :over_info="over_info" ></Info>
</template>

<script>
import info from "./info.vue";
import succ from "./succ.vue";

export default {
  name: "Code",
  components: {
    'Info': info,  //将别名demo 变成 组件 Demo
    'Succ': succ  //将别名demo 变成 组件 Demo
  },
  //父组件 传递的数据 在props中获取
  props:{
    code_info:{           //这个就是父组件中子标签自定义名字
      type:Object,
      required:true
    },
    name:{
      type:String,
      required: true
    },
    openid:{
      type:String,
      required: true
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      account:'',
      activity:'',
      code:'',
      sku:[],
      remark:'',
      param:'',
      over_info:{},
      phoneNum: ''
    }
  },mounted(){
    //mounted 组件在html页面未进行渲染的时候触发的事件
    // var p=$('input[type="radio"]').not(':disabled');
    // if(p.length == 1){
    //     if($(".remark").find(".text").eq(0)[0].outerText){
    //     $('.kuang').find(".text_show")[0].innerHTML=$(".remark").find(".text").eq(0)[0].outerText
    //   }
    // } else {
    //   //关闭弹出框
    //   $('.kuang').hide();
    //   //关闭灰色图层
    //   $('.fix').hide();
    // }
    // if(p.length) p[0].click()
    // else {
    //   let msg = '没有库存，请稍后再试'
    //   weui.topTips(msg);
    //   $('.button').html('<h4 style="margin:auto">'+msg);
    // }
    
    // 页面加载时不显示弹出框和遮罩层。
   $('.kuang').hide();
   //关闭灰色图层
   $('.fix').hide();
  },methods:{
    // 点击兑换按钮弹框
    confirmPhone:function(){
      let _this = this;

        // 兑换时弹出确认手机号码框
        // 打开弹出框
        $('.phoneKuang').show();
        // 获取手机号码
        // window.console.log(this.phoneNum)
        $('.phoneKuang').find(".text_show")[0].innerHTML= this.param == 'phone' ? "您输入的手机号是:" + _this.phoneNum : `您输入的账号是: ${_this.phoneNum}`  ;
        // 打开灰色图层
        $('.fix').show();
    },
    // 点击取消按钮取消弹框
    close_confirmPhone:function(){
      //关闭弹出框
      $('.phoneKuang').hide();
      //关闭灰色图层
      $('.fix').hide();
    },
    sub:function (){
      let _this=this;
      if(this.code_info)
        weui.form.validate('form', function (error) {
          let sku=$('input[name=sku]:checked').val();
          let account=$('input[name=account]').val();
          let jdsign=$('input[name=jdsign]').val();
          let msgCode=$('input[name=msgCode]').val();
          let my_data;
          if(_this.param){//如果param有值 需要传递account
            my_data={
              "name":_this.name,
              "sku":sku,
              "account":account,
              "jdsign":jdsign,
              "msgCode":msgCode,
            }
          }else{//不需要
            my_data={
              "name":_this.name,
              "sku":sku,
            }
          }
          if (!error) {
            $.ajax({
              type:"POST",
              url:"/ka/api/use",
              data:my_data,
              async:true,
              cache:true,
              dataType:"json",
              success:function (res) {
                console.log(res)
                let msg=res['msg'];
                if(msg && msg != 'None') weui.topTips(msg);
                if(res['status']!=3){
                  _this.over_info=res;
                  console.log(_this.over_info.status!=5)
                  console.log(_this.over_info.status)
                }
              },
              error:function (msg) {
                weui.topTips('兑换失败请稍后再试', 3000);
              }
            });
          }
        }, {})
    },
    close_read:function(){
      //关闭弹出框
      $('.kuang').hide();
      //关闭灰色图层
      $('.fix').hide();
    },
    cc:function(o,r){
      //o 为卡券需要的信息数据
      $('.param').hide()
      $('.sub2').hide();
      $('.sub1').show();
      $('.param input').removeAttr('required').removeAttr('name')
      //更新parm 判断调用use接口的时候是否需要进行account的参数传递
      this.param=o;
      console.log(o.split(','))
      $.each(o.split(','), (x,o)=>{
        if(o == 'msgCode'){
          $('.sub1').hide(); $('.sub2').show();
        }else if(o=='openid'){
          var ua = navigator.userAgent.toLowerCase();
          var isWeixin = ua.indexOf('micromessenger') != -1;
          var isAndroid = ua.indexOf('android') != -1;
          var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
          if (!isWeixin) {
            $('.sub1').hide();
            weui.topTips('请在微信端打开');
          }else{
            $('#openid').attr('name', 'account')
          }
        }else if(o==''){

        }else{
          $('.'+o).show()
          $('.'+o+' input').attr('required', 1).attr('name', 'account')
        }
      })
      if(r){
        //隐藏的说明text内容存放的id的class名;
        let names='.text_con'+r
        console.log(names)
        //判断商品说明是否有内容
        if($(names)[0].outerText){
          //显示说明内容
          $('.remark').show()
          //将说明内容放到显示的div中（可用来解决富文本的text 内容无法进行渲染的问题）
          $('.remark').find(".text_show")[0].innerHTML=$(names)[0].outerText
          $('.kuang').find(".text_show")[0].innerHTML=$(names)[0].outerText
        }
      }
    },
    verifyCodeCheck:function(){
      var _this=this
      weui.form.validate('form', e=>{
        if(!e){
          //添加了 面额id的参数传递用来后期判断该商品的要走的上游通道id
          var param = {account: $('[name=account]').val(),sku: $('[name=sku]',).val()}
          if($('[name=msgCode]').val())
            param['msgCode'] = $('[name=msgCode]').val()
          //如果有jdsign内容则将内容上传 没有的话就不要上传 如果上传了 会影响到其他的
          if($('[name=jdsign]').val())
            param['jdsign'] = $('[name=jdsign]').val()
          $.post('/ka/msgCode', param, o=>{
            if(o.code == 0){
              if(o.jdsign){
                //如果有jdsign 则将数值放到form表单中方便提交验证码的时候一起将数据进行传递过期
                $('[name=jdsign]').val(o.jdsign)
              }
              if($('[name=msgCode]').val()){ // 验证码校验完
                _this.sub()
              }else{ // 验证码发送完
                o = 'msgCode'
                $('.'+o).show()
                $('.'+o+' input').attr('required', 1).attr('name', 'msgCode')
                $('.sub2 a').html('兑换')
              }
            }else{

              weui.topTips(o.msg);
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
li{
  list-style-type: none
}
</style>

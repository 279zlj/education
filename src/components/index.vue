<template>
  <div id="index">
    <Row id="all">
      <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 6 }" id="left">
        <p id="title">智慧教育平台</p>
        <div v-if="who==='login'">
        <div class="position">
          <span class="ff">账号：</span>
          <Input v-model="user" prefix="ios-contact" type="text" placeholder="Enter name" style="width: 55%" size="large" autofocus></Input>
        </div>
        <div class="position">
          <span class="ff">密码：</span>
          <Input v-model="pwd" prefix="ios-key" type="password" placeholder="Enter password" style="width: 55%" size="large" @keyup.enter.native="login()"></Input>
          <Alert type="error" show-icon style="width: 70%;display: none" id="toop">账号或密码错误</Alert>
        </div>

        <Col :xs="{span:16,offset:4}" :lg="{span:16,offset:4}">
          <Button type="primary" long style="margin: 8em 0 0 0" @click="login()">登录</Button>
          <Button type="warning" long style="margin: 1em 0 5em 0" @click="registers()">注册</Button>
        </Col>
        </div>
        <div v-if="who==='register'" style="padding:0 3em">
          <Form ref="rdata" :model="rdata" :label-width="80" :rules="rvaliate">
            <FormItem label="用户名" prop="uname">
              <Input type="text" v-model="rdata.uname"></Input>
            </FormItem>
            <FormItem label="密码" prop="rpwd">
              <Input type="password" v-model="rdata.rpwd"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="rsurepwd">
              <Input type="password" v-model="rdata.rsurepwd"></Input>
            </FormItem>
            <FormItem>
              <a @click="changelogin()">已有账号？</a>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="rsend('rdata')">提交</Button>
              <Button style="margin-left: 8px" @click="handleReset('rdata')">重置</Button>
            </FormItem>
          </Form>
        </div>
      </Col>
      <Col :xs="{ span: 11 }" :lg="{ span: 6 }" id="logo">
        <i class="ivu-icon ivu-icon-ios-book-outline icon-img"></i>
        <p class="fff">智慧教育平台</p>
        <p class="ffff">smart education platform</p>
      </Col>

    </Row>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    const validatename = (rule,value,callback)=>{
      if (value==''){
        callback(new Error('请输入用户名'))
      } 
      else {
        callback()
      }
    };
    const validaterwd = (rule,value,callback)=>{
      if (value==''){
        callback(new Error('请输入密码'))
      }
      else if (this.rdata.rsurepwd !==''){
        this.$refs.rdata.validateField('rsurepwd')
      }
      else
        callback()
    };
    const validatersurepwd = (rule,value,callback)=>{
      if (value===''){
        callback(new Error('请再次输入密码'))
      }
      else if(value !==this.rdata.rpwd){
        callback(new Error('两次输入密码不一致'))
      }
      else
        callback()
    };
    return {
      user:'',
      pwd:'',
      who:'login',
      rdata:{
        uname:'',
        rpwd:'',
        rsurepwd:'',

      },
    rvaliate: {
      uname: [{validator: validatename, trigger: 'blur'}],
      rpwd: [{validator: validaterwd, trigger: 'blur'}],
      rsurepwd: [{validator: validatersurepwd, trigger: 'blur'}]
    }
    }
  },
  methods:{
    login(){
      if (this.user=='admin'&& this.pwd=='admin'){
        this.$router.push('manager')
        sessionStorage.setItem('operator',this.user)
      }
      else if(this.user=='teacher' && this.pwd=='123456'){
        this.$router.push('teacher')
        sessionStorage.setItem('operator',this.user)
      }
      else if (this.user=='student' && this.pwd=='123456'){
        this.$router.push('student')
        sessionStorage.setItem('operator',this.user)
      }
      else {
        $('#toop').css({'display':'table'})
        setTimeout(function () {
          $('#toop').css({'display':'none'})
        },2000)
      }
    },
    registers(){
      this.who='register'
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    rsend(name){
      this.$refs[name].validate((valid=>{
        if (valid){
          this.$Message.success('OK')
        }
        else {
          this.$Message.error('Error')
        }
      }))
    },
    changelogin(){
      this.who='login'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #index{
    height: 100%;
    width: 100%;
    margin: 0;
    background: url("../../static/images/bg.png") no-repeat;
    background-size: cover;
  }
  #all{
    padding-top: 12em;

  }
  #title{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size:2.5em;
    font-weight: 700;
    margin: 3em 0 2.5em 2.5em;
    color: #144365;
  }
  #left{
    background-color: white;
    border-bottom-left-radius: 1em;
    border-top-left-radius: 1em;
    height: 45em;
  }
  .position{
    width: 100%;height:4em;margin-left:6.5em
  }
  .ff{
    font-weight: 700;
    font-size: 1.5em
  }
  .icon-img{
    font-size: 12em;
    color: white;
    text-align: center;
    display: block;
    margin-top: 1em;
  }
  .fff{
    font-size: 2em;
    text-align: center;
    color: white;
    margin-top: 3em;
  }
  .ffff{
    font-size: 1.5em;
    text-align: center;
    color: white;
    margin-bottom: 6em;
  }
  #logo{
    background-color: #00223E;
    opacity: .75;
    height: 45em;
    border-bottom-right-radius: 1em;
    border-top-right-radius: 1em;
  }
</style>

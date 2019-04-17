<template>
  <div id="index">
    <Row id="all">
      <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 6 }" id="left">
        <p id="title">智慧教育平台</p>
        <div>
          账号：
          <Input v-model="user" prefix="ios-contact" type="text" placeholder="Enter name" style="width: auto"></Input>
        </div>
        <div>
          密码：
          <Input v-model="user" prefix="ios-key" type="password" placeholder="Enter password" style="width: auto"></Input>
        </div>
      </Col>
      <Col :xs="{ span: 11 }" :lg="{ span: 6 }">222</Col>

    </Row>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      user:''
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
    padding-top: 10em;

  }
  #title{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size:3em;
    font-weight: 700;
    margin: 3em 0 3em 2em;
    color: #144365;
  }
  #left{
    background-color: white;
    border-radius: 1em;
  }
</style>

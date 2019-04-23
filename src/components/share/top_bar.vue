<template>
  <div id="top_bar">
    <Row class="top">
      <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 3, offset: 2 }">
        <p class="tt">智慧教育平台</p>
      </Col>
      <Col :xs="{ span:5, offset: 1 }" :lg="{ span: 10, offset: 2 }">
        <Menu mode="horizontal"  :active-name="acitvename">
          <router-link :to="{name:'manager'}"><MenuItem name="1" v-if="who=='admin'">
            <Icon class="ivu-icon ivu-icon-ios-person"></Icon>
            管理员
          </MenuItem></router-link>
          <Submenu  name="2" v-if="who=='teacher'">
            <template slot="title">
              <Icon class="ivu-icon ivu-icon-md-person"></Icon>
              教师
            </template>
            <MenuGroup title="管理">
              <router-link :to="{name:'teacher'}"><MenuItem name="2-1">班级管理</MenuItem></router-link>
              <router-link :to="{name:'lab'}"><MenuItem name="2-2">实验管理</MenuItem></router-link>
              <router-link :to="{name:'report'}"><MenuItem name="2-3">报告管理</MenuItem></router-link>
            </MenuGroup>
          </Submenu >
          <router-link :to="{name:'student'}"><MenuItem name="3" v-if="who=='student'">
            <Icon class="ivu-icon ivu-icon-ios-people"></Icon>
            学生
          </MenuItem></router-link>
        </Menu>
      </Col>
      <Col :xs="{ span:5, offset: 1 }" :lg="{ span: 3, offset: 2 }">
        <Col :xs="{ span:7}" :lg="{ span: 7 }">
          <img src="../../../static/images/logo.png" style="width: 100%;border-radius: 50%;background-color: white;padding: .5em;margin-top: .5em"/>
        </Col>
        <Col :xs="{ span:8, offset: 1 }" :lg="{ span: 8, offset: 1  }">
          <div style="font-size: 1.7em;margin-bottom: .5em;color: white">{{who}}</div>
          <Button  type="primary"  ghost @click="outlogin()">退出</Button>
        </Col>
      </Col>
    </Row>
  </div>
</template>

<script>
    export default {
        name: "top_bar",
      data(){
          return{
            acitvename:'1',
            who:sessionStorage.getItem('operator')
          }
      },
      methods:{
        outlogin(){
          this.out=true
          this.$Modal.confirm({
            title:'退出确认',
            content:'退出系统',
            onOk:()=>{
              this.$router.push('/')
            },
            onCancel:()=>{
              this.$Message.info('Clicked cancel');
            }
          })
        },
        menuList(){  // 这个方法里定义好，高亮和路由
          let aaa = location.hash   // 获取到地址拦上#号后面的url地址
          if(aaa == '#/manager'){  // 是否包含，-1是包含，0不包含
            this.acitvename = '1'
          }
          else if(aaa == '#/student'){  // 是否包含，-1是包含，0不包含
            this.acitvename = '3'
          }
          else if (aaa == '#/teacher' ) {  // 是否包含，-1是包含，0不包含
            this.acitvename = '2-1'
          }
          else if (aaa == '#/lab'){
            this.acitvename = '2-2'
          }
          else if (aaa == '#/report') {
            this.acitvename = '2-3'
          }
        }
      },
      mounted(){
          this.menuList()

      }
    }
</script>

<style scoped>
    #top_bar{
      width: 100%;

    }
    .top{
      padding: 4em 0;
    }
  .tt{
    font-size: 2.5em;
    color: white;
    line-height: 2em;
  }
  a{
    color: inherit;
  }
</style>

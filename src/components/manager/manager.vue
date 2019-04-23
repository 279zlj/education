<template>
    <div id="manager">
      <Row>
        <Col :xs="{span:3,offset:21}" :lg="{span:3,offset:21}">
          <Tooltip content="新增" placement="bottom">
            <Button type="info" ghost shape="circle" icon="md-add" style="color: white;margin-bottom: 1em" @click="adduser()"></Button>
          </Tooltip>
        </Col>
      </Row>
      <Row>
        <Col :xs="{span:21,offset:1}" :lg="{span:20,offset:2}">
          <Table  ref="selection" :columns="title" :data="dataall" height="500" no-data-text="暂无数据" style="border-radius: 1em;"></Table>
        </Col>
      </Row>
      <Modal v-model="add" title="添加新用户" :mask-closable="false">
        <Form ref="formdata" :model="formdata" :label-width="80" :rules="addvalidate">
          <FormItem label="用户名" prop="usern">
            <Input type="text" v-model="formdata.usern" placeholder="输入用户名"></Input>
          </FormItem>
          <FormItem label="密码" prop="pwd">
            <Input type="password" v-model="formdata.pwd" ></Input>
          </FormItem>
          <FormItem label="确认密码" prop="surepwd">
            <Input type="password" v-model="formdata.surepwd"></Input>
          </FormItem>
          <FormItem label="角色" prop="role">
            <Select v-model="formdata.role">
              <Option value="student">学生</Option>
              <Option value="teacher">老师</Option>
              <Option value="manager">管理员</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="send('formdata')">提交</Button>
            <Button style="margin-left: 8px" @click="cancel()">取消</Button>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" style="display: none">取消</Button>
          <Button  type="primary" size="large" style="display: none">确定</Button>
        </div>
      </Modal>
      <Modal v-model="mpwd" title="修改密码" :mask-closable="false">
        <Form ref="formdata" :model="formdata" :label-width="80" :rules="addvalidate">
          <FormItem label="用户名">
            <span>{{who}}</span>
          </FormItem>
          <FormItem label="新密码" prop="newpwd">
            <Input type="password" v-model="formdata.newpwd"></Input>
          </FormItem>
          <FormItem label="确认密码" prop="surenewpwd">
            <Input type="password" v-model="formdata.surenewpwd"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="send('formdata')">提交</Button>
            <Button style="margin-left: 8px" @click="cancel()">取消</Button>
          </FormItem>
        </Form>
      </Modal>
      <Modal v-model="cont" title="修改用户信息" :mask-closable="false" >
        <Form ref="formdata" :model="formdata" :label-width="80" :rules="addvalidate">
        <FormItem label="用户角色" prop="modifyrole">
          <Select v-model="formdata.modifyrole">
            <Option value="student">学生</Option>
            <Option value="teacher">老师</Option>
            <Option value="manager">管理员</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="send('formdata')">提交</Button>
          <Button style="margin-left: 8px" @click="cancel()">取消</Button>
        </FormItem>
        </Form>
      </Modal>
    </div>
</template>

<script>
    import Top_bar from "../share/top_bar";
    export default {
        name: "manager",
      components: {Top_bar},
      data(){
          const validateusername = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入用户名'));
            }else if(value.length<3){
              callback(new Error('请输入长度大于3的用户名'))
            }
            else {
              callback();
            }

          };
        const validatepwd = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.formdata.surepwd !== '') {
              this.$refs.formdata.validateField('surepwd');
            }
              callback();
          }
        };
        const validatesurepwd = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.formdata.pwd) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        const validaterole=(rule,value,callback)=>{
          if (value === '') {
            callback(new Error('请选择角色'));
          } else {
            callback();
          }
        };
        const validatenewpwd = (rule,value,callback)=>{
          if (value==''){
            callback(new Error('请输入新密码'))
          }
          else {
            if(this.formdata.surenewpwd !== ''){
            this.$refs.formdata.validateField('surenewpwd');
          }
            callback();
          }
        };
        const validatesurenewpwd = (rule,value,callback)=>{
          if (value=='') {
            callback(new Error('请再次输入密码'))
          }else if (value !== this.formdata.newpwd) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        }
          return{

            title:[
              // {type:'selection',width:60,align:'center'},
              {title:'用户名',key:'username'},
              {title:'角色',key:'role'},
              {
                title:'操作',
                key:'operation',
                width:650,
                align:'center',
                render:(h,params) =>{
                  return h('div',[
                    h('Button',{
                      props:{
                        type:'primary',
                        ghost:'ghost'
                      },
                      style:{
                        marginRight:'2em'
                      },
                      on:{
                        click:()=>{
                          this.modifypwd(params.index)
                        }
                      }
                    },'修改密码'),
                    h('Button', {
                      props: {
                        type: 'primary',
                        ghost:'ghost'
                      },
                      style:{
                        marginRight:'2em'
                      },
                      on: {
                        click: () => {
                          this.modifyc(params.index)
                        }
                      }
                    }, '编辑角色'),
                    h('Button', {
                      props: {
                        type: 'error',
                        ghost:'ghost'
                      },
                      on: {
                        click: () => {
                          this.remove(params.index)
                        }
                      }
                    }, '删除用户'),

                  ])
                }
              }
            ],
            dataall:[
              {username:'student1',role:'学生'},
              {username:'student2',role:'学生'},
              {username:'student3',role:'学生'},
              {username:'student4',role:'学生'},
            ],
            formdata: {
              usern: '',
              role: '',
              pwd: '',
              surepwd: '',
              newpwd:'',
              surenewpwd:'',
              modifyrole:''
            },
            addvalidate:{
              usern:[{validator:validateusername,trigger:'blur'}],
              pwd:[{validator:validatepwd,trigger:'blur'}],
              surepwd:[{validator:validatesurepwd,trigger:'blur'}],
              role:[{validator:validaterole,trigger:'blur'}],
              newpwd:[{validator:validatenewpwd,trigger:'blur'}],
              surenewpwd:[{validator:validatesurenewpwd,trigger:'blur'}],
              modifyrole:[{validator:validaterole,trigger:'blur'}],
            },
            add:false,
            mpwd:false,
            cont:false,
            who:''
          }
      },
      methods: {
        modifypwd (index) {
          this.who=this.dataall[index].username
          this.mpwd=true
        },
        modifyc(index){
          this.who=this.dataall[index].username
          this.cont=true
        },
        remove (index) {
          this.$Modal.info({
            title: '删除用户',
            content: `删除用户：${this.dataall[index].username}`,
            okText: '确认',
            cancelText: '取消',
            closable:true,
            onOk:()=>{
              this.dataall.splice(index, 1);
            },
            onCancel:()=>{
              this.$Message.info('Clicked cancel');
            }
          })

        },
        adduser(){
          this.add=true
        },
        cancel(){
          this.add=false
          this.mpwd=false
          this.cont=false
        },

        send(name){
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.$Message.success('Success!');
            } else {
              this.$Message.error('Fail!');
            }
          })
        },
      }
    }
</script>

<style scoped>
  #manager{
    width: 100%;

    margin: 0;
    padding: 0;
  }

</style>

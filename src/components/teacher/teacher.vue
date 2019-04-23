<template>
    <div id="teacher">
      <Row>
        <Col :xs="{span:3,offset:21}" :lg="{span:3,offset:21}">
          <Tooltip content="新增" placement="bottom">
            <Button type="info" ghost shape="circle" icon="md-add" style="color: white;margin-bottom: 1em" @click="addclass()"></Button>
          </Tooltip>
        </Col>
      </Row>
      <Row>
        <Col :xs="{span:21,offset:1}" :lg="{span:20,offset:2}">
          <Table  ref="selection" :columns="ttitle" :data="datateacher" height="500" no-data-text="暂无数据" style="border-radius: 1em;"></Table>
        </Col>
      </Row>
      <Modal v-model="tadd" title="添加新用户" :mask-closable="false">
        <Form ref="tdata" :model="tdata" :label-width="80" :rules="tvalidate">
          <FormItem label="班级名称" prop="classn">
            <Input type="text" v-model="tdata.classn" placeholder="输入班级名称"></Input>
          </FormItem>
          <FormItem label="年级" prop="grade">
            <Input type="text" v-model="tdata.grade" ></Input>
          </FormItem>
          <FormItem label="人数" prop="people">
            <Input type="number" v-model="tdata.people"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="tsend('tdata')">提交</Button>
            <Button style="margin-left: 8px" @click="tcancel()">取消</Button>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" style="display: none">取消</Button>
          <Button  type="primary" size="large" style="display: none">确定</Button>
        </div>
      </Modal>
      <Modal v-model="tmodify" title="编辑班级信息" :mask-closable="false">
        <Form ref="tdata" :model="tdata" :label-width="80" :rules="tvalidate">
          <FormItem label="年级" prop="dgrade">
            <Input type="text" v-model="tdata.dgrade"></Input>
          </FormItem>
          <FormItem label="人数" prop="dpeople">
            <Input type="number" v-model="tdata.dpeople"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="tsend('tdata')">提交</Button>
            <Button style="margin-left: 8px" @click="tcancel()">取消</Button>
          </FormItem>
        </Form>
      </Modal>
    </div>
</template>

<script>
    export default {
        name: "teacher",
      data(){
          const validateclassn = (rule,value,callback)=>{
            if (value===''){
              callback(new Error('请输入班级名称'))
            }
            else
              callback()
          };
          const validategrade =(rule,value,callback)=>{
            if (value===''){
              callback(new Error('请输入年级'))
            }
            else
              callback()
          };
          const validatepeople = (rule,value,callback)=>{
            if (value===''){
              callback(new Error('请输入人数'))
            }
            else
              callback()
          };
          const validatedgrade = (rule,value,callback)=>{
            if (value === '') {
              callback(new Error('请输入年级'))
            }
            else
              callback()
          };
          const validatedpeople = (rule ,value , callback)=>{
            if (value===''){
              callback(new Error('请输入人数'))
            }
            else
              callback()
          };
          return{
            ttitle:[
              {title:'班级名',key:'classname'},
              {title:'年级',key:'grade'},
              {title:'人数',key:'people'},
              {
                title:'操作',
                key:'opera',
                width:450,
                align:'center',
                render:(h,paras)=>{
                  return h('div',[
                    h('Button',{
                      props: {
                        type: 'primary',
                        ghost:'ghost'
                      },
                      style:{
                        marginRight:'2em'
                      },
                      on:{
                        click:()=>{
                          this.modifyclass(paras.index)
                        }
                      }
                    },'编辑班级'),
                    h('Button',{
                      props:{
                        type:'error',
                        ghost:'ghost'
                      },
                      style:{
                        marginRight:'2em'
                      },
                      on:{
                        click:()=>{
                          this.deleteclass(paras.index)
                        }
                      }
                    },'删除班级')
                  ])
                }
              }
            ],
            datateacher:[
              {classname:'计算机1班',grade:'大一',people:'244'},
              {classname:'计算机2班',grade:'大一',people:'425'},
              {classname:'计算机3班',grade:'大一',people:'356'},
            ],
            tdata:{
              classn:'',
              grade:'',
              people:'',
              dgrade:'',
              dpeople:''
            },
            tvalidate: {
              classn: [{validator: validateclassn, trigger: 'blur'}],
              grade: [{validator: validategrade, trigger: 'blur'}],
              people: [{validator: validatepeople, trigger: 'blur'}],
              dgrade: [{validator: validatedgrade, trigger: 'blur'}],
              dpeople: [{validator: validatedpeople, trigger: 'blur'}],
            },
            tadd:false,
            tmodify:false
          }
      },
      methods:{
          addclass(){
            this.tadd=true
            if (this.$refs['tdata'] !== undefined) {
              this.$refs['tdata'].resetFields();
            }
          },
        tsend(name){
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.$Message.success('Success!');
            } else {
              this.$Message.error('Fail!');
            }
          })
        },
        tcancel(){

          this.tadd=false;
          this.tmodify=false;
        },
        deleteclass(index){
          this.$Modal.info({
            title: '删除班级',
            content: `删除班级：${this.datateacher[index].classname}`,
            okText: '确认',
            cancelText: '取消',
            closable:true,
            onOk:()=>{
              this.datateacher.splice(index, 1);
            },
            onCancel:()=>{
              this.$Message.info('取消');
            }
          })
        },
        modifyclass(){
          this.tmodify=true
          if (this.$refs['tdata'] !== undefined) {
            this.$refs['tdata'].resetFields();
          }
        }
      }
    }
</script>

<style scoped>

</style>

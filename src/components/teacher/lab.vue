<template>
    <div id="lab">
      <Row>
        <Col :xs="{span:3,offset:21}" :lg="{span:3,offset:21}">
          <Tooltip content="新增" placement="bottom">
            <Button type="info" ghost shape="circle" icon="md-add" style="color: white;margin-bottom: 1em" @click="addlab()"></Button>
          </Tooltip>
        </Col>
      </Row>
      <Row>
        <Col :xs="{span:21,offset:1}" :lg="{span:20,offset:2}">
          <Table  ref="selection" :columns="ltitle" :data="datalab" height="500" no-data-text="暂无数据" style="border-radius: 1em;"></Table>
        </Col>
      </Row>
      <Modal v-model="labadd" title="新增实验室信息" :mask-closable="false">
        <Form ref="ldata" :model="ldata" :label-width="80" :rules="lvalidate">
          <FormItem label="实验名" prop="lname">
            <Input type="text" v-model="ldata.lname"></Input>
          </FormItem>
          <FormItem label="开放时间" prop="ltime">
            <DatePicker type="date" placeholder="Select date" v-model="ldata.sdate"></DatePicker>
            <TimePicker type="time" placeholder="Select time" v-model="ldata.stime"></TimePicker>
            <p>-</p>
            <DatePicker type="date" placeholder="Select date" v-model="ldata.edate"></DatePicker>
            <TimePicker type="time" placeholder="Select time" v-model="ldata.etime"></TimePicker>
          </FormItem>
          <FormItem label="开放班级" prop="lclass">
            <Input type="text" v-model="ldata.lclass"></Input>
          </FormItem>
          <FormItem label="是否开放">
            <i-switch v-model="ldata.switch" size="large">
              <span slot="open">On</span>
              <span slot="close">Off</span>
            </i-switch>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="lsend('ldata')">提交</Button>
            <Button style="margin-left: 8px" @click="lcancel()">取消</Button>
          </FormItem>
        </Form>
      </Modal>
      <Modal v-model="lmodify" title="编辑实验室信息" :mask-closable="false">
        <Form ref="ldata" :model="ldata" :label-width="80" :rules="lvalidate">
          <FormItem label="实验名" prop="laname">
            <Input type="text" v-model="ldata.lname"></Input>
          </FormItem>
          <FormItem label="开放时间" prop="latime">
            <DatePicker type="date" placeholder="Select date" v-model="ldata.sdate"></DatePicker>
            <TimePicker type="time" placeholder="Select time" v-model="ldata.stime"></TimePicker>
            <p>-</p>
            <DatePicker type="date" placeholder="Select date" v-model="ldata.edate"></DatePicker>
            <TimePicker type="time" placeholder="Select time" v-model="ldata.etime"></TimePicker>
          </FormItem>
          <FormItem label="开放班级" prop="laclass">
            <Input type="text" v-model="ldata.lclass"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="lsend('ldata')">提交</Button>
            <Button style="margin-left: 8px" @click="lcancel()">取消</Button>
          </FormItem>
        </Form>
      </Modal>
    </div>
</template>

<script>
    export default {
        name: "lab",
      data(){
        const validatename = (rule,value,callback)=>{
          if (value===''){
            callback(new Error('请输入实验名'))
          }
          else
            callback()
        };
        const validateltime = (rule,value,callback)=>{
          if (value===''){
            callback(new Error('请输入开放日期'))
          }
          else if(this.ldata.sdate==''||this.ldata.stime==''|| ethis.ldata.date==''|| this.ldata.etime==''){

          }
          else
            callback()
        };
        const validateclass = (rule,value,callback)=>{
          if (value===''){
            callback(new Error('输入开放班级'))
          }
          else
            callback()
        };

          return{

            ltitle:[
              {title:'实验名',key:'labname'},
              {title:'实验状态',key:'status'},
              {title:'开放时间',key:'opentime'},
              {title:'开放班级',key:'openclass'},
              {
                title:'操作',
                key:'opera',
                width:650,
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
                          this.closelab(paras.index)
                        }
                      }
                    },'关闭实验室'),
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
                          this.openlab(paras.index)
                        }
                      }
                    },'开放实验室'),
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
                            this.modifylab(paras.index)
                          }
                        }

                    },'编辑实验室'),
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
                          this.deletelab(paras.index)
                        }
                      }
                    },'删除实验室')
                  ])
                }
              }
            ],
            datalab:[
              {labname:'OpenStack',status:'open',opentime:'2019-4-12 (15:00-17:00)',openclass:'计算机1班'},
              {labname:'Hadoop',status:'close',opentime:'2019-4-13 (15:00-17:00)',openclass:'计算机2班'},
            ],
            ldata:{
              lname:'',
              sdate:'',
              stime:'',
              edate:'',
              etime:'',
              ltime:'',
              lclass:'',
              laname:'',
              latime:'',
              laclass:'',
              switch:''

            },
            lvalidate:{
              lname:[{validator:validatename,trigger:'blur'}],
              ltime:[{validator:validateltime,trigger:'blur'}],
              lclass:[{validator:validateclass,trigger:'blur'}],
              laname:[{validator:validatename,trigger:'blur'}],
              latime:[{validator:validateltime,trigger:'blur'}],
              laclass:[{validator:validateclass,trigger:'blur'}],
              // switch:[{validator:validateswitch,trigger:'blur'}]
            },
            lmodify:false,
            labadd:false
          }
      },
      methods:{
          addlab(){
            this.labadd=true
          },
        closelab(name){
          this.$Modal.info({
            title:'关闭',
            content:`关闭实验室:${this.datalab[name].labname}`,
            okText:'确认',
            closable:true,
            onOk:()=>{
              this.$Message.info('关闭成功')
            },
            onCancel:()=>{
              this.$Message.info('取消')
            }
          })
        },
        openlab(name){
          this.$Modal.info({
            title:'开放',
            content:`开放实验室:${this.datalab[name].labname}`,
            okText:'确认',
            closable:true,
            onOk:()=>{
              this.$Message.info('开放成功')
            },
            onCancel:()=>{
              this.$Message.info('取消')
            }
          })
        },
        modifylab(){
          this.lmodify=true
        },
        deletelab(name){
          this.$Modal.info({
            title:'删除',
            content:`删除实验室:${this.datalab[name].labname}`,
            okText:'确认',
            closable:true,
            onOk:()=>{
              this.datalab.splice(name,1)
            },
            onCancel:()=>{
              this.$Message.info('取消')
            }
          })
        },
        lsend(name){
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.$Message.success('Success!');
            } else {
              this.$Message.error('Fail!');
            }
          })
        },
        lcancel(){
          this.lmodify=false
          this.labadd=false
        }
      }
    }
</script>

<style scoped>

</style>

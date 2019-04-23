<template>
    <div id="student">
      <Row id="s">
        <Col :xs="{span:21,offset:1}" :lg="{span:20,offset:2}">
          <Table  ref="selection" :columns="stitle" :data="datastudent" height="500" no-data-text="暂无数据" style="border-radius: 1em;"></Table>
        </Col>
      </Row>
      <Modal v-model="ss" title="报告内容" :mask-closable="false">
        <span>详情</span>
      </Modal>
    </div>
</template>

<script>
    export default {
        name: "student",
      data(){
          return{
            stitle:[
              {title:'实验名',key:'sname'},
              {title:'描述',key:'scontent'},
              {title:'实验状态',key:'sstatus'},
              {title:'开放时间',key:'sopentime'},
              {title:'开放班级',key:'sclass'},
              {
                title:'报告',
                key:'report',
                width:100,
                align:'center',
                render:(h,paras)=>{
                  return h('div',[
                    h('Button',{
                      props:{
                        type:'primary',
                        ghost:'ghost'
                      },
                      on:{
                        click:()=>{
                          this.seereport(paras.index)
                        }
                      }
                    },'查看报告')
                  ])
                }
              },
              {
                title:'操作',
                key:'operat',
                width:350,
                align:'center',
                render:(h,paras)=>{
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
                          this.subm(paras.index)
                        }
                      }
                    },'提交报告'),
                    h('Button',{
                      props:{
                          type:'primary',
                          ghost:'ghost'
                        },
                        on:{
                          click:()=>{
                            this.start(paras.index)
                          }
                        }

                    },'开始实验')
                  ])
                }
              }
            ],
            datastudent:[
              {sname:'OpenStack部署实验',scontent:'OpenStack安装',sstatus:'进行',sopentime:'2019-4-12 (15:00-17:00)',sclass:'计算机2班'},
              {sname:'Hadoop部署实验',scontent:'Hadoop安装',sstatus:'进行',sopentime:'2019-4-14 (15:00-17:00)',sclass:'计算机2班'},
            ],
            ss:false
          }
      },
      methods:{
        seereport(index){
          this.ss=true
        },
        subm(index){
          this.$Modal.info({
            title:'提交',
            content:`提交报告${this.datastudent[index].sname}`,
            okText:'确认',
            cancelText:'取消',
            closable:true,
            onOk:()=>{
              this.$Message.info("已提交")
            }
          })
        },
        start(index){

        }
      }
    }
</script>

<style scoped>
  #s{
    margin-top: 3.8em;
  }
</style>

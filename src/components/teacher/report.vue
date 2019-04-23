<template>
    <div id="report">
      <Row id="r">
        <Col :xs="{span:21,offset:1}" :lg="{span:20,offset:2}">
          <Table  ref="selection" :columns="rtitle" :data="datareport" height="500" no-data-text="暂无数据" style="border-radius: 1em;"></Table>
        </Col>
      </Row>
    </div>
</template>

<script>
    export default {
        name: "report",
      data(){
          return{
            rtitle:[
              {title:'实验名',key:'rname'},
              {title:'描述',key:'rcontent'},
              {title:'实验状态',key:'rstatus'},
              {title:'开放时间',key:'ropentime'},
              {title:'开放班级',key:'ropenclass'},
              {
                title:'操作',
                key:'opera',
                width:450,
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
                        this.readerport(paras.index)
                      }
                    }
                  },'查看报告'),
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
                          this.dowmload(paras.index)
                        }
                      }
                    },'批量下载')
                  ])
                }
              }
            ],
            datareport:[
              {rname:'OpenStack',rcontent:'OpenStack安装',rstatus:'open',ropentime:'2019-4-12 (15:00-17:00)',ropenclass:'计算机1班'},
              {rname:'Hadoop',rcontent:'Hadoop安装',rstatus:'close',ropentime:'2019-4-13 (15:00-17:00)',ropenclass:'计算机2班'},
            ]
          }
      },
      methods:{
        readerport(index){

        },
        dowmload(index){

        },
        addreport(){

        }
      }
    }
</script>

<style scoped>
  #r{
    margin-top: 3.8em;
  }
</style>

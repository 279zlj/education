<template>
  <div id="app">
    <router-view name="top"></router-view>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
html,body{
  width:100%;
  height:100%;
  margin: 0;
  padding: 0;
}
  #app{
    background-image:url("../static/images/index_bg.png") ;
    background-size: cover;
  }
.ivu-table-wrapper {
  border:none
}
.ivu-table td{
  background-color: #012B49;
  opacity: .8;
  color: #fff;
  border:none;
  font-size: 1.2em;
}
.ivu-table-header th{
  color:#92A3AE;
  font-weight: bold;
  background-color: #012B49;
  font-size: 1.3em;
  height: 3em;
  /*border: none;*/
}
.ivu-table-row-hover td {
  background-color: #00365A !important;
}
  .ivu-table-body{
    background-color: #012B49;

  }

</style>

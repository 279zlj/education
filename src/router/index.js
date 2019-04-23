import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import manager from '@/components/manager/manager'
import teacher from '@/components/teacher/teacher'
import lab from '@/components/teacher/lab'
import report from '@/components/teacher/report'
import student from '@/components/student/student'
import top_bar from '@/components/share/top_bar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path:'/manager',
      name:'manager',
      components:{
        top:top_bar,
        default:manager
      }
    },
    {
      path:'/teacher',
      name:'teacher',
      components:{
        top:top_bar,
        default:teacher
      }
    },
    {
      path:'/report',
      name:'report',
      components:{
        top:top_bar,
        default:report
      }
    },
    {
      path:'/lab',
      name:'lab',
      components:{
        top:top_bar,
        default:lab
      }
    },
    {
      path:'/student',
      name:'student',
      components:{
        top:top_bar,
        default:student
      }
    },
    {
      path:'top_bar',
      name:'top_bar',
      component:top_bar
    }
  ]
})

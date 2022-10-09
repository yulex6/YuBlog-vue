import { createRouter, createWebHistory } from 'vue-router'
import RootLogin from '../views/root/RootLogin.vue'
import RootPages from '../views/root/RootPages.vue'
import PageMessage from '../components/root/PageMessage.vue'
import PageSingle from '../components/root/PageSingle.vue'
import NoFound from '../components/NoFound404.vue'
import MainPage from '../views/MainPage.vue'
import All from '../components/ArtAll.vue'
import ArtSingle from '../components/ArtSingle.vue'
import Add from '../components/root/PageAdd.vue'
import {ElMessage} from "element-plus";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name: 'main',
      component:MainPage,
      //标志是否需要身份验证
      meta: { requiresAuth: false },
      children:[
        {
          path: '',
          name: 'allArt',
          component: All
        },
        {
          path: '/:title',
          name: 'ArtSingle',
          component: ArtSingle,
          props: true
        }
      ]
    },
    {
      path: '/root',
      name: 'login',
      component: RootLogin,
      meta: { requiresAuth: false }
    },
    {
      path:'/root/:username',
      name:'pageController',
      component:RootPages,
      meta: { requiresAuth: true },
      props: true,
      children:[
        {
          path:'',
          name:'home',
          component:PageMessage,
          meta: { requiresAuth: true },
        },
        {
          path:'/root/:username/:title',
          name:'PageSingle',
          component:PageSingle,
          meta: { requiresAuth: true },
        },
        {
          path: '/root/:username/add',
          name: 'Add',
          component: Add,
          meta: { requiresAuth: true },
          props: true
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name:'404',
      component: NoFound
    }
  ]
})
//未登录弹窗
const fail = () => {
  ElMessage.error('未登录，请登录！')
}

//如果未登录则跳转登录页面
router.beforeEach(async (to,from) =>{
  if (to.meta.requiresAuth &&!isAuthenticated() && to.name !== 'login'){
    fail()
    return {name: 'login'}
  }
})

function isAuthenticated(){
 let  token =  localStorage.getItem('token')
  return token != null;
}
export default router

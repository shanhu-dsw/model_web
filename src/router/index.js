import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path:"/charts",
    name:"charts",
    component:()=> import('@/components/charts/index')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path:"/service",
    component:Layout,
    redirect:'/service',
    children:[{
      path:'service',
      name: 'Service',
      component:() => import('@/views/service/index'),
      meta:{ title:'服务控制',icon:'example'}
    }]
  },
  {
    path:"/space",
    component:Layout,
    redirect:'/space',
    children:[{
      path:'space',
      name: 'space',
      component:() => import('@/views/space/index'),
      meta:{ title:'硬件状态',icon:'tree'}
    }]
  },{
    path:"/readlog",
    component:Layout,
    redirect:'/readlog',
    children:[{
      path:'readlog',
      name: 'readlog',
      component:() => import('@/views/readlog/index'),
      meta:{ title:'日志管理',icon:'nested'}
    }]
  },{
    path:"/datamanage",
    component:Layout,
    redirect:'/datamanage',
    children:[{
      path:'datamanage',
      name: 'datamanage',
      component:() => import('@/views/datamanage/index'),
      meta:{ title:'数据管理',icon:'user'}
    }]
  },
  {
    path: '/getlocation',
    component: Layout,
    redirect: '/getlocation',
    children: [{
      path: 'getlocation',
      name: 'getlocation',
      component: () => import('@/views/getlocation/index'),
      meta: { title: '预警控制', icon: 'dashboard' }
    }]
  },
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history',
  base: '/hr/',
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

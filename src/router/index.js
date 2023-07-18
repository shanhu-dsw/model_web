import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

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
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/charts",
    name: "charts",
    component: () => import("@/components/charts/index"),
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: '首页', icon: 'dashboard' }
  //   }]
  // },
  {
    path: "/",
    component: Layout,
    redirect: "/model/model_list/index",
    meta: { title: "模型管理", icon: "el-icon-odometer", activeMenu: "/model" },
    children: [
      {
        path: "model/model_list/index",
        name: "model_list",
        component: () => import("@/views/model/model_list/index"),
        meta: { title: "模型列表" },
      },
      {
        path:"change_password/index",
        name:"change_password",
        component: () => import("@/views/change_password/index"),
        meta: { title: "修改密码" },
        hidden: true,
      },
      {
        path: "model/model_type/modelType",
        name: "model_type",
        component: () => import("@/views/model/model_type/model_type"),
        meta: { title: "模型类型" },
      },
      {
        path: "/model/model_list/create",
        name: "create_model",
        component: () => import("@/views/model/model_list/create"),
        meta: { title: "创建模型" },
        hidden: true,
      },
      {
        path: "/model/model_list/show",
        name: "show_model",
        component: () => import("@/views/model/model_list/show"),
        meta: { title: "模型详情" },
        hidden: true,
      },
      {
        path: "/model/model_list/edit",
        name: "edit_model",
        component: () => import("@/views/model/model_list/edit"),
        meta: { title: "模型编辑" },
        hidden: true,
      }
    ],
  },

  {
    path: "/location_events/index",
    component: Layout,
    meta: { title: "智能预警", icon: "el-icon-refrigerator" },
    children: [
      {
        path: "",
        name: "locationEvents",
        component: () => import("@/views/location_events/index"),
        meta: { title: "智能预警" },
      },
      {
        path: "/location_events/show",
        name: "ShowLocationEvents",
        component: () => import("@/views/location_events/show"),
        meta: { title: "预警详情" },
        hidden: true,
      },
    ],
  },
  {
    path: "/resource",
    component: Layout,
    redirect: "/cameras/index",
    meta: { title: "资源管理", icon: "el-icon-bell" },
    children: [
      {
        path: "cameras/index",
        name: "cameras",
        component: () => import("@/views/resource/cameras/index"),
        meta: { title: "监控管理" },
      },
      {
        path: "cameras/show",
        name: "camerasShow",
        component: () => import("@/views/resource/cameras/show"),
        meta: { title: "监控详情" },
        hidden: true,
      },
      {
        path: "cameras/create",
        name: "camerasCreate",
        component: () => import("@/views/resource/cameras/create"),
        meta: { title: "新增监控" },
        hidden: true,
      },
      {
        path: "cameras/edit",
        name: "camerasEdit",
        component: () => import("@/views/resource/cameras/edit"),
        meta: { title: "编辑监控" },
        hidden: true,
      },
      {
        path: "location/index",
        name: "location",
        component: () => import("@/views/resource/location/index"),
        meta: { title: "房间管理" },
      },
      {
        path: "location_type/index",
        name: "locationType",
        component: () => import("@/views/resource/location_type/index"),
        meta: { title: "房间类型" },
      },
      {
        path: "location/create",
        name: "locationCreate",
        component: () => import("@/views/resource/location/create"),
        meta: { title: "新增房间" },
        hidden: true,
      },
      {
        path: "location/show",
        name: "locationShow",
        component: () => import("@/views/resource/location/show"),
        meta: { title: "房间详情" },
        hidden: true,
      },
      {
        path: "location/edit",
        name: "locationEdit",
        component: () => import("@/views/resource/location/edit"),
        meta: { title: "编辑房间" },
        hidden: true,
      },
      {
        path: "location_label/index",
        name: "locationLabel",
        component: () => import("@/views/resource/location_label/index"),
        meta: { title: "标注管理" },
      }
    ],
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/capture/index",
    meta: { title: "系统管理", icon: "example" },
    children: [
      {
        path: "capture/index",
        name: "capture",
        component: () => import("@/views/system/capture/index"),
        meta: { title: "抓拍引擎管理" },
      },
      {
        path: "capture/create",
        name: "captureCreate",
        component: () => import("@/views/system/capture/create"),
        meta: { title: "新增抓拍引擎" },
        hidden: true,
      },
      {
        path: "capture/edit",
        name: "captureEdit",
        component: () => import("@/views/system/capture/edit"),
        meta: { title: "编辑抓拍引擎" },
        hidden: true,
      },
      {
        path: "vision/index",
        name: "vision",
        component: () => import("@/views/system/vision/index"),
        meta: { title: "识别引擎管理" },
      },
      {
        path: "vision/create",
        name: "visionCreate",
        component: () => import("@/views/system/vision/create"),
        meta: { title: "新增识别引擎" },
        hidden: true,
      },
      {
        path: "vision/edit",
        name: "visionEdit",
        component: () => import("@/views/system/vision/edit"),
        meta: { title: "编辑识别引擎" },
        hidden: true,
      }
    ],
  },
  
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () =>
  new Router({
    mode: "history",
    base: "/hr/",
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes],
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

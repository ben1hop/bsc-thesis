import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TotalPage.vue') }],
  },
  {
    path: '/total',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TotalPage.vue') }],
  },
  {
    path: '/perTool',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PerToolPage.vue') }],
  },
  {
    path: '/compare',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ComparePage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

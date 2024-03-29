import { createRouter, RouteRecordRaw, createWebHistory, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
        meta: {
            title: '首页'
        }
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'active',
    routes,
});

export default router;

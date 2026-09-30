import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'

//路由表
const routers: Array<RouteRecordRaw> = [
    {
        path: '/',
       // 访问首页直接重定向登录页
         redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    // {
    //     path: '/register',
    //     name: 'Register',
    //     component: () => import('@/views/Register.vue')
    // },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound',
    //     component: () => import('@/views/NotFound.vue')
    // }
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
    routes: routers
})

//全局路由守卫：判断是否登录
router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    if (to.meta.requireAuth && !userStore.token) {
        //需要登录，没有token--登录页
        next('/login')
    } else {
        next()
    }
})

export default router
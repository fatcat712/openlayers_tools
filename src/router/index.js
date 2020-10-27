import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import baseMap from '../views/baseMap.vue'
import multiLayer from '../views/multiLayer.vue'
Vue.use(VueRouter)
const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/basemap',
    children: [{
            // 当 /user/:id/profile 匹配成功，
            // UserProfile 会被渲染在 User 的 <router-view> 中
            path: 'basemap',
            component: baseMap
        },
        {
            // 当 /user/:id/posts 匹配成功
            // UserPosts 会被渲染在 User 的 <router-view> 中
            path: 'multilayer',
            component: multiLayer
        }
    ]
}]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router
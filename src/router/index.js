import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)
const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/basemap',
    children: [{
            path: 'basemap',
            component: () => import("../views/baseMap.vue")
        },
        {
            path: 'multilayer',
            component: () => import("../views/multiLayer.vue")
        },
        {
            path: 'overlay',
            component: () => import("../views/overlay.vue")
        },
        {
            path: 'layerprobe',
            component: () => import("../views/layerProbe.vue")
        },
        {
            path: 'situation',
            component: () => import("../views/situation.vue")
        },
        {
            path: 'distance',
            component: () => import("../views/distance.vue")
        },
        {
            path: 'area',
            component: () => import("../views/area.vue")
        },
        {
            path: 'rollershutters',
            component: () => import("../views/rollerShutters.vue")
        }
    ]
}]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router
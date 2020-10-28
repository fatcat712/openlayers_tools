import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import baseMap from '../views/baseMap.vue'
import multiLayer from '../views/multiLayer.vue'
import overlay from '../views/overlay.vue'
import distance from '../views/distance.vue'
import area from '../views/area.vue'
import rollerShutters from '../views/rollerShutters.vue'
import layerProbe from '../views/layerProbe.vue'
Vue.use(VueRouter)
const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/basemap',
    children: [{
            path: 'basemap',
            component: baseMap
        },
        {
            path: 'multilayer',
            component: multiLayer
        },
        {
            path: 'overlay',
            component: overlay
        },
        {
            path: 'distance',
            component: distance
        },
        {
            path: 'area',
            component: area
        },
        {
            path: 'rollershutters',
            component: rollerShutters
        },
        {
            path: 'layerprobe',
            component: layerProbe
        }
    ]
}]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router
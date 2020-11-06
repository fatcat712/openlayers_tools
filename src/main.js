import Vue from 'vue';
import App from './App.vue';
import router from './router';
import http from './server/http';
import api from './server/api';
import './registerServiceWorker';
import {
    routerBeforeEach
} from '@/router/routerGuards';
import {
    AutomaticImport
} from './utils';
import './utils/directive';
import {
    Container,
    Header,
    Aside,
    Main,
    Menu,
    MenuItem,
    Drawer,
    Button,
    Slider
} from 'element-ui';
import VueCesium from 'vue-cesium'
import lang from 'vue-cesium/lang/zh-hans'
// import lang from 'vue-cesium/lang/en-us'
import 'ol/ol.css';
import './assets/css/reset.less';
Vue.use(VueCesium)
Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Aside.name, Aside);
Vue.component(Main.name, Main);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Drawer.name, Drawer);
Vue.component(Button.name, Button);
Vue.component(Slider.name, Slider);
Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$api = api;
AutomaticImport();
routerBeforeEach();
// 注册一个全局自定义指令 `v-throttle`
Vue.directive('throttle', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function(el) {
        // 聚焦元素
        el.focus()
    },
    update() {}
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
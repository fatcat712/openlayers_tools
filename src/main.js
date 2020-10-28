import Vue from 'vue'
import App from './App.vue'
import router from './router';
import http from './server/http';
import api from './server/api';
import './registerServiceWorker'
import {
    routerBeforeEach
} from '@/router/routerGuards';

import {
    Container,
    Header,
    Aside,
    Main,
    Menu,
    MenuItem,
    Drawer,
    Button
} from 'element-ui';


import 'ol/ol.css';
import './assets/css/reset.less';

Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Aside.name, Aside);
Vue.component(Main.name, Main);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Drawer.name, Drawer);
Vue.component(Button.name, Button);

Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$api = api;

routerBeforeEach();

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
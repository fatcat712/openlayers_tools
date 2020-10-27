import Vue from 'vue'
import App from './App.vue'
import router from './router';
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
    Submenu,
    MenuItem,
    MenuItemGroup,
} from 'element-ui';


import 'ol/ol.css';
import './assets/css/reset.less';

Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Aside.name, Aside);
Vue.component(Main.name, Main);
Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuItemGroup.name, MenuItemGroup);

Vue.config.productionTip = false

routerBeforeEach();

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
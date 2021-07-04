require('./bootstrap')
import Vue from 'vue'
import routes from './router/index'
import Form from 'vform'
import store from './store/index'

import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
var toastrConfigs = {
    position: 'top right',
    showDuration: 1000,
    timOut: 5000,
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
}
Vue.use(CxltToastr, toastrConfigs)

Vue.component('app-header', require('./components/Header.vue').default);

const app = new Vue({
    el: '#app',
    router: routes,
    store,
});

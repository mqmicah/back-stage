import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import http from './network/http'
import plugins from './plugins/elementUi'


Vue.prototype.$http = http;
Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
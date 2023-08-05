import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'
import VueScrollTo from 'vue-scrollto'
import moment from 'moment'
import VueParticlesBg from "particles-bg-vue";

Vue.use(VueParticlesBg);
Vue.use(VueScrollTo);
Vue.prototype.moment = moment
Vue.config.productionTip = false;
Vue.use(Notifications)

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app');

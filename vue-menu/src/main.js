import Vue from 'vue'
import App from './App.vue'
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({ 
  connection: SocketIO('localhost:3000') 
}))


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
  }).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import teams from './mock-teams.js'
import games from './mock-games.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
 
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

let data = {
  teams: teams,
  games: games,
  quarterFinals: [],
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')

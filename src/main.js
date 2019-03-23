import 'babel-polyfill'
import Vue from 'vue'
import VueFetch, { $fetch } from './plugins/fetch'
import App from './components/App.vue'
import router from './router'
import * as filters from './filters'

import store from './store'

// import { sync } from 'vuex-router-sync'

// import VueGoogleMaps from 'vue-googlemaps'

// sync(store, router)

// Vue.use(VueGoogleMaps, {
//   load: {
//     apiKey: 'AIzaSyAZJgiipNXNJ2sDWi3mkFZC4gmZB-es2W0',
//     libraries: ['places'],
//   }
// })

for (const key in filters) {
  Vue.filter(key, filters[key])
}

Vue.use(VueFetch, { baseUrl: 'http://localhost:3000/', })

 function main() {
  // store.dispatch('init')
  new Vue({
    el: '#app',
    router,    
    //render: h => h(App),
    ...App,
    //store,
  })
}

main()
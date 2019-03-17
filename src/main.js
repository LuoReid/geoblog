import 'babel-polyfill'
import Vue from 'vue'
import VueFetch, { $fetch } from './plugins/fetch'
import App from './App.vue'
import router from './router'
import * as filters from './filters'

for (const key in filters) {
    Vue.filter(key, filters[key])
}

Vue.use(VueFetch, { baseUrl: 'http://127.0.0.1:3000/', })

function main() {
    new Vue({ ...App, el: '#app', router })
}

main()
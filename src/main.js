import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VuePaginate from "vue-paginate";
import './colors.css'
Vue.config.productionTip = false;

// importing icons for weather
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSnowflake,
  faSun,
  faCloudSun,
  faCloudMoon,
  faCloud,
  faMoon,
  faCloudRain,
  faCloudShowersHeavy,
  faSmog,
  faBolt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* for weather on single country pages */
library.add(faSnowflake);
library.add(faSun);
library.add(faCloudSun);
library.add(faCloudMoon);
library.add(faCloud);
library.add(faMoon);
library.add(faCloudRain);
library.add(faCloudShowersHeavy);
library.add(faSmog);
library.add(faBolt);

/* for navbar */
library.add(faSearch);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VuePaginate);
// const COUNTRIES_URL = 'https://restcountries.com/v3.1'

// Vue.mixin({
//   methods: {
//     getCountries: async function(params = null){
//         axios.get(`${COUNTRIES_URL}/all${params ? params : ''}`).then(response =>{
//             console.log(response.data)
//             // this.countries = response.data
//             return response.data
//         })
//         // first parameter of catch is always error, but we can name it whatever we want
//         // obviously it just makes sense to call it 'error'
//         .catch(error => console.log(error))
//     }
//   }
// })

// const MyPlugin = {
//   install(Vue){
//     Vue.prototype.globalHelper = (params = null) => {
//       axios.get(`${COUNTRIES_URL}/all${params ? params : ''}`).then(response =>{
//         console.log(response.data)
//         // this.countries = response.data
//         return response.data
//     })
//     // first parameter of catch is always error, but we can name it whatever we want
//     // obviously it just makes sense to call it 'error'
//     .catch(error => console.log(error))
//     }
//   }
// }

// Vue.use(MyPlugin)

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

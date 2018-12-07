import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCoffee,
  faUser,
  faAt,
  faPrescription,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';

library.add(faCoffee);
library.add(faUser);
library.add(faAt);
library.add(faPrescription);
library.add(faCalendar);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

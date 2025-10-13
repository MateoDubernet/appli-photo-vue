/* 
  [IMPORTS] Vue.js
  Import main modules to define App
*/
// Vue imports
import { createApp } from 'vue';

// App imports
import App from './App.vue';
import Appstore from './store/index';
import Approuter from './router';

/* 
  [APP] Launch
  Init new Vue.js App
*/
createApp(App)
  .use(Appstore)   // Inject Appstore as a middleware
  .use(Approuter)  // Inject AppRouter as a middleware
  .mount('#appli-photo-vue');
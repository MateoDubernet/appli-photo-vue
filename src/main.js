import { createApp } from 'vue';
import App from './App.vue';
import Appstore from './store/index';
import Approuter from './router';

createApp(App)
  .use(Appstore)
  .use(Approuter)
  .mount('#appli-photo-vue');
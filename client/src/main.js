import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'
import store from './vuex';

const app = createApp(App);
app.use(router);
app.mount('#app');
app.use(store)
import 'bootstrap/dist/js/bootstrap.js'
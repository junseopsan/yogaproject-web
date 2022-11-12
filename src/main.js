// import Vue from 'vue';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import PrimeVue from 'primevue/config';

import base from './scripts/base';

import 'aos/dist/aos.css';
import './css/style.css';

const app = createApp(App);

app.use(PrimeVue);
app.mixin(base);

app.use(router);
app.mount('#app');
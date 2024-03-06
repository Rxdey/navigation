import { createApp } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 导入本地化语言
import pinia from '@/store';
import router from '@/router';
import VueLazyload from 'vue-lazyload';
import { setDialogDefaultOptions, setToastDefaultOptions } from 'vant';
import localforage from 'localforage';
import App from './App.vue';
import 'normalize.css';
import './styles/animate.css';
import './styles/public.css';
import 'virtual:uno.css';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';


localforage.config({
    name: 'home_page'
});

dayjs.locale('zh-cn'); // 使用本地化语言
setDialogDefaultOptions({
    title: '注意',
    theme: 'round-button',
});
setToastDefaultOptions('loading', { forbidClick: true });

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(VueLazyload, {
    preLoad: 1.3,
    attempt: 1,
    // error: '/img/default.png',
    // loading: '/img/default.png',
});
app.mount('#app');

import { createApp } from 'vue';
import { registerSW } from 'virtual:pwa-register';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 导入本地化语言
import pinia from '@/store';
import router from '@/router';
import VueLazyload from 'vue-lazyload';
import { setDialogDefaultOptions, setToastDefaultOptions } from 'vant';
import localforage from 'localforage';
import App from './App.vue';
import 'normalize.css';
import 'virtual:uno.css';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';
import './styles/animate.css';
import './styles/public.css';

registerSW({ immediate: true })

localforage.config({
    driver: localforage.INDEXEDDB, // 选择存储引擎，如IndexedDB
    name: 'navigation', // 数据库名称
    version: 1, // 数据库版本号
    storeName: 'main', // 存储对象的名称
});

dayjs.locale('zh-cn'); // 使用本地化语言
setDialogDefaultOptions({
    title: '注意',
    // theme: 'round-button',
});
setToastDefaultOptions('loading', { forbidClick: true });
setToastDefaultOptions('text', { forbidClick: false, position: 'top' });

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

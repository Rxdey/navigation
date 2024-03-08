import { createPinia } from "pinia";
import { persistedstate } from './plugins/persistedstate';

const pinia = createPinia();
pinia.use(persistedstate);

export default pinia;
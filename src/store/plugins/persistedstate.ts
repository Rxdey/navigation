import { PiniaPluginContext } from 'pinia';
import { toRaw } from 'vue';
import localforage from 'localforage';

export function persistedstate({ store }: PiniaPluginContext) {
  if (store.$id !== 'main') return;
  // console.log(6)
  localforage.getItem('mainStore').then((res: any) => {
    store.$patch(res)
  });

  store.$subscribe((args, state) => {
    localforage.setItem('mainStore', toRaw(state))
  });
}
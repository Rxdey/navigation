import { PiniaPluginContext } from 'pinia';
import { toRaw } from 'vue';
import localforage from 'localforage';

export function persistedstate({ store }: PiniaPluginContext) {
  if (store.$id !== 'main') return;
  // localforage.getItem('mainStore').then((res: any) => {
  //   // console.log(res);
  //   if (res) {
  //     store.$patch(res);
  //   }
  // });

  store.$subscribe((args, state) => {
    const tempOpt = toRaw(state);
    localforage.setItem('mainStore', tempOpt);
  });
}
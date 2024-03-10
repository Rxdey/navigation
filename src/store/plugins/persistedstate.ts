import { PiniaPluginContext } from 'pinia';
import { toRaw } from 'vue';
import localforage from 'localforage';

export function persistedstate({ store }: PiniaPluginContext) {
  if (store.$id !== 'main') return;
  // 注册慢了
  localforage.getItem('mainStore').then((res: any) => {
    console.log('init')
    if (res) {
      res.stylesOption.wallpaper.styles.custom.focusBlur = ''
      store.$patch(res);
    }
  });

  store.$subscribe((args, state) => {
    const tempOpt = toRaw(state);
    localforage.setItem('mainStore', tempOpt);
  });
}
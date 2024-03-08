import { PiniaPluginContext } from 'pinia';
import localforage from 'localforage';

export function persistedstate({ store }: PiniaPluginContext) {
    // return { secret: 'the cake is a lie' }
    if (store.$id !== 'main') return;
    console.log(store.$state);
    // localforage.setItem('mainStore', store.$state)
  }
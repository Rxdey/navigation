<template>
  <router-view v-if="loaded"></router-view>
</template>

<script setup lang="ts">
import useStore from '@/store/modules/useStore';
import { onMounted, ref, toRaw, computed } from 'vue';
import localforage from 'localforage';
import { mergeObjects } from '@/utils';
// import { getClient } from '@/utils/sync';


let client = null;
const store = useStore();
const loaded = ref(false);
const sync = computed(() => store.global.sync);

const webdevSync = () => {
  if (!sync.value.server || !sync.value.username || !sync.value.password) return;

}

onMounted(() => {

  localforage.getItem('mainStore').then((res: any) => {
    if (res) store.$patch(mergeObjects(res, toRaw(store.$state)));
    loaded.value = true;
    // webdevSync();
  });
})
</script>
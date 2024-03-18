<template>
  <router-view v-if="loaded"></router-view>
</template>

<script setup lang="ts">
import useStore from '@/store/modules/useStore';
import { onMounted, ref, toRaw } from 'vue';
import localforage from 'localforage';
import { mergeObjects } from '@/utils';

const store = useStore();
const loaded = ref(false);

onMounted(() => {
  localforage.getItem('mainStore').then((res: any) => {
    if (res) store.$patch(mergeObjects(res, toRaw(store.$state)));
    loaded.value = true;
  });
})
</script>
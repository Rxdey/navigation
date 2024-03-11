<template>
  <router-view v-if="loaded"></router-view>
</template>

<script setup lang="ts">
import useStore from '@/store/modules/useStore';
import { onMounted, ref } from 'vue';
import localforage from 'localforage';

const store = useStore();
const loaded = ref(false);

onMounted(() => {
  localforage.getItem('mainStore').then((res: any) => {
    console.log(res);
    if (res) {
      store.$patch(res);
      
    }
    loaded.value = true;
  });
})
</script>
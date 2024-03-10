<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import useStore from '@/store/modules/useStore';
import { onMounted, ref } from 'vue';
import localforage from 'localforage';

const store = useStore();
// const loaded = ref(false);

// onMounted(() => {
//   localforage.getItem('mainStore').then((res: any) => {
//     if (res) {
//       res.stylesOption.wallpaper.styles.custom.focusBlur = '';
//       store.$patch(res);
//       loaded.value = true;
//     }
//   });
// })
</script>
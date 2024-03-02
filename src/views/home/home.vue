<template>
  <div class="h-screen relative" :style="cssOptions">
    <Wallpaper />
    <Navigation />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useStore from '@/store/modules/useStore';
import { Wallpaper, Navigation } from '@/components';

const store = useStore();
const cssOptions = computed(() => store.cssOptions);

onMounted(() => {
  // 仅打印分组展示配置方便开发时查看
  console.log(store.cssOptionsArray)
  console.log(cssOptions.value)
});
</script>

<style scoped></style>

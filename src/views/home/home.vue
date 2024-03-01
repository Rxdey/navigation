<template>
  <div class="h-screen relative" :style="cssOptions">
    <Wallpaper />
    <SearchBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useStore from '@/store/modules/useStore';
import { Wallpaper, SearchBar } from '@/components';

const store = useStore();
const cssOptions = computed(() => store.cssOptions);

onMounted(() => {
  // 仅打印分组展示配置方便开发时查看
  console.log(store.cssOptionsArray)
});
</script>

<style scoped></style>

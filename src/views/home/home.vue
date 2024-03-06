<template>
  <div class="h-screen relative overflow-hidden">
    <Setting />
    <Wallpaper />
    <Navigation />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, provide } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useStore from '@/store/modules/useStore';
import { Wallpaper, Navigation, Setting } from '@/container';
import { ColorPicker } from '@/components';


const store = useStore();

/**
 * 动态创建部分style
 * @param val 
 */
const createStyle = (val: { styles: string, cssVar: string }) => {
  document.body.setAttribute('style', val.cssVar);
  let style = document.querySelector('#style');
  if (!style) {
    style = document.createElement('style');
    style.id = 'style';
  }
  style.textContent = val.styles;
  document.head.appendChild(style);
};
watch(() => store.styles, createStyle, { immediate: true });
</script>

<style scoped></style>

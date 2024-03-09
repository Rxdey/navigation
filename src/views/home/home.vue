<template>
  <div class="home h-screen relative overflow-hidden" id="home">
    <!-- 编辑模式背景 -->
    <div class="editor-background wh-full absolute z-1" @click="hideMenu"></div>
    <!-- 主界面 -->
    <div class="stage relative h-full z-2 " :class="{ moveanima: showMenu }" @click="onDrawerClick">
      <div class="relative h-full pixel-40 transition-50" :class="{ 'card-animate': showMenu }">
        <Setting @animate="onAnimate" v-if="showSetting" ref="setRef" />
        <Wallpaper />
        <Navigation />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, provide } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useStore from '@/store/modules/useStore';
import { Wallpaper, Navigation, Setting } from '@/container';

const store = useStore();
const showMenu = ref(false);
const showSetting = ref(false);
const setRef = ref<InstanceType<typeof Setting>>();
provide('showMenu', showMenu);
const onAnimate = (val: boolean) => {
  showMenu.value = val;
}
const onDrawerClick = () => {
  // if (showMenu.value) hideMenu();
}
const hideMenu = () => {
  showMenu.value = false;
  if (setRef.value) {
    setRef.value.close();
  }
}
/**
 * 动态创建部分style

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
onMounted(() => {
  showSetting.value = true;
});
</script>

<style>
@import url('./index.css');
</style>

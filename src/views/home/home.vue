<template>
  <div class="home h-screen relative overflow-hidden" id="home">
    <div class="glass wh-full absolute z-1"></div>
    <div class="drawers relative h-full overflow-hidden z-2" :class="{ animate: showMenu }" @click.stop>
      
      <Setting @animate="onAnimate" v-if="showSetting" />
      <Wallpaper />
      <Navigation />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, provide } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useStore from '@/store/modules/useStore';
import { Wallpaper, Navigation, Setting } from '@/container';
import { ColorPicker } from '@/components';

const store = useStore();
const showMenu = ref(false);
const showSetting = ref(false);

const onAnimate = (val: boolean) => {
  showMenu.value = !showMenu.value;
}
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
onMounted(() => {
  showSetting.value = true;
});
</script>

<style>
.home {
  /* background-color: var(--color-primary); */
  transform-style: preserve-3d;
  perspective: 2000px;
}
.glass {
  filter: blur(30px);
  background-image: linear-gradient(to right, var(--color-primary) 0%, #d875ff 100%);
  /* background-color: var(--color-primary); */
  transform: scale(1.1);
}
.drawers {
  transition: all .5s;
  box-shadow: 0 0 16px rgba(0,0,0,.2);
}

.drawers.animate {
  transform: translate3d(-20%, 0, -300px) rotateY(45deg);
  border-radius: 48px;

}
</style>

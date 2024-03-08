<template>
  <div class="home h-screen relative overflow-hidden" id="home">
    <div class="glass wh-full absolute z-1" @click="hideMenu"></div>

    <div class="drawers relative h-full z-2 " :class="{ moveanima: showMenu }" @click="onDrawerClick">
      <div class="relative h-full overflow-hidden pixel-40 transition-50" :class="{ 'card-animate': showMenu }">
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
import { ColorPicker } from '@/components';

const store = useStore();
const showMenu = ref(false);
const showSetting = ref(false);
const setRef = ref<InstanceType<typeof Setting>>();

const onAnimate = (val: boolean) => {
  showMenu.value = !showMenu.value;
}
const onDrawerClick = () => {
  if (showMenu.value) hideMenu();
}
const hideMenu = () => {
  showMenu.value = false;
  if (setRef.value) {
    setRef.value.close();
  }
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
  transform-style: preserve-3d;
  perspective: 2000px;
}

.glass {
  background: linear-gradient(-148deg,
      #cd5a85 30%,
      #21264c 0,
      #21264c 77%,
      #282d55 0);
  background-repeat: repeat;
  /* background-image: linear-gradient(-135deg,
      var(--color-primary) 25%,
      #dfc9ff 0%,
      #dfc9ff 50%,
      var(--color-primary) 0,
      var(--color-primary) 75%,
      #dfc9ff 0%);
  background-size: 50px 50px;
  animation: progressMove 4s linear infinite; */
}

@keyframes progressMove {
  0% {
    background-position: 0px;
  }

  100% {
    background-position: 100px;
  }
}

.drawers {
  transition: all .7s;
  transform: translate3d(0, 0, 0) rotateY(0);
  /* -webkit-box-reflect: below 10px linear-gradient(rgba(0, 0, 0, 0), rgba(255, 255, 255, .7)); */
}

.drawers.moveanima {
  transform: translate3d(-9%, 0, -350px) rotateY(15deg);
}

.card-animate {
  border-radius: 48px;
  box-shadow: 0 0 32px rgba(0, 0, 0, .5);
  animation: custom-move 20s ease-in-out 0s alternate infinite none;
  transform: translate3d(0%, 0, 0px) rotateY(0deg);
}

@keyframes custom-move {

  50% {
    transform: translate3d(-7%, 0, 0) rotateY(25deg);
  }

  100% {
    transform: translate3d(-15%, 0, 0) rotateY(15deg);
  }
}
</style>

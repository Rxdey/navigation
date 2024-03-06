<template>
  <div class="Setting fixed right-24 top-24 z-100 text-white text-48">
    <div class="i-mingcute:settings-3-line" @click="show = true"></div>
  </div>
  <van-popup v-model:show="show" position="right" class="h-full w-2/3" >
    <div></div>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';

const show = ref(false);
</script>

<style scoped></style>

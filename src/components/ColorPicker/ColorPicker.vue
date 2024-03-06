<template>
    <van-popup teleport="body" v-model:show="show" position="top" :overlay="false" class="h-[40%]">
        <Chrome v-model="colors" />
    </van-popup>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { Chrome } from '@ckpack/vue-color';
import { ColorInputWithoutInstance } from 'tinycolor2';

const colors = ref<ColorInputWithoutInstance>('#000000');
const show = ref(false);

const updateShow = (val = true) => {
    show.value = val;
};
const updateColors = (val: string) => {
    colors.value = val;
};
</script>

<style scoped></style>

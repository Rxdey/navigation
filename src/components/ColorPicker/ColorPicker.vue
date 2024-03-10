<template>
    <van-popover placement="top">
        <div>
            <Chrome v-model="colors" @update:modelValue="onChange" />
        </div>
        <template #reference>
            <div class="wh-40 border-2 border-solid border-white rounded-8px relative overflow-hidden" @click="updateShow">
                <div class="wh-full absolute z-2 top-0 left-0" :style="{ backgroundColor: `${colors}` }"></div>
                <div class="pixel-20 wh-full absolute z-1 top-0 left-0"></div>
            </div>
        </template>
    </van-popover>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { ColorPickerValue } from '@/types';
import { Chrome } from '@ckpack/vue-color';
import { useVModel } from '@vueuse/core';
import type { ColorInput } from '@ctrl/tinycolor';


const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
    modelValue: string;
}>();
const value = useVModel(props, 'modelValue', emit);
const colors = ref<ColorInput>('');
const show = ref(false);

const updateShow = () => {
    show.value = true;
};
const onChange = (val: ColorPickerValue) => {
    const { r, g, b, a } = val.rgba;
    value.value = `rgba(${r},${g},${b},${a})`;
};
watch(() => value.value, val => {
    colors.value = val;
})
</script>

<style scoped></style>

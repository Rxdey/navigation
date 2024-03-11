<!-- 原slider不能加单位 -->
<template>
    <van-slider v-model="sliderValue" class="mt-32" @update:model-value="onChange">
        <template #button>
            <div class="slider-button"></div>
        </template>
    </van-slider>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { useVModel } from '@vueuse/core';

const sliderValue = ref(0);

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
    modelValue: string | number | undefined;
    unit?: string;
}>();

const value = useVModel(props, 'modelValue', emit);
const lock = ref(false);
// function extractUnit(inputString: string) {
//     // 使用正则表达式匹配字符串中的单位部分
//     const unitMatch = inputString.match(/[a-zA-Z%]+/);
//     // 如果匹配到了单位，返回单位部分，否则返回空字符串
//     return unitMatch ? unitMatch[0] : "";
// }

watch(() => value.value, val => {
    sliderValue.value = parseFloat(`${val || 0}`);
});
const onChange = (val: number) => {
    if(lock.value) value.value = props.unit ? `${val}${props.unit}` : val;
}
onMounted(() => {
    nextTick(() => {
        sliderValue.value = parseFloat(`${props.modelValue || 0}`);
        lock.value = true;
    });
});
</script>

<style scoped></style>

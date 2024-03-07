<template>
    <div class="flex-row gap-16">
        <div class="text-center text-#666 rounded-full active:opacity-80 cursor-pointer leading-[1] px-16 py-12" :class="[{ active: data.value === value }, cliclMode ? 'bg-white border-2 border-solid border-primary text-primary' : 'bg-[#ededed]']" v-for="(data, i) in options" @click="onChange(data, i)">
            {{ data.label }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useVModel } from '@vueuse/core';

type options = {
    label: string;
    value: string;
};
const props = withDefaults(defineProps<{
    modelValue?: any;
    options: options[];
    color?: string;
    cliclMode?: boolean;
}>(), {
    options: () => [],
    color: '#9b56fc',
    
    cliclMode: false
});

const emit = defineEmits(['update:modelValue', 'click']);

const value = useVModel(props, 'modelValue', emit);

const onChange = (data: options, i: number) => {
    if (props.cliclMode) {
        emit('click', data, i);
        return;
    }
    value.value = data.value;
}

</script>

<style scoped>
.active {
    /* border: 1px solid v-bind(color); */
    background-color: v-bind(color);
    color: #fff;
}
</style>

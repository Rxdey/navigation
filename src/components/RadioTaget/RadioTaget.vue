<template>
    <TransitionGroup name="jelly" tag="div" class="flex-row flex-wrap gap-16">
        <div class="text-center text-xs text-#666 rounded-full active:opacity-80 cursor-pointer leading-[1] px-16 py-12" :class="[{ active: (data.value === value || active === i) }, cliclMode ? 'bg-white border-2 border-solid border-primary text-primary' : 'bg-[#ededed]']" v-for="(data, i) in options" @click.stop="onChange(data, i)" :key="i" :data-index="i" v-show="!hide">
            {{ data.label }}
        </div>
    </TransitionGroup>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useVModel } from '@vueuse/core';

type options = {
    label: string;
    value: string|number;
};
const props = withDefaults(defineProps<{
    modelValue?: any;
    options: options[];
    color?: string;
    cliclMode?: boolean;
    active?: number;
}>(), {
    options: () => [],
    color: 'var(--color-primary)',
    cliclMode: false,
    active: -1
});

const emit = defineEmits(['update:modelValue', 'click']);
const value = useVModel(props, 'modelValue', emit);
const hide = ref(true);

const onChange = (data: options, i: number) => {
    if (props.cliclMode) {
        emit('click', data, i);
        return;
    }
    value.value = data.value;
}
onMounted(() => {
    hide.value = false;
})
</script>

<style scoped>
.active {
    /* border: 1px solid v-bind(color); */
    background-color: v-bind(color);
    color: #fff;
}
</style>

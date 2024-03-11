<template>
    <Teleport to="#home">
        <TransitionGroup name="right-inout" tag="div" class="action-wrap absolute bottom-18% right-0 z-9 flex-col items-end gap-48" @enter="onEnter" @leave="onLeave">
            <div class="action-item text-white h-90 relative right-0 flex-row items-center bg-black-50 w-50vw transition-30" v-for="(act, i) in actions" :class="{ 'action-animate': show }" :key="i" v-show="show" @click="onSelect(act, i)" :data-index="i" @transitionend="onClear" :style="{ scale: (act.scale) ? '1.2' : '1' }">
                <div class="flex-1 px-32 text-32">{{ act.name }}</div>
            </div>
        </TransitionGroup>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useVModel } from '@vueuse/core';
import useTransitionGroup from '@/hooks/useTransitionGroup';

type Actions = {
    name: string;
    scale?: boolean;
    [key: string]: any;
};

const emit = defineEmits(['update:modelValue', 'select']);
const props = defineProps<{
    modelValue: boolean;
    actions: Actions[];
    title?: string;
}>();
const show = useVModel(props, 'modelValue', emit);
const { onEnter, onLeave, onClear } = useTransitionGroup(0.05, props.actions.length);

const onSelect = (data: Actions, i: number) => {
    emit('select', data, i);
};

</script>

<style scoped>
.action-wrap {
    transition: .3s all;
    transform-origin: 100% 100%;
    /* transform: translate3d(12%, 0, 0px) rotateY(-40deg) rotateX(20deg) rotateZ(0deg) skew(0deg, 0deg); */
    transform: translate3d(15%, 0, 0px) rotateY(-23deg) rotateX(10deg) rotateZ(0deg) skew(-15deg, 0deg);
}

.action-item {
    user-select: none;
    border: 6px solid white;
    box-shadow: 0 0 0 6px #000;

    &:active {
        border-color: var(--color-dblue);
        scale: 1.4 !important;
    }
}

.action-animate {}
</style>

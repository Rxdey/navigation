<template>
    <Teleport to="body">
        <Transition name="van-slide-up" v-show="show">
            <div class="w-88% absolute bottom-20 left-6% rounded-80 overflow-hidden z-10 bg-board">

                <div class="text-black text-center py-32 font-bold bg-white" v-if="title">{{ title }}</div>
                <TransitionGroup tag="div" @enter="onEnter" @leave="onLeave">

                    <div v-for="(act, i) in actions" :key="i" :data-index="i" class="text-center py-32 bg-white active:bg-active" v-show="show" @animationend="onClearDely" @click.stop="onSelect(act, i)">
                        <div>{{ act.name }}</div>
                        <div class="text-gray text-xs mt-12" v-if="act.subname">{{ act.subname }}</div>
                    </div>

                </TransitionGroup>

                <div class="text-center py-24 bg-white text-danger mt-12 active:bg-active" @click="show = false">取消</div>
            </div>
        </Transition>
        <van-overlay :show="show" @click="show = false" :custom-style="{backgroundColor: 'rgba(0,0,0,.2)'}"></van-overlay>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useVModel } from '@vueuse/core';

type Actions = {
    name: string;
    subname?: string;
    [key: string]: any;
};
const emit = defineEmits(['update:modelValue', 'select']);
const props = defineProps<{
    modelValue: boolean;
    actions: Actions[];
    title?: string;
}>();
const show = useVModel(props, 'modelValue', emit);

const onSelect = (data:Actions, i: number) => {
    emit('select', data, i);
    show.value = false;
};

const dely = 0.05;
const onEnter = (e: Element) => {
    const el = e as HTMLDivElement;
    const index = parseInt(el.dataset.index || '0');
    const transitiondelay = `${index * dely}s`;
    el.style.animationDelay = transitiondelay;
};
const onLeave = (e: Element) => {
    const el = e as HTMLDivElement;
    const index = parseInt(el.dataset.index || '0');
    const transitiondelay = `${(props.actions.length - index) * dely}s`;
    el.style.animationDelay = transitiondelay;
};
const onClearDely = (e: Event) => {
    (e.target as HTMLDivElement).style.animationDelay = '0s'
};

</script>

<style scoped></style>

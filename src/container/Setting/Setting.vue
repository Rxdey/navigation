<template>
    <div class="Setting fixed right-24 top-24 z-100 text-white text-48">
        <div class="i-mingcute:settings-3-line" @click.stop="onMenuShow"></div>
    </div>

    <!-- <ActionSheet v-model="showAction" :actions="actions" title="设置" @select="onSelect">
        <template #cancel>
            <span class="text-danger">取消</span>
        </template>
    </ActionSheet> -->


    <Teleport to="#home">
        <TransitionGroup name="right-inout" tag="div" class="absolute bottom-20% right-0 z-9 flex-col items-end">
            <div class="action-item text-white h-90 relative right-0 mb-32 flex-row items-center bg-black-30 w-50vw transition-50" :style="{ transitionDelay: `${.05 * i}s` }" v-for="(act, i) in actions" :class="{ 'action-animate': showAction }" :key="i" v-show="showAction">
                <div class="flex-1 px-32 text-32 font-bold">{{ act.name }}</div>
            </div>
        </TransitionGroup>
    </Teleport>

    <Teleport to="#home">
        <Transition name="flip-inout">
            <div class="editor absolute bottom-10% right-0 z-10 w-70%" v-if="showPopup">
                <Component :is="actions[active].action" @close="onClose" />
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, inject } from 'vue';
import { ActionSheet } from '@/components';
import { EditWallpaper, EditGolbal, EditShortcut } from './Edit';

const emit = defineEmits(['animate']);

const showAction = ref(false);
const showPopup = ref(false);
const active = ref(0);

const actions = [
    { name: '背景设置', action: EditWallpaper },
    { name: '导航设置', subname: '添加/修改导航', action: EditShortcut },
    { name: '全局设置', action: EditGolbal }
];

const onMenuShow = () => {
    showAction.value = true;
    emit('animate', true);
}

const onSelect = (act: typeof actions[number], index: number) => {
    active.value = index;
    // showPopup.value = true;
    emit('animate', true);
};
const onClose = () => {
    showPopup.value = false;
};
onMounted(() => {
    // document.body.addEventListener('click', () => {
    //     emit('animate', false);
    //     showPopup.value = false;
    // })
});

defineExpose({
    close() {
        showAction.value = false;
        showPopup.value = false;
    }
})
</script>

<style scoped>
.action-item {
    border: 4px solid white;
    /* transform-style: preserve-3d; */
    /* perspective: 2000px; */
    transform-origin: 100% 100%;
    box-shadow: -2px 2px 0 6px #000;
    transform: translate3d(100%, 0, 0px) rotateY(37deg) rotateX(-25deg) rotateZ(12deg) skew(-5deg, 0deg)
}

.action-animate {
    transform: translate3d(5%, 0, 0px) rotateY(37deg) rotateX(-25deg) rotateZ(12deg) skew(-5deg, 0deg);
}

.editor {
    transform: translate3d(0px, 0, 0px) rotateY(-6deg);
    transition-delay: .1s;
}
</style>

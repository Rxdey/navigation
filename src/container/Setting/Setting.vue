<template>
    <div class="Setting fixed right-24 top-24 z-100 text-white text-48">
        <div class="i-mingcute:settings-3-line" @click="showAction = true"></div>
    </div>

    <ActionSheet v-model="showAction" :actions="actions" title="设置" @select="onSelect">
        <template #cancel>
            <span class="text-danger">取消</span>
        </template>
    </ActionSheet>

    <Teleport to="#home">
        <Transition name="flip-inout">
            <div class="editor absolute top-50%  right-0 z-10 w-80%" v-if="showPopup">
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
const isClose = ref(true);
const active = ref(0);

const actions = [
    { name: '背景设置', action: EditWallpaper },
    { name: '导航设置', subname: '添加/修改导航', action: EditShortcut },
    { name: '全局设置', action: EditGolbal }
];

const onMenu = () => {
    emit('animate', true);
}

const onSelect = (act: typeof actions[number], index: number) => {
    active.value = index;
    showPopup.value = true;
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
        showPopup.value = false;
    }
})
</script>

<style scoped>
.editor {
    transform: translate3d(0, -50%, 0) rotateY(0);
}
</style>

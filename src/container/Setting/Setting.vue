<template>
    <div class="Setting fixed right-24 top-24 z-100 text-white text-48">
        <div class="i-mingcute:settings-3-line" @click="showAction = true"></div>
    </div>

    <ActionSheet v-model="showAction" :actions="actions" title="设置" @select="onSelect">
        <template #cancel>
            <span class="text-danger">取消</span>
        </template>
    </ActionSheet>


    <!-- <van-popup teleport="body" v-model:show="showPopup" position="bottom" round :overlay-style="{ backgroundColor: 'rgba(0,0,0,.2)' }" :close-on-click-overlay="isClose" class="h-[80%]" lazy-render>
        <Transition name="fade">
            <div class="h-full bg-board" v-if="showPopup">
                <Component :is="actions[active].action" @close="onClose" />
            </div>
        </Transition>
    </van-popup> -->
    <Teleport to="#home">
        <Transition name="flip-inout">
            <div class="absolute top-10% right-0 z-10 w-80% h-80% flex-col justify-center" v-if="showPopup">
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
    document.body.addEventListener('click', () => {
        emit('animate', false);
        showPopup.value = false;
    })
})
</script>

<style scoped></style>

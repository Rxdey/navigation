<template>
    <div class="Setting fixed right-24 top-24 z-100 text-white text-48">
        <div class="i-mingcute:settings-3-line" @click="showAction = true"></div>
    </div>

    <van-action-sheet v-model:show="showAction" :actions="actions" cancel-text="取消" title="设置" teleport="body" close-on-click-action @select="onSelect" />


    <van-popup teleport="body" v-model:show="showPopup" position="right" :overlay-style="{ backgroundColor: 'rgba(0,0,0,.2)' }" :close-on-click-overlay="isClose" class="h-full w-2/3" lazy-render>
        <div class="px-32 py-24">
            <Component :is="actions[active].action" @close="onClose" />
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, inject } from 'vue';
import { EditWallpaper, EditGolbal, EditShortcut } from './Edit';

const showAction = ref(false);
const showPopup = ref(false);
const active = ref(0);

const actions = [
    { name: '背景设置', action: EditWallpaper },
    { name: '导航设置', subname: '添加/修改导航', action: EditShortcut },
    { name: '全局设置', action: EditGolbal }
];

const isClose = ref(true);

const onSelect = (act: typeof actions[number], index: number) => {
    active.value = index;
    showPopup.value = true;
};
const onClose = () => {
    showPopup.value = false;
}
</script>

<style scoped></style>

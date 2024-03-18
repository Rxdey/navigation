<template>
    <div class="Setting fixed right-24 top-24 z-100 text-white text-48">
        <div class="i-mingcute:settings-3-line" @click.stop="onMenuShow"></div>
    </div>

    <ActionSheet v-model="showAction" :actions="actions" @select="onSelect" />
    <!-- 分类编辑 -->
    <Teleport to="#home">
        <Transition name="flip-inout">
            <div class="editor-wrap" @click.stop="showPopup = false" v-if="showPopup">
                <div class="w-75% absolute right-0 bottom-5%">
                    <Component :is="actions[active].action" @add="onAdd" />
                </div>
            </div>
        </Transition>
    </Teleport>
    <!-- 添加 -->
    <Teleport to="#home">
        <Transition name="flip-inout">
            <div class="editor-wrap" @click.stop="closeAdd" v-if="showAdd">
                <div class="w-70% absolute right-0 bottom-5%">
                    <AddShortcut :type="addType"/>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, inject } from 'vue';
import { ActionSheet } from '@/components';
import { EditWallpaper, EditGolbal, EditShortcut, EditSearchBar, AddShortcut } from './Edit';
import useStatus from '@/store/modules/useStatus';

const statusStore = useStatus();
const emit = defineEmits(['animate']);

const showAction = ref(false);
const showPopup = ref(false);
const showAdd = computed(() => statusStore.showAddMenu);
const active = ref(0);
const addType = ref<'engine' | 'shortcut'>('shortcut');

const actions = [
    { name: '背景設置', action: EditWallpaper, scale: true },
    { name: '搜索框', action: EditSearchBar },
    { name: '導航&引擎', action: EditShortcut },
    { name: '全局設置', action: EditGolbal, scale: true }
];

const onMenuShow = () => {
    showAction.value = true;
    emit('animate', true);
}

const onSelect = (act: typeof actions[number], index: number) => {
    active.value = index;
    showPopup.value = true;
    // emit('animate', true);
};

const onAdd = (type: any) => {
    console.log(type);
    addType.value = type;
    showPopup.value = false;
    statusStore.UPDATE_SHOW_ADD_MENU(true);
};

const closeAdd = () => {
    statusStore.UPDATE_SHOW_ADD_MENU(false);
}

defineExpose({
    close() {
        showAction.value = false;
        showPopup.value = false;
    }
})
</script>

<style scoped></style>

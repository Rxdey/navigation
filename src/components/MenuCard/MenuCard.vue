<template>
    <div class="menu-card flex-row items-center text-center font-bold text-black rounded-8 active:opacity-90 cursor-pointer leading-[1]" :class="[!small ? 'px-20 py-20' : 'px-12 py-12', shadow ? 'animate transition-30' : '']" @transitionend="onEnd" :style="customStyle" @contextmenu.prevent="onEdit">
        <span class="wh-24 mr-8" v-if="data?.icon"><img class="cover-image" src="/img/shortcut/bilibili.png" /></span>
        <span class="flex-1 min-w-0 van-ellipsis">
            <slot>
                {{ data?.title || '无标题' }}
            </slot>
        </span>
        <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" cancel-text="取消" close-on-click-action teleport="body" />
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, StyleValue } from 'vue';
import { Shortcut } from '@/store/types';
import { showConfirmDialog, showToast } from 'vant';
import useStore from '@/store/modules/useStore';
import useStatus from '@/store/modules/useStatus';
import { toRaw } from 'vue';

const statusStore = useStatus();
const store = useStore();
type PropsType = {
    small?: boolean;
    shadow?: boolean;
    data?: Shortcut;
};
const actions = [
    { name: '编辑', type: 1 },
    { name: '删除', color: 'red', type: 2 },
];
const props = defineProps<PropsType>();
const show = ref(false);

const customStyle = computed(() => {
    const obj: StyleValue = {};
    if (!props.data) return obj;
    if (props.data.color) obj.color = props.data.color;
    if (props.data.background) obj.background = props.data.background;
    return obj;
});

/** 动画结束移除渐进延迟 */
const onEnd = (e: Event) => {
    (e.target as HTMLDivElement).style.transitionDelay = '0s';
};

const onSelect = ({ name, type }: { name: string, type: number }) => {
    if (type === 2) {
        showConfirmDialog({
            title: '注意',
            message: '删除后不可恢复，确定要删除吗?',
            confirmButtonText: '删除'
        }).then(() => {
            if (props.data) store.DELETE_SHORTCUT_BY_ID(props.data.id);
            showToast('已删除');
        }).catch(() => { });
        return;
    }
    if (type === 1) {
        if (!props.data) return;
        // console.log(props.data);
        statusStore.UPDATE_EDIT_DATA(toRaw(props.data));
        nextTick(() => {
            statusStore.UPDATE_SHOW_ADD_MENU(true);
        });
    }
}
const onEdit = () => {
    console.log('edit');
    show.value = true;
}
</script>

<style scoped>
.animate {
    box-shadow: -10px 10px 5px 0 rgba(0, 0, 0, 0.3);
}
</style>

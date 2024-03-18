<template>
    <Frame :title="`${isEdit ? '编辑' : '添加'}${title}`" @click.stop>
        <div class="preview">
            <MenuCard class="shortcut inline-block" :data="form" :small="form.type === 'engine'"/>
        </div>
        <EditCell>
            <AnimateInput v-model="form.title" title="网站名称" placeholder="输入网站名称" />
        </EditCell>
        <EditCell class="mb-48">
            <AnimateInput v-model="form.url" title="网站网址" />
        </EditCell>

        <EditCell title="颜色配置(含透明度)">
            <div class="text-white flex-row gap-20 text-xs">
                <div class="flex-center gap-20">
                    <label>文本</label>
                    <ColorPicker v-model="form.color" />
                </div>
                <div class="flex-center gap-20">
                    <label>背景</label>
                    <ColorPicker v-model="form.background" />
                </div>
            </div>
        </EditCell>

        <EditCell class="mt-48" v-if="!isEdit">
            <div class="flex-row gap-20">
                <van-button round type="primary" size="small" @click="onSave">立即保存</van-button>
            </div>
        </EditCell>
    </Frame>
</template>

<script setup lang="ts">
import { ref, computed, toRaw, onMounted, watch } from 'vue';
import { AnimateInput, ColorPicker, MenuCard } from '@/components';
import Frame from '../comp/Frame.vue';
import EditCell from '../comp/EditCell.vue';
import useStore from '@/store/modules/useStore';
import { showConfirmDialog, showToast } from 'vant';
import { Shortcut } from '@/store/types';
import { nanoid } from 'nanoid';
import useStatus from '@/store/modules/useStatus';


const statusStore = useStatus();
const store = useStore();
const props = defineProps<{
    type: 'engine' | 'shortcut'
}>();
const title = computed(() => form.value.type === 'engine' ? '引擎' : '导航');
const isEdit = computed(() => !!statusStore.editData);

const form = ref<Shortcut>({
    id: nanoid(),
    title: '',
    url: '',
    type: props.type,
    background: 'rgba(237, 237, 237, .9)',
    color: 'rgba(0,0,0,1)',
});

const onSave = () => {
    if (!form.value.title) {
        showToast('请输入网站名称');
        return;
    };
    if (!form.value.url) {
        showToast('请输入网站网址');
        return;
    };
    const ACTION_TYPE = form.value.type === 'shortcut' ? 'ADD_SHORTCUT' : 'ADD_ENGINE';
    store[ACTION_TYPE](toRaw(form.value));
    form.value = {
        id: nanoid(),
        title: '',
        url: '',
        type: props.type
    }
};

onMounted(() => {
    if (statusStore.editData) {
        form.value = {
            ...form.value,
            ...statusStore.editData,
        };
    }
});
</script>

<style scoped></style>

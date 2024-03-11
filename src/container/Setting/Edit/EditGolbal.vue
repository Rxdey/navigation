<template>
    <Frame title="全局设置" @click.stop>
        <EditCell title="其它设置" class="mb-32">
            <van-button round type="primary" size="small" @click="onReset">重置配置</van-button>
        </EditCell>
    </Frame>
</template>

<script setup lang="ts">
import Frame from '../comp/Frame.vue';
import EditCell from '../comp/EditCell.vue';
import useStore from '@/store/modules/useStore';
import { showConfirmDialog } from 'vant';

const store = useStore();

const onReset = () => {
    showConfirmDialog({
        title: '注意',
        message: '清除后不可恢复，请备份好配置数据，确认要清除吗？',
    }).then(() => {
        store.RESET_STORE();
    }).catch(() => { })
};
</script>

<style scoped></style>

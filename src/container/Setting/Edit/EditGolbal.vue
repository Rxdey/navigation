<template>
    <Frame title="全局设置" @click.stop>
        <EditCell title="其它设置" class="mb-32">
            <van-button round type="primary" size="small" @click="onReset">重置配置</van-button>
        </EditCell>
        <!-- <EditCell title="同步(webdev)" class="mb-32">
            <div class="mb-32">
                <AnimateInput v-model="form.server" title="服务器地址" />
                <AnimateInput v-model="form.username" title="用户名" />
                <AnimateInput v-model="form.password" title="授权密码" />
            </div>
            <div>
                <van-button round type="primary" size="small" :loading="loading">立即同步</van-button>
            </div>
        </EditCell> -->
    </Frame>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Frame from '../comp/Frame.vue';
import EditCell from '../comp/EditCell.vue';
import useStore from '@/store/modules/useStore';
import { showConfirmDialog } from 'vant';
import { AnimateInput } from '@/components';


const store = useStore();
const loading = ref(false);
const form = ref({
    server: '',
    username: '',
    password: ''
});

const onReset = () => {
    showConfirmDialog({
        title: '注意',
        message: '清除后不可恢复，请备份好配置数据，确认要清除吗？',
    }).then(() => {
        store.RESET_STORE();
    }).catch(() => { })
};
onMounted(() => {
    form.value = store.global.sync;
});
</script>

<style scoped></style>

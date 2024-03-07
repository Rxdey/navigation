<template>
    <van-popup v-model:show="showPopup" position="bottom" :style="{ height: '100%' }">
        <!-- <div class="pixel-40 h-full" > -->
        <div class="pixel-40 h-full flex-col" v-if="showPopup">
            <van-nav-bar left-arrow right-text="完成" @click-left="showPopup = false" @click-right="onSave">
                <template #title>
                    <span class="font-normal">编辑图片</span>
                </template>
            </van-nav-bar>
            <div class="flex-1 min-h-0">
                <img :src="blobUrl" ref="imgRef" @load="initCropper">
            </div>
            <!-- <div class="p-32 bg-black-50">
                    <van-button type="primary" block round @click="onSave">保存</van-button>
                </div> -->
        </div>
        <!-- </div> -->
    </van-popup>
</template>

<script setup lang="ts">
import { showImagePreview, showToast } from 'vant';
import { ref, onMounted } from 'vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { dataURLtoBlob } from '@/utils/file';

const emit = defineEmits(['confirm']);

const showPopup = ref(false);
const imgRef = ref<HTMLImageElement | null>(null);
const blobUrl = ref('');

let cropper: Cropper | null = null;

const initCropper = async () => {
    if (!imgRef.value) return;
    cropper = new Cropper(imgRef.value, {
        viewMode: 1,
        aspectRatio: 9 / 16,
        dragMode: 'none',
        // guides: false,
        background: false,
        movable: true
    });
}

const onSave = () => {
    if (!cropper) return;
    const base64 = cropper.getCroppedCanvas().toDataURL('image/jpeg', .9);
    emit('confirm', dataURLtoBlob(base64));
    showPopup.value = false;
}

defineExpose({
    onCrop: (url: string) => {
        blobUrl.value = url;
        showPopup.value = true;
    }
})
</script>

<style></style>

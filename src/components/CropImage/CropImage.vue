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
            <div class="p-32 bg-board">
                <div class="flex-center">
                    <div class="mr-24">锁定比例</div>
                    <van-switch v-model="lock" size="22px" style="--van-switch-width:2.2em" @change="onLock" />
                </div>
            </div>
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
const lock = ref(true);

let cropper: Cropper | null = null;

const initCropper = async () => {
    if (!imgRef.value) return;
    cropper = new Cropper(imgRef.value, {
        viewMode: 1,
        aspectRatio: window.innerWidth / window.innerHeight,
        dragMode: 'none',
        // guides: false,
        background: false,
        movable: true,
        autoCropArea: 1
    });
}
const onLock = (val: boolean) => {
    if (!cropper) return;
    if (val) {
        cropper.setAspectRatio(window.innerWidth / window.innerHeight)
    } else {
        cropper.setAspectRatio(NaN);
    }
}

const onSave = () => {
    if (!cropper) return;
    const base64 = cropper.getCroppedCanvas().toDataURL('image/jpeg', .9);
    emit('confirm', 1, dataURLtoBlob(base64), false);
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

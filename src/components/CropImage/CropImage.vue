<template>
    <van-popup v-model:show="showPopup" position="bottom" :style="{ height: '100%' }" closeable>
        <div class="pixel-40 h-full" v-if="showPopup">
            <div class="flex-col wh-full absolute top-0 left-0">
                <van-nav-bar title="编辑头像" left-text="返回" left-arrow @click-left="showPopup = false" />
                <div class="flex-1 min-h-0">
                    <img :src="blobUrl" ref="imgRef" @load="initCropper">
                </div>
                <div class="p-32 bg-black-50">
                    <van-button type="primary" block round @click="onSave">保存</van-button>
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { showImagePreview, showToast } from 'vant';
import { ref, onMounted } from 'vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const emit = defineEmits(['change']);

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
    // cropper.getCroppedCanvas()
}

defineExpose({
    onCrop: (url: string) => {
        blobUrl.value = url;
        showPopup.value = true;
    }
})
</script>

<style></style>

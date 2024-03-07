<template>
  <div class="EditWallpaper" v-if="editForm.options && editForm.styles?.custom && editForm.styles?.background">
    <CustomTitle class="text-center bg-white pb-24 pt-32">壁纸设置</CustomTitle>
    <div class="px-24">
      <div class="bg-white rounded-12 px-32 py-24">
        <div class="flex-row mb-32">
          <!-- 预览模块 -->
          <div class="w-30%">
            <div class="rounded-8 h-360 overflow-hidden pixel-40 relative mx-a" :style="{ width: `${windowWidth}px` }" ref="previewRef">
              <div class="wallpaper absolute">
                <div class="wallpaper-mask h-full" :class="maskType"></div>
              </div>
            </div>
          </div>

          <div class="flex-1 ml-16">
            <FrameComp title="填充模式">
              <RadioTaget v-model="editForm.styles.background.size" :options="OPTIONS.sizeOptions" />
            </FrameComp>
            <FrameComp title="重复">
              <van-switch v-model="editForm.styles.background.repeat" size="18px" active-color="#9b56fc" style="--van-switch-width:2.3em" active-value="repeat" inactive-value="no-repeat" />
            </FrameComp>
            <FrameComp title="对齐方式">
              <RadioTaget v-model="editForm.styles.background.position" :options="OPTIONS.positionOptions" />
            </FrameComp>
          </div>
        </div>

        <FrameComp title="遮罩类型">
          <RadioTaget v-model="editForm.options.maskType" :options="OPTIONS.optionsOptions" />
        </FrameComp>
        <FrameComp :title="`遮罩浓度(${editForm.styles.custom.mask})`" class="mb-40">
          <van-slider v-model="editForm.styles.custom.mask" :min="0" :max="1" :step="0.01" class="mt-32">
            <template #button>
              <div class="slider-button"></div>
            </template>
          </van-slider>
        </FrameComp>
        <FrameComp title="背景模糊" class="mb-40">
          <van-slider v-model="form.focusBlur" :min="0" :max="10" :step="1" @change="onBlurChange" class="mt-32">
            <template #button>
              <div class="slider-button"></div>
            </template>
          </van-slider>
        </FrameComp>
        <FrameComp title="修改壁纸" class="mb-40">
          <RadioTaget :options="OPTIONS.backgroundOptions" cliclMode @click="onEditBackground" />
        </FrameComp>

      </div>
    </div>

    <CropImage ref="cropImageRef" @confirm="onSetLocalImage" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { CustomTitle, RadioTaget, CropImage } from '@/components';
import * as OPTIONS from '../options';
import useStore from '@/store/modules/useStore';
import { StylesOption } from '@/store/types';
import FrameComp from '../comp/FrameComp.vue';
import { uploadFile } from '@/utils/file';
import { nextTick } from 'vue';

const store = useStore();
const wallpaperOptions = computed(() => store.stylesOption.wallpaper);
const maskType = computed(() => store.stylesOption.wallpaper.options?.maskType || 'color');
const windowWidth = ref(180);

const form = ref<{
  focusBlur: number;
}>({
  focusBlur: 0
})

// 直接修改state
const editForm = ref<StylesOption['wallpaper']>({});

const previewRef = ref<HTMLDivElement>();
const cropImageRef = ref<InstanceType<typeof CropImage>>();

const onBlurChange = (value: number) => {
  store.UPDATE_STYLES(['wallpaper', 'styles', 'custom', 'blur'], `${value}px`);
};

const onSetLocalImage = (blob: Blob) => {
  store.UPDATE_STYLES(['wallpaper', 'styles', 'background', 'image'], `url(${window.URL.createObjectURL(blob)})`);
};
const uploadLocalImage = async () => {
  try {
    const res = await uploadFile();
    const blobUrl = window.URL.createObjectURL(res);
    if (cropImageRef.value) {
      cropImageRef.value.onCrop(blobUrl);
    }
  } catch (error) {

  }
}

const onEditBackground = async (data: {
  label: string;
  value: string;
}) => {
  const { value } = data;
  if (value === 'local') uploadLocalImage();
  console.log(value);
};

onMounted(() => {
  editForm.value = wallpaperOptions.value;
  form.value.focusBlur = parseInt(wallpaperOptions.value?.styles?.custom?.blur || '0');
  nextTick(() => {
    if (previewRef.value) windowWidth.value = previewRef.value.clientHeight / window.innerHeight * window.innerWidth;
  });
});
</script>

<style scoped></style>

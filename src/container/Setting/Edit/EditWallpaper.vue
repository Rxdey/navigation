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
    <van-dialog v-model:show="showOnline" title="在线图片" show-cancel-button theme="round-button" :beforeClose="onOnlineConfirm">
      <div class="mx-32 px-48 py-24">
        <input type="text" class="border-0 py-8 outline-none w-full  border-b-1 border-primary border-solid placeholder:text-sm" placeholder="图片地址" v-model="form.online">
      </div>
    </van-dialog>
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
import { showToast } from 'vant';

const store = useStore();
const wallpaperOptions = computed(() => store.stylesOption.wallpaper);
const maskType = computed(() => store.stylesOption.wallpaper.options?.maskType || 'color');
const windowWidth = ref(180);
const showOnline = ref(false);

const form = ref<{
  focusBlur: number;
  online: string;
}>({
  focusBlur: 0,
  online: ''
})

// 直接修改state
const editForm = ref<StylesOption['wallpaper']>({});

const previewRef = ref<HTMLDivElement>();
const cropImageRef = ref<InstanceType<typeof CropImage>>();

const onBlurChange = (value: number) => {
  store.UPDATE_STYLES(['wallpaper', 'styles', 'custom', 'blur'], `${value}px`);
};
/** 本地图片上传 */
const onSetLocalImage = (blob: Blob) => {
  store.UPDATE_STYLES(['wallpaper', 'styles', 'background', 'image'], `url(${window.URL.createObjectURL(blob)})`);
  store.UPDATE_STYLES(['wallpaper', 'options', 'imageType'], 1);
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
};
/** 网络图片上传 */
const onOnlineConfirm = (action: string) => {
  if (action === 'confirm') {
    if (!form.value.online) {
      showToast('请输入图片地址!')
      return false;
    };
    store.UPDATE_STYLES(['wallpaper', 'styles', 'background', 'image'], `url(${form.value.online})`);
    store.UPDATE_STYLES(['wallpaper', 'options', 'imageType'], 2);
  }
  return true;
}

const onEditBackground = async (data: {
  label: string;
  value: string;
}) => {
  const { value } = data;
  if (value === 'local') uploadLocalImage();
  if (value === 'online') {
    const img = (wallpaperOptions.value.styles?.background?.image || '').match(/url\((.*)\)/);
    form.value.online = img ? img[1] : '';
    showOnline.value = true;
  }
  console.log(value);
};

onMounted(() => {
  editForm.value = wallpaperOptions.value;
  form.value.focusBlur = parseInt(wallpaperOptions.value?.styles?.custom?.blur || '0');
  const img = (wallpaperOptions.value.styles?.background?.image || '').match(/url\((.*)\)/);
  form.value.online = img ? img[1] : '';
  nextTick(() => {
    if (previewRef.value) windowWidth.value = previewRef.value.clientHeight / window.innerHeight * window.innerWidth;
  });
});
</script>

<style scoped></style>

<template>
  <div class="EditWallpaper alltransition mx-16" v-if="editForm.options && editForm.styles?.custom && editForm.styles?.background" @click.stop>
    <div class="bg-white rounded-24 p-32">
      <FrameComp title="填充模式">
        <RadioTaget v-model="editForm.styles.background.size" :options="OPTIONS.sizeOptions" />
      </FrameComp>
      <FrameComp title="重复">
        <van-switch v-model="editForm.styles.background.repeat" size="18px" active-color="#9b56fc" style="--van-switch-width:2.3em" active-value="repeat" inactive-value="no-repeat" />
      </FrameComp>
      <FrameComp title="对齐方式">
        <RadioTaget v-model="editForm.styles.background.position" :options="OPTIONS.positionOptions" />
      </FrameComp>
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
        <van-slider v-model="form.focusBlur" :min="0" :max="10" :step="1" class="mt-32">
          <template #button>
            <div class="slider-button"></div>
          </template>
        </van-slider>
      </FrameComp>
      <FrameComp title="修改壁纸(在线类型需要手动提交)" class="mb-0">
        <div>
          <RadioTaget :options="OPTIONS.backgroundOptions" cliclMode @click="onEditBackground" class="mb-32" :active="activeType" />
          <AnimateInput v-model="form.online" @enter="onInputConfirm" title="在线图片" placeholder="图片地址" v-if="showOnline">
            <template #icon>
              <div class="i-mingcute:check-line text-primary" @click="onInputConfirm(form.online)"></div>
            </template>
          </AnimateInput>

          <AnimateInput v-model="form.video" @enter="onInputConfirm" title="在线视频" placeholder="视频" v-else>
            <template #icon>
              <div class="i-mingcute:check-line text-primary" @click="onInputConfirm(form.video)"></div>
            </template>
          </AnimateInput>
        </div>
      </FrameComp>
    </div>

    <CropImage ref="cropImageRef" @confirm="onSetLocalImage" />
    <!-- <van-dialog v-model:show="showOnline" title="在线图片" show-cancel-button theme="round-button" :beforeClose="onOnlineConfirm">
      <div class="mx-32 px-48 py-24">
        <input type="text" class="border-0 py-8 outline-none w-full  border-b-1 border-primary border-solid placeholder:text-sm" placeholder="图片地址" v-model="form.online">
      </div>
    </van-dialog> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { CustomTitle, RadioTaget, CropImage, AnimateInput } from '@/components';
import * as OPTIONS from '../options';
import useStore from '@/store/modules/useStore';
import { StylesOption } from '@/store/types';
import FrameComp from '../comp/FrameComp.vue';
import { uploadFile } from '@/utils/file';
import { nextTick } from 'vue';
import { showConfirmDialog, showToast } from 'vant';

const store = useStore();
const wallpaperOptions = computed(() => store.stylesOption.wallpaper);
const activeType = computed(() => {
  return OPTIONS.backgroundOptions.findIndex(e => e.type === wallpaperOptions.value.options?.imageType);
})
const windowWidth = ref(180);
const showOnline = ref(true);

const form = ref<{
  focusBlur: number;
  online: string;
  video: string;
}>({
  focusBlur: 0,
  online: '',
  video: ''
})

// 直接通过引用类型修改state
const editForm = ref<StylesOption['wallpaper']>({});

const previewRef = ref<HTMLDivElement>();
const cropImageRef = ref<InstanceType<typeof CropImage>>();
/** 模糊度修改 */
const onBlurChange = (value: number) => {
  store.UPDATE_STYLES(['wallpaper', 'styles', 'custom', 'blur'], `${value}px`);
};
/** 更新本地图片地址及类型 */
const onSetLocalImage = (blob: Blob) => {
  store.UPDATE_STYLES(['wallpaper', 'styles', 'background', 'image'], `url(${window.URL.createObjectURL(blob)})`);
  store.UPDATE_STYLES(['wallpaper', 'options', 'imageType'], 1);
};
/** 本地图片上传 */
const onUpload = async () => {
  try {
    const res = await uploadFile();
    const blobUrl = window.URL.createObjectURL(res);
    if (cropImageRef.value) {
      cropImageRef.value.onCrop(blobUrl);
    }
  } catch (error) {
    showToast('图片上传失败,可以重试一下')
  }
}
const uploadLocalImage = async () => {
  if (wallpaperOptions.value.options?.imageFile && wallpaperOptions.value.options?.imageType !== 1) {
    showConfirmDialog({
      title: '提示',
      message: '检测到历史文件',
      confirmButtonText: '继续使用',
      cancelButtonText: '重新上传',
    }).then(() => {
      store.UPDATE_STYLES(['wallpaper', 'options', 'imageType'], 1);
    }).catch(() => {
      onUpload();
    })
    return;
  }
  onUpload();
};
/** 提交网络图片/视频地址 */
const onInputConfirm = (val: string) => {
  if (!val) {
    showToast(showOnline.value ? '请输入图片地址!' : '请输入视频地址!')
    return false;
  };
  // 清空本地图片文件
  if (showOnline.value) {
    store.UPDATE_STYLES(['wallpaper', 'options', 'imageUrl'], form.value.online);
    store.UPDATE_STYLES(['wallpaper', 'options', 'imageType'], 2);
  } else {
    store.UPDATE_STYLES(['wallpaper', 'options', 'videoSource'], form.value.video);
    store.UPDATE_STYLES(['wallpaper', 'options', 'imageType'], 3);
  }

  showToast('已修改')
}
/** 壁纸修改 */
const onEditBackground = async (data: {
  label: string;
  value: string;
}) => {
  const { value } = data;
  if (value === 'local') {
    uploadLocalImage();
  }
  if (value === 'online') {
    form.value.online = wallpaperOptions.value.options?.image || '';
    showOnline.value = true;
  }
  if (value === 'video') {
    showOnline.value = false;
  }
  console.log(value);
};

onMounted(() => {
  editForm.value = wallpaperOptions.value;
  form.value.focusBlur = parseInt(wallpaperOptions.value?.styles?.custom?.blur || '0');
  form.value.online = wallpaperOptions.value.options?.image || '';
  form.value.video = wallpaperOptions.value.options?.videoSource || '';
  nextTick(() => {
    if (previewRef.value) windowWidth.value = previewRef.value.clientHeight / window.innerHeight * window.innerWidth;
  });
});

watch(() => form.value.focusBlur, val => {
  store.UPDATE_STYLES(['wallpaper', 'styles', 'custom', 'blur'], `${val}px`);
})
</script>

<style scoped>
.EditWallpaper {
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, .3);
}
</style>

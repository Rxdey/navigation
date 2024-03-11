<template>
  <div class="EditWallpaper transition-30 mx-16" v-if="editForm.options && editForm.styles?.custom && editForm.styles?.background" @click.stop>
    <div class="p-32">
      <EditCell title="填充模式">
        <RadioTaget v-model="editForm.styles.background.size" :options="OPTIONS.sizeOptions" />
      </EditCell>
      <EditCell title="对齐方式">
        <RadioTaget v-model="editForm.styles.background.position" :options="OPTIONS.positionOptions" />
      </EditCell>
      <EditCell title="重复">
        <van-switch v-model="editForm.styles.background.repeat" size="18px" active-color="#9b56fc" style="--van-switch-width:2.3em" active-value="repeat" inactive-value="no-repeat" />
      </EditCell>
      <EditCell title="遮罩类型">
        <RadioTaget v-model="editForm.options.maskType" :options="OPTIONS.optionsOptions" />
      </EditCell>
      <EditCell :title="`遮罩透明度(${editForm.styles.custom.mask})`" class="mb-32">
        <van-slider v-model="editForm.styles.custom.mask" :min="0" :max="1" :step="0.01" class="mt-32">
          <template #button>
            <div class="slider-button"></div>
          </template>
        </van-slider>
      </EditCell>
      <EditCell :title="`背景模糊${editForm.styles.custom.blur}`" class="mb-32">
        <AutoSlider v-model="editForm.styles.custom.blur" :min="0" :max="30" :step="1" unit="px" />
      </EditCell>
      <EditCell title="背景颜色" class="mb-24">
        <ColorPicker v-if="editForm.styles.background.color" v-model="editForm.styles.background.color" />
      </EditCell>
      <EditCell title="修改壁纸(在线类型需要手动提交)" class="mb-0">
        <div>
          <RadioTaget :options="OPTIONS.backgroundOptions" cliclMode @click="onEditBackground" class="mb-0" :active="activeType" />
          <AnimateInput v-model="form.online" @enter="onInputConfirm" title="在线图片" placeholder="输入图片地址" v-if="showOnline">
            <template #icon>
              <div class="i-mingcute:check-line text-primary" @click="onInputConfirm(form.online)"></div>
            </template>
          </AnimateInput>

          <AnimateInput v-model="form.video" @enter="onInputConfirm" title="在线视频" placeholder="输入视频地址" class="text-white" v-else>
            <template #icon>
              <div class="i-mingcute:check-line text-primary" @click="onInputConfirm(form.video)"></div>
            </template>
          </AnimateInput>
        </div>
      </EditCell>
    </div>
    <Teleport to="#app">
      <CropImage ref="cropImageRef" @confirm="onSetLocalImage" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { ColorPicker, RadioTaget, CropImage, AnimateInput, AutoSlider } from '@/components';
import * as OPTIONS from '../options';
import useStore from '@/store/modules/useStore';
import { StylesOption } from '@/store/types';
import EditCell from '../comp/EditCell.vue';
import { uploadFile, fileToBlob } from '@/utils/file';
import { closeToast, showConfirmDialog, showLoadingToast, showToast } from 'vant';

// const from = ref<Record<string, DefineOpt>>({});

const store = useStore();
const wallpaperOptions = computed(() => store.stylesOption.wallpaper);
const activeType = computed(() => {
  return OPTIONS.backgroundOptions.findIndex(e => e.type === wallpaperOptions.value.options?.imageType);
})
const showOnline = ref(true);
const form = ref({
  online: '',
  video: '',
})
// 直接通过引用类型修改state
const editForm = ref<StylesOption['wallpaper']>({});
const cropImageRef = ref<InstanceType<typeof CropImage>>();

/** 更新本地图片地址及类型 */
const onSetLocalImage = (blob: Blob) => {
  store.UPDATE_STYLES(['wallpaper', 'options', 'imageFile'], blob);
  store.UPDATE_STYLES(['wallpaper', 'options', 'imageType'], 1);
};
/** 本地图片上传 */
const onUpload = async () => {
  try {
    const res = await uploadFile();
    const blobUrl = window.URL.createObjectURL(res);
    showConfirmDialog({
      title: '提示',
      message: '是否需要裁剪图片?',
      confirmButtonText: '裁剪',
      cancelButtonText: '不裁剪',
    }).then(() => {
      if (cropImageRef.value) cropImageRef.value.onCrop(blobUrl);
    }).catch(async () => {
      showLoadingToast('请稍等..')
      const blob = await fileToBlob(res);
      onSetLocalImage(blob);
      closeToast();
    })
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
  form.value.online = wallpaperOptions.value.options?.image || '';
  form.value.video = wallpaperOptions.value.options?.videoSource || '';
});
</script>

<style scoped>
.EditWallpaper {
  /* border-radius: 16px; */
  box-shadow: 0 0 16px rgba(0, 0, 0, 1);
  background: linear-gradient(-198deg,
      var(--color-ared) 20%,
      var(--color-dblue) 0,
      var(--color-dblue) 82%,
      var(--color-ablue) 0);
}
</style>

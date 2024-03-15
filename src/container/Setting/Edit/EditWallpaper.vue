<template>
  <Frame class="EditWallpaper" title="背景壁纸(部分仅对图片生效)" v-if="editForm.options && editForm.styles?.custom && editForm.styles?.background" @click.stop>
    <EditCell title="填充模式">
      <RadioTaget v-model="editForm.styles.background.size" :options="OPTIONS.sizeOptions" />
    </EditCell>
    <EditCell title="对齐方式">
      <RadioTaget v-model="editForm.styles.background.position" :options="OPTIONS.positionOptions" />
    </EditCell>
    <EditCell title="重复">
      <van-switch v-model="editForm.styles.background.repeat" size="18px" active-color="--color-primary" style="--van-switch-width:2.3em" active-value="repeat" inactive-value="no-repeat" />
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
      <ColorPicker v-model="editForm.styles.background.color" />
    </EditCell>
    <EditCell title="修改壁纸(在线类型需要手动提交)" class="mb-0">
      <div>
        <RadioTaget :options="OPTIONS.backgroundOptions" cliclMode @click="onEditBackground" class="mb-0" :active="activeType" />

        <AnimateInput v-model="form.onlineUrl" @enter="onInputConfirm" :title="inputTitle" :placeholder="`请输入${inputTitle}`" v-if="inputType != 1">
          <template #icon>
            <div class="i-mingcute:check-line text-primary" @click="onInputConfirm(form.onlineUrl)"></div>
          </template>
        </AnimateInput>

      </div>
    </EditCell>
    <Teleport to="#app">
      <CropImage ref="cropImageRef" @confirm="changeWallpaper" />
    </Teleport>
  </Frame>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { ColorPicker, RadioTaget, CropImage, AnimateInput, AutoSlider } from '@/components';
import * as OPTIONS from '../options';
import useStore from '@/store/modules/useStore';
import { StylesOption } from '@/store/types';
import Frame from '../comp/Frame.vue';
import EditCell from '../comp/EditCell.vue';
import { uploadFile, fileToBlob, getFileType } from '@/utils/file';
import { closeToast, showConfirmDialog, showLoadingToast, showToast } from 'vant';

// const from = ref<Record<string, DefineOpt>>({});

const store = useStore();
const wallpaperOptions = computed(() => store.stylesOption.wallpaper);
const activeType = computed(() => OPTIONS.backgroundOptions.findIndex(e => e.type === wallpaperOptions.value.options?.wallpaperType));
const inputTitle = computed(() => {
  const actions: Record<number, string> = {
    1: '本地',
    2: '在线图片',
    3: '网页地址',
    4: '在线视频'
  };
  return actions[inputType.value || 2];
});
const inputType = ref(0);
const form = ref({
  onlineUrl: '',
})
// 直接通过引用类型修改state
const editForm = ref<StylesOption['wallpaper']>({});
const cropImageRef = ref<InstanceType<typeof CropImage>>();

/** 更新壁纸地址及类型 */
const changeWallpaper = (wallpaperType: number, data: Blob | string | null, video: boolean) => {
  if (wallpaperOptions.value.options?.onlineUrl && (wallpaperOptions.value.options?.onlineUrl).startsWith('blob')) window.URL.revokeObjectURL(wallpaperOptions.value.options?.onlineUrl);
  if (wallpaperType === 1) {
    store.UPDATE_STYLES(['wallpaper', 'options', 'file'], data);
    store.UPDATE_STYLES(['wallpaper', 'options', 'onlineUrl'], '');
  }
  if ([2, 3, 4].includes(wallpaperType)) {
    store.UPDATE_STYLES(['wallpaper', 'options', 'file'], null);
    store.UPDATE_STYLES(['wallpaper', 'options', 'onlineUrl'], data);
  }
  store.UPDATE_STYLES(['wallpaper', 'options', 'wallpaperType'], wallpaperType);
  store.UPDATE_STYLES(['wallpaper', 'options', 'video'], video);
}
/** 本地图片上传 */
const onUpload = async () => {
  try {
    const res = await uploadFile();
    const { type, file } = res;
    const blobUrl = window.URL.createObjectURL(file);
    if (type === 'image') {
      showConfirmDialog({
        title: '提示',
        message: '是否需要裁剪图片?',
        confirmButtonText: '裁剪',
        cancelButtonText: '不裁剪',
      }).then(() => {
        if (cropImageRef.value) cropImageRef.value.onCrop(blobUrl);
      }).catch(async () => {
        showLoadingToast('请稍等..')
        const blob = await fileToBlob(file);
        changeWallpaper(1, blob, false);
        closeToast();
      })
    } else {
      const blob = await fileToBlob(file);
      changeWallpaper(1, blob, true);
    }
  } catch (error) {
    showToast('图片上传失败,可以重试一下')
  }
}
/** 提交网络图片/视频地址 */
const onInputConfirm = async (val: string) => {
  if (!val) {
    showToast(`请输入${inputTitle.value}!`)
    return false;
  };
  console.log(inputType.value);
  // 在线图片
  if (inputType.value === 2) {
    changeWallpaper(2, form.value.onlineUrl, false);
  }
  // 网页地址
  if (inputType.value === 3) {
    changeWallpaper(3, form.value.onlineUrl, false);
  }
  if (inputType.value === 4) {
    changeWallpaper(4, form.value.onlineUrl, true);
  }

  showToast('已修改')
}
/** 壁纸修改 */
const onEditBackground = async (data: {
  label: string;
  value: string;
  type: any;
}) => {
  const { value, type } = data;
  inputType.value = type;
  if (value === 'local') {
    onUpload();
  }
  form.value.onlineUrl = wallpaperOptions.value.options?.wallpaperType === type ? (wallpaperOptions.value.options?.onlineUrl || '') : '';

};

onMounted(() => {
  editForm.value = wallpaperOptions.value;
  form.value.onlineUrl = wallpaperOptions.value.options?.onlineUrl || '';
  inputType.value = wallpaperOptions.value.options?.wallpaperType || 0;
});
</script>

<style scoped>
.EditWallpaper {
  /* background: linear-gradient(-198deg,
      var(--color-ared) 20%,
      var(--color-dblue) 0,
      var(--color-dblue) 82%,
      var(--color-ablue) 0); */
}
</style>

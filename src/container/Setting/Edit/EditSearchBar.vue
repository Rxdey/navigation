<template>
  <Frame class="EditSearchbar" title="搜索框设置" @click.stop v-if="from.navigation?.styles && from.searchbar?.styles && from.searchbar?.options">
    <EditCell title="框聚焦时">
      <div class="text-white text-xs flex-row gap-20">
        <div class="flex-center gap-12">
          <label>模糊</label>
          <van-switch v-model="from.searchbar.options.blurOnFocus" size="18px" active-color="--color-primary" style="--van-switch-width:2.3em" />
        </div>
        <div class="flex-center gap-12">
          <label>放大</label>
          <van-switch v-model="from.searchbar.options.scaleOnFocus" size="18px" active-color="--color-primary" style="--van-switch-width:2.3em" />
        </div>
      </div>
    </EditCell>
    <EditCell :title="`距离顶部(${from.navigation.styles.top})`" class="mb-32">
      <AutoSlider :min="0" :max="100" :step="1" v-model="from.navigation.styles.top" unit="%" />
    </EditCell>
    <EditCell :title="`宽度(${from.searchbar.styles?.width})`" class="mb-32">
      <AutoSlider :min="50" :max="100" :step="1" v-model="from.searchbar.styles.width" unit="%" />
    </EditCell>
    <EditCell :title="`高度(${from.searchbar.styles?.height})`" class="mb-32">
      <AutoSlider :min="30" :max="150" :step="1" v-model="from.searchbar.styles.height" unit="px" />
    </EditCell>
    <EditCell title="圆角" class="mb-32">
      <AutoSlider :min="0" :max="parseInt(from.searchbar.styles.height || '100')" :step="1" v-model="from.searchbar.styles.borderRadius" unit="px" />
    </EditCell>
    <EditCell :title="`下边距(${from.searchbar.styles.marginBottom})`" class="mb-32">
      <AutoSlider :min="0" :max="200" :step="1" v-model="from.searchbar.styles.marginBottom" unit="px" />
    </EditCell>
    <EditCell title="颜色(含透明度)" class="mb-32">
      <div class="text-white flex-row gap-20 text-xs">
        <div class="flex-center gap-20">
          <label>背景</label>
          <ColorPicker v-if="from.searchbar.styles?.backgroundColor" v-model="(from.searchbar.styles.backgroundColor as string)" />
        </div>
        <div class="flex-center gap-20">
          <label>阴影</label>
          <ColorPicker v-if="from.searchbar.styles?.custom?.shadow" v-model="(from.searchbar.styles.custom.shadow)" />
        </div>
      </div>
    </EditCell>
  </Frame>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { AutoSlider, ColorPicker } from '@/components';
import Frame from '../comp/Frame.vue';
import EditCell from '../comp/EditCell.vue';
import { DefineOpt } from '@/store/types';
import useStore from '@/store/modules/useStore';

const store = useStore();

const from = ref<Record<string, DefineOpt>>({});

onMounted(() => {
  from.value = {
    navigation: store.stylesOption.navigation,
    searchbar: store.stylesOption.searchbar,
  };
});

</script>

<style scoped></style>

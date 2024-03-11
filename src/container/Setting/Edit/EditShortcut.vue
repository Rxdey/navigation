<template>
  <div class="EditShortcut transition-30 mx-16 min-h-50vh p-32" @click.stop v-if="from.navigation?.styles && from.searchbar?.styles && from.searchbar?.options">
    <EditCell title="搜索框聚焦时">
      <div class="text-white text-xs flex-row gap-20">
        <div class="flex-center gap-12">
          <label>模糊</label>
          <van-switch v-model="from.searchbar.options.blurOnFocus" size="18px" active-color="#9b56fc" style="--van-switch-width:2.3em" />
        </div>

        <div class="flex-center gap-12">
          <label>放大</label>
          <van-switch v-model="from.searchbar.options.scaleOnFocus" size="18px" active-color="#9b56fc" style="--van-switch-width:2.3em" />
        </div>
      </div>
    </EditCell>
    <EditCell :title="`搜索框位置(${from.navigation.styles.top})`" class="mb-32">
      <AutoSlider :min="0" :max="100" :step="1" v-model="from.navigation.styles.top" unit="%" />
    </EditCell>
    <EditCell :title="`搜索框宽度(${from.searchbar.styles?.width})`" class="mb-32">
      <AutoSlider :min="50" :max="100" :step="1" v-model="from.searchbar.styles.width" unit="%" />
    </EditCell>
    <EditCell :title="`搜索框高度(${from.searchbar.styles?.height})`" class="mb-32">
      <AutoSlider :min="30" :max="150" :step="1" v-model="from.searchbar.styles.height" unit="px" />
    </EditCell>
    <EditCell title="搜索框圆角" class="mb-32">
      <AutoSlider :min="0" :max="parseInt(from.searchbar.styles.height || '100')" :step="1" v-model="from.searchbar.styles.borderRadius" unit="px" />
    </EditCell>
    <EditCell :title="`搜索框下边距(${from.searchbar.styles.marginBottom})`" class="mb-32">
      <AutoSlider :min="0" :max="200" :step="1" v-model="from.searchbar.styles.marginBottom" unit="px" />
    </EditCell>
    <EditCell title="搜索框颜色" class="mb-32">
      <ColorPicker v-if="from.searchbar.styles?.backgroundColor" v-model="(from.searchbar.styles.backgroundColor as string)" />
    </EditCell>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { AutoSlider, ColorPicker } from '@/components';
import EditCell from '../comp/EditCell.vue';
import { DefineOpt } from '@/store/types';
import useStore from '@/store/modules/useStore';

const store = useStore();

const from = ref<Record<string, DefineOpt>>({});

onMounted(() => {
  from.value = {
    navigation: store.stylesOption.navigation,
    searchbar: store.stylesOption.searchbar,
    shortcut: store.stylesOption.shortcut
  };
});

</script>

<style scoped>
.EditShortcut {
  box-shadow: 0 0 16px rgba(0, 0, 0, 1);
  background-color: var(--color-ablue);
  /* background: linear-gradient(-198deg,
      var(--color-ared) 20%,
      var(--color-dblue) 0,
      var(--color-dblue) 82%,
      var(--color-ablue) 0); */
}
</style>

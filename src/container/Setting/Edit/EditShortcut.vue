<template>
  <Frame class="EditShortcut" title="导航设置(含搜索引擎)" @click.stop v-if="form.shortcut?.options && form.shortcut?.styles?.custom && form.engine?.styles">
    <EditCell title="隐藏">
      <van-switch v-model="form.shortcut.options.hide" size="18px" active-color="--color-primary" style="--van-switch-width:2.3em" />
    </EditCell>
    <EditCell title="排列方式" class="mb-32">
      <RadioTaget v-model="form.shortcut.options.arrangement" :options="OPTIONS.arrangementOptions" />
    </EditCell>
    <EditCell :title="`导航分栏(每行${form.shortcut.styles.custom.gridCol}个,仅格栅有效)`" class="mb-32" v-show="form.shortcut.options.arrangement === 1">
      <AutoSlider :min="2" :max="10" :step="1" v-model="form.shortcut.styles.custom.gridCol" />
    </EditCell>
    <EditCell :title="`导航间距(${form.shortcut.styles.custom.gap})`" class="mb-32">
      <AutoSlider :min="0" :max="50" :step="1" v-model="form.shortcut.styles.custom.gap" unit="px" />
    </EditCell>
    <EditCell title="整体背景颜色(含透明度)" class="mb-32">
      <div class="text-white flex-row gap-20 text-xs">
        <div class="flex-center gap-20">
          <label>导航</label>
          <ColorPicker v-model="form.shortcut.styles.backgroundColor" />
        </div>
        <div class="flex-center gap-20">
          <label>搜索引擎</label>
          <ColorPicker v-model="form.engine.styles.backgroundColor" />
        </div>
      </div>
    </EditCell>
    <EditCell title="其它设置" class="mb-32">
      <div class="flex-row gap-20">
        <van-button round type="primary" size="small" icon="plus" @click="onAdd('shortcut')">添加导航</van-button>
      <van-button round type="primary" size="small" icon="plus" @click="onAdd('engine')">添加引擎</van-button>
      </div>
    </EditCell>
  </Frame>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { AutoSlider, ColorPicker, RadioTaget } from '@/components';
import Frame from '../comp/Frame.vue';
import EditCell from '../comp/EditCell.vue';
import { DefineOpt } from '@/store/types';
import useStore from '@/store/modules/useStore';
import * as OPTIONS from '../options';

const store = useStore();
const emit = defineEmits(['add']);
const form = ref<Record<string, DefineOpt>>({});

const onAdd = (type: string) => {
  emit('add', type)
}

onMounted(() => {
  form.value = {
    shortcut: store.stylesOption.shortcut,
    engine: store.stylesOption.engine
  };
});

</script>

<style scoped></style>

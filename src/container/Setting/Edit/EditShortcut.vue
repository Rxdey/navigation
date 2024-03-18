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

    <EditCell :title="`字体大小(${form.shortcut.styles.fontSize})`" class="mb-48">
      <AutoSlider :min="10" :max="48" :step="1" v-model="form.shortcut.styles.fontSize" unit="px" />
    </EditCell>

    <EditCell title="整体背景颜色(含透明度)" class="mb-32">
      <p class="text-gray text-xs mb-16">Tip:整体默认颜色，不影响单独配置</p>
      <div class="text-white flex-row gap-20 text-xs items-center">
        <div class="flex-center gap-20">
          <label>导航</label>
          <ColorPicker v-model="form.shortcut.styles.backgroundColor" />
        </div>
        <div class="flex-center gap-20">
          <label>搜索引擎</label>
          <ColorPicker v-model="form.engine.styles.backgroundColor" />
        </div>
        <div class="inline-block text-gray text-xs px-16" @click="resetColor">重置颜色</div>
      </div>
    </EditCell>

    <EditCell title="搜索引擎激活颜色" v-if="form.engine.styles.custom">
      <div class="text-white flex-row gap-20 text-xs">
        <div class="flex-center gap-20">
          <label>文本</label>
          <ColorPicker v-model="form.engine.styles.custom.color" />
        </div>
        <div class="flex-center gap-20">
          <label>背景</label>
          <ColorPicker v-model="form.engine.styles.custom.background" />
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

const resetColor = () => {
  form.value.shortcut.styles!.backgroundColor = 'rgba(237, 237, 237, .9)';
  form.value.engine.styles!.backgroundColor = 'rgba(237, 237, 237, .9)';
};
onMounted(() => {
  form.value = {
    shortcut: store.stylesOption.shortcut,
    engine: store.stylesOption.engine
  };
});

</script>

<style scoped></style>

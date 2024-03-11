<template>
  <Frame class="EditShortcut" title="导航设置(含搜索引擎)" @click.stop v-if="from.shortcut?.options && from.shortcut?.styles?.custom && from.engine?.styles">

    <EditCell title="排列方式" class="mb-32">
      <RadioTaget v-model="from.shortcut.options.arrangement" :options="OPTIONS.arrangementOptions" />
    </EditCell>
    <EditCell :title="`导航分栏(每行${from.shortcut.styles.custom.gridCol}个 仅格栅有效)`" class="mb-32" v-show="from.shortcut.options.arrangement === 1">
      <AutoSlider :min="2" :max="10" :step="1" v-model="from.shortcut.styles.custom.gridCol" />
    </EditCell>
    <EditCell :title="`导航间距(${from.shortcut.styles.custom.gap})`" class="mb-32">
      <AutoSlider :min="0" :max="50" :step="1" v-model="from.shortcut.styles.custom.gap" unit="px" />
    </EditCell>


    <EditCell title="整体颜色(含透明度)" class="mb-32">
      <div class="text-white flex-row gap-20 text-xs">
        <div class="flex-center gap-20">
          <label>导航</label>
          <ColorPicker v-if="from.shortcut.styles?.backgroundColor" v-model="from.shortcut.styles.backgroundColor" />
        </div>
        <div class="flex-center gap-20">
          <label>搜索引擎</label>
          <ColorPicker v-if="from.engine.styles?.backgroundColor" v-model="from.engine.styles.backgroundColor" />
        </div>
      </div>
    </EditCell>

    <EditCell title="其它设置" class="mb-32">
      <van-button round type="primary" size="small" icon="plus">添加导航</van-button>
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

const from = ref<Record<string, DefineOpt>>({});

onMounted(() => {
  from.value = {
    shortcut: store.stylesOption.shortcut,
    engine: store.stylesOption.engine
  };
});

</script>

<style scoped></style>

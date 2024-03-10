<template>
  <div class="EditShortcut transition-30 mx-16 min-h-50vh p-32" @click.stop>
    <FrameComp :title="`搜索框位置(${form.top}%)`" class="mb-32">
      <van-slider v-model="form.top" :min="0" :max="100" :step="1" class="mt-32" @update:model-value="onChange($event, ['navigation', 'styles', 'top'])">
        <template #button>
          <div class="slider-button"></div>
        </template>
      </van-slider>
    </FrameComp>
    <!-- TODO 改造slider -->
    <!-- <FrameComp :title="`搜索框宽度(${searchForm.styles.custom.mask})`" class="mb-32">
      <van-slider v-model="editForm.styles.custom.mask" :min="0" :max="1" :step="0.01" class="mt-32">
        <template #button>
          <div class="slider-button"></div>
        </template>
      </van-slider>
    </FrameComp> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import FrameComp from '../comp/FrameComp.vue';
import { StylesOption } from '@/store/types';
import useStore from '@/store/modules/useStore';

const store = useStore();

const navgationOptions = computed(() => store.stylesOption.navigation);
const searchbarOptions = computed(() => store.stylesOption.searchbar);
const shortcutOptions = computed(() => store.stylesOption.shortcut);

const form = ref({
  top: 0
});
const searchForm = ref<StylesOption['searchbar']>({});
const shortcutForm = ref<StylesOption['shortcut']>({});
/** 原值手动修改 */
const onChange = (val: any, type: string[]) => {
  store.UPDATE_STYLES(type, `${val}%`);
};
onMounted(() => {
  form.value.top = parseInt(navgationOptions.value?.styles?.top || '0');
  searchForm.value = searchbarOptions.value;
  shortcutForm.value = shortcutOptions.value;
});

</script>

<style scoped>
.EditShortcut {
  box-shadow: 0 0 16px rgba(0, 0, 0, 1);
  background: linear-gradient(-198deg,
      var(--color-ared) 20%,
      var(--color-dblue) 0,
      var(--color-dblue) 82%,
      var(--color-ablue) 0);
}
</style>

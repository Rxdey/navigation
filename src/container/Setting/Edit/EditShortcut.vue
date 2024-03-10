<template>
  <div class="EditShortcut transition-30 mx-16 min-h-50vh p-32 text-white" @click.stop>
    导航设置
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import FrameComp from '../comp/FrameComp.vue';

import useStore from '@/store/modules/useStore';

const store = useStore();

const onReset = () => {
  store.RESET_STORE();
};
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

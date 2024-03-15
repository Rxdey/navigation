<template>
  <div class="relative leading-[1] mt-24">
    <div class="animate-input-wrap flex-row px-8 pb-20 pt-28 relative text-white border-b-[--color-primary] border-b-solid bg-transparent border-b-5 text-xs" :class="{ focus: isFoucs }">
      <div class="absolute left-8 transition-30 pointer-events-none" :class="(isFoucs || value) ? 'top-0 -translate-y-1/5 text-xs text-primary' : 'top-1/2 -translate-y-1/2'">
        {{ title }}
      </div>
      <div class="flex-1">
        <input type="text" class="border-none outline-none w-full bg-transparent" @focus="onfoucs" @blur="onblur" v-model="value" @keydown.enter="onEnter">
      </div>

      <div v-show="showIcon">
        <slot name="icon"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useVModel } from '@vueuse/core';

const emit = defineEmits(['update:modelValue', 'enter', 'focus', 'blur']);

const props = defineProps<{
  modelValue: string;
  title?: string;
  placeholder?: string;
}>();
const value = useVModel(props, 'modelValue', emit);

const isFoucs = ref(false);
const showIcon = ref(false);

const onEnter = () => {
  emit('enter', value.value);
};
const onfoucs = () => {
  isFoucs.value = true;
  showIcon.value = true;
  emit('focus', value.value);
};
const onblur = () => {
  isFoucs.value = false;
  setTimeout(() => {
    showIcon.value = false;
  }, 100);
  emit('blur', value.value);
};
</script>

<style scoped>
.animate-input-wrap {}
</style>

<template>
  <div class="AnimateInput relative py-16" :class="{ focus: isFoucs }">
    <div class="transition-30 text-xs text-white mb-8 origin-top-left" :class="isFoucs && 'text-primary scale-90'">{{ title }}</div>
    <div class="flex-row transition-30 origin-left-center" :class="isFoucs ? 'scale-100' : 'scale-90'">
      <div class="relative flex-1">
        <input type="text" class="text-white border-none h-full outline-none w-full placeholder:(text-sm text-gray) bg-transparent" :placeholder="placeholder" @focus="onfoucs" @blur="onblur" v-model="value" @keydown.enter="onEnter">
      </div>
      <Transition name="scale">
        <div v-show="showIcon">
          <slot name="icon"></slot>
        </div>
      </Transition>
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
.AnimateInput {

  &::before,
  &::after {
    content: '';
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #ededed;
  }

  &::after {
    z-index: 2;
    width: 0;
    transition: all .3s;
    background-color: var(--color-primary);
  }

  &.focus::after {
    width: 100%;
  }
}
</style>

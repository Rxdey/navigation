<template>
    <div class="wallpaper absolute" :class="{ custom: !!isFocusBlur }">
        <div class="wallpaper-mask h-full" :class="maskType"></div>
    </div>
</template>

<script setup  lang="ts">
import useStore from '@/store/modules/useStore';
import { computed } from 'vue';

const store = useStore();
const wallpaper = computed(() => store.stylesOption.wallpaper);

const isFocusBlur = computed(() => wallpaper.value.styles?.custom?.focusBlur);
const maskType = computed(() => wallpaper.value.options?.maskType || 'color');

// 动态创建image
// const bgImage = computed(() => `url(${store.stylesOption.wallpaper.options?.imageUrl})`)
</script>

<style>
.wallpaper {
    top: calc(var(--wallpaper-custom-blur)*-1);
    left: calc(var(--wallpaper-custom-blur)*-1);
    bottom: calc(var(--wallpaper-custom-blur)*-1);
    right: calc(var(--wallpaper-custom-blur)*-1);
    transition: .3s all linear;
    filter: blur(var(--wallpaper-custom-blur));

    &.custom {
        filter: blur(var(--wallpaper-custom-focusBlur));
        transform: scale(1.02);
    }

    .wallpaper-mask {
        &.radial {
            background-image: radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, var(--wallpaper-custom-mask)) 100%);
        }

        &.color {
            background-color: rgba(0, 0, 0, var(--wallpaper-custom-mask))
        }
    }
}
</style>

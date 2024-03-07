<template>
    <div class="wallpaper absolute" :class="{ custom: !!isCustomBlur }">
        <div class="wallpaper-mask h-full" :class="maskType"></div>
    </div>
</template>

<script setup  lang="ts">
import useStore from '@/store/modules/useStore';
import { computed } from 'vue';

const store = useStore();
const isCustomBlur = computed(() => store.stylesOption.wallpaper.styles?.custom?.blur);
const maskType = computed(() => store.stylesOption.wallpaper.options?.maskType || 'color');
</script>

<style>
.wallpaper {
    top: calc(var(--wallpaper-filter-blur)*-1);
    left: calc(var(--wallpaper-filter-blur)*-1);
    bottom: calc(var(--wallpaper-filter-blur)*-1);
    right: calc(var(--wallpaper-filter-blur)*-1);
    transition: .3s all linear;

    &.custom {
        filter: blur(var(--wallpaper-custom-blur));
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

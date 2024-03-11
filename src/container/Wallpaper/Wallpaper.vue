<template>
    <div class="wallpaper transition-100 absolute overflow-hidden w-full" :class="{ focus: isFocus && blurOnFocus, scale: scaleOnFocus && isFocus, reflect: showMenu }">
        <div class="wallpaper-mask wh-full top-0 left-0" :class="maskType"></div>
    </div>
</template>

<script setup  lang="ts">
import { computed, watch, inject, Ref } from 'vue';
import useStore from '@/store/modules/useStore';
import useStatus from '@/store/modules/useStatus';

const store = useStore();
const statusStore = useStatus();

const showMenu: Ref<boolean> | undefined = inject('showMenu');
const wallpaper = computed(() => store.stylesOption.wallpaper);

/** 是否聚焦 */
const isFocus = computed(() => statusStore.focus);
const blurOnFocus = computed(() => store.stylesOption.searchbar.options?.blurOnFocus);
const scaleOnFocus = computed(() => store.stylesOption.searchbar.options?.scaleOnFocus);

const maskType = computed(() => wallpaper.value.options?.maskType || 'color');
const options = computed(() => wallpaper.value.options || {});

const height = window.innerHeight + 'px';
const createBackground = () => {
    const actions = {
        1: () => {
            if (!options.value.imageFile) return '';
            const url = window.URL.createObjectURL(options.value.imageFile);
            store.UPDATE_STYLES(['wallpaper', 'styles', 'background', 'image'], `url(${url})`);
            return;
        },
        2: () => {
            store.UPDATE_STYLES(['wallpaper', 'styles', 'background', 'image'], `url(${options.value.imageUrl})`);
            return;
        },
        3: () => {

        },
    };
    actions[options.value.imageType || 2]();
};
watch(() => [options.value.imageType, options.value.imageFile, options.value.imageUrl, options.value.videoSource], (val) => {
    createBackground();
}, {
    immediate: true
});

</script>

<style>
.wallpaper {
    /* top: calc(var(--wallpaper-custom-blur)*-1);
    left: calc(var(--wallpaper-custom-blur)*-1);
    bottom: calc(var(--wallpaper-custom-blur)*-1);
    right: calc(var(--wallpaper-custom-blur)*-1); */
    filter: blur(var(--wallpaper-custom-blur));
    /* -webkit-box-reflect: below 10px linear-gradient(rgba(0, 0, 0, 0), rgba(255, 255, 255, .7)); */
    height: v-bind(height);

    &.reflect {
        border-radius: 48px;
        overflow: hidden;
    }

    &.focus {
        filter: blur(2px);
        transform: scale(1.01);
    }

    &.scale {
        transform: scale(1.1);
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

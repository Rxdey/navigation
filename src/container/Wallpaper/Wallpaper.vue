<template>
    <div class="wallpaper absolute" :class="{ focus: !!isFocusBlur, reflect: showMenu }">
        <div class="wallpaper-mask h-full" :class="maskType"></div>
    </div>
</template>

<script setup  lang="ts">
import { computed, watch, inject } from 'vue';
import useStore from '@/store/modules/useStore';
import { Ref } from 'vue';

const store = useStore();
const showMenu: Ref<boolean> | undefined = inject('showMenu');
const wallpaper = computed(() => store.stylesOption.wallpaper);
const isFocusBlur = computed(() => wallpaper.value.styles?.custom?.focusBlur);
const maskType = computed(() => wallpaper.value.options?.maskType || 'color');
const options = computed(() => wallpaper.value.options || {});

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

watch(() => options.value.imageType, (val) => {
    createBackground();
}, {
    immediate: true
})
</script>

<style>
.wallpaper {
    top: calc(var(--wallpaper-custom-blur)*-1);
    left: calc(var(--wallpaper-custom-blur)*-1);
    bottom: calc(var(--wallpaper-custom-blur)*-1);
    right: calc(var(--wallpaper-custom-blur)*-1);
    transition: .3s all linear;
    filter: blur(var(--wallpaper-custom-blur));
    -webkit-box-reflect: below 10px linear-gradient(rgba(0, 0, 0, 0), rgba(255, 255, 255, .7));

    &.reflect {

        border-radius: 48px;
        overflow: hidden;
    }

    &.focus {
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

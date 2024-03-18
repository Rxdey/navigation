<template>
    <div class="wallpaper-wrap transition-100 absolute w-full pixel-40" :class="{ focus: isFocus && blurOnFocus, scale: scaleOnFocus && isFocus, 'rounded-48': showMenu }">
        <div class="wallpaper-mask absolute wh-full top-0 left-0 z-5 transition-30" :class="[maskType, { 'rounded-48': showMenu }]" v-if="options.wallpaperType !== 3"></div>
        <div class="wallpaper wh-full overflow-hidden relative z-1" :class="{ 'rounded-48': showMenu }">
            <!-- 视频壁纸 -->
            <template v-if="options.video && videoSource">
                <div class="relative wh-full select-none">
                    <video :src="videoSource" class="wh-full" :style="{ objectFit: wallpaper.styles?.background?.size }" loop autoplay name="media" muted playsinline @playing="onVideoPlaying" ref="vieoRef"></video>
                </div>
                <!-- <div class="absolute bottom-32 left-32 color-white text-40 z-10" @click="onMuted">
                    <div class="i-mingcute:volume-line" v-if="!options.muted"></div>
                    <div class="i-mingcute:volume-off-line" v-else></div>
                </div> -->
            </template>
            <!-- 网页壁纸 -->
            <template v-if="options.wallpaperType === 3">
                <div>
                    <iframe id="wallFrame" :src="options.onlineUrl" width="100%" :height="height" class="border-none outline-none overflow-hidden"></iframe>
                </div>
            </template>
        </div>


        <!-- 倒影 -->
        <!-- <Transition name="fade">
            <div class="reflect wallpaper wh-full rounded-48 overflow-hidden absolute top-101% pointer-events-none" v-if="showMenu">
                <template v-if="options.video && videoSource">
                    <div class="relative wh-full select-none">
                        <video :src="videoSource" class="wh-full" :style="{ objectFit: wallpaper.styles?.background?.size }" loop autoplay name="media" muted playsinline></video>
                    </div>
                </template>
            </div>
        </Transition> -->
    </div>
</template>

<script setup  lang="ts">
import { computed, watch, inject, Ref, ref } from 'vue';
import useStore from '@/store/modules/useStore';
import useStatus from '@/store/modules/useStatus';
import useResize from '@/hooks/useResize';

const store = useStore();
const statusStore = useStatus();
const { windowHeight, innerHeight } = useResize();

const height = computed(() => Math.max(windowHeight.value, innerHeight) + 'px');

const showMenu: Ref<boolean> | undefined = inject('showMenu');
const wallpaper = computed(() => store.stylesOption.wallpaper);
/** 是否聚焦 */
const isFocus = computed(() => statusStore.focus);
const blurOnFocus = computed(() => store.stylesOption.searchbar.options?.blurOnFocus);
const scaleOnFocus = computed(() => store.stylesOption.searchbar.options?.scaleOnFocus);

const maskType = computed(() => wallpaper.value.options?.maskType || 'color');
const options = computed(() => wallpaper.value.options || {});
const videoSource = ref('');
const vieoRef = ref<HTMLVideoElement>();

const createBackground = () => {
    const actions = {
        1: () => {
            // 本地视频/图片
            if (!options.value.file) return;
            if (options.value.video) {
                store.UPDATE_STYLES(['wallpaper', 'styles', 'background', 'image'], '');
                videoSource.value = window.URL.createObjectURL(options.value.file);
            } else {
                const url = window.URL.createObjectURL(options.value.file);
                store.UPDATE_STYLES(['wallpaper', 'styles', 'background', 'image'], `url(${url})`);
                return;
            }
        },
        2: () => {
            store.UPDATE_STYLES(['wallpaper', 'styles', 'background', 'image'], `url(${options.value.onlineUrl})`);
            return;
        },
        3: () => {
            // 清除原背景图
            store.UPDATE_STYLES(['wallpaper', 'styles', 'background', 'image'], '');
        },
        4: () => {
            // 在线视频
            videoSource.value = options.value.onlineUrl || '';
        }
    };
    actions[options.value.wallpaperType || 2]();
};

const onVideoPlaying = (e: Event) => {
    // console.log(e);
    const video = e.target as HTMLVideoElement;
    if (options.value.muted) video.muted = true;
};
const onMuted = () => {
    store.UPDATE_STYLES(['wallpaper', 'options', 'muted'], !options.value.muted);
    if (vieoRef.value) vieoRef.value.muted = true;
};
watch(() => [options.value.wallpaperType, options.value.file, options.value.onlineUrl, options.value.video], (val) => {
    createBackground();
}, {
    immediate: true
});

</script>

<style>
.wallpaper-wrap {
    filter: blur(var(--wallpaper-custom-blur));
    /* reflect属性卡顿 */
    /* -webkit-box-reflect: below 10px linear-gradient(rgba(0, 0, 0, 0), rgba(255, 255, 255, .7)); */
    height: v-bind(height);



    &.focus {
        filter: blur(2px);
        transform: scale(1.01);
    }

    &.scale {
        transform: scale(1.1);
    }

    /* .wallpaper {
        &.reflect {
            border-radius: 48px;
        }
    } */

    .wallpaper-mask {
        &.radial {
            background-image: radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, var(--wallpaper-custom-mask)) 100%);
        }

        &.color {
            background-color: rgba(0, 0, 0, var(--wallpaper-custom-mask))
        }
    }

    .reflect {
        transform: rotateY(0deg) rotateX(180deg);
        opacity: .3;
    }
}
</style>

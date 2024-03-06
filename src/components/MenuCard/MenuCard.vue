<template>
    <div class="flex-row items-center text-center font-bold text-black bg-[#ededed] rounded-8 active:opacity-90 cursor-pointer leading-[1]" :class="!small ? 'px-12 py-20' : 'px-12 py-12'" @transitionend="onEnd">
        <span class="wh-24 mr-8" v-if="icon"><img class="cover-image" src="/img/shortcut/bilibili.png" /></span>
        <span class="flex-1 min-w-0 van-ellipsis">
            <slot>
                {{ name }}
            </slot>
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';

type PropsType = {
    icon?: string;
    name?: string;
    small?: boolean;
};
const props = defineProps<PropsType>();
/** 动画结束移除渐进延迟 */
const onEnd = (e: Event) => {
    (e.target as HTMLDivElement).style.transitionDelay = '0s'
}
</script>

<style scoped></style>

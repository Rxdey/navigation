<template>
    <div class="navigation w-full absolute" :class="visible ? '' : 'bottom-0 !top-unset'">
        <div class="searchbar relative h-80 flex-row items-center text-32 rounded-full px-32">
            <div class="flex-1">
                <input type="text" class="outline-none border-none bg-transparent" @focus="onfocus" @blur="onblur">
            </div>
            <div class=""></div>
        </div>
        <transition name="van-fade">
            <div class="shortcut-wrap relative text-xs grid grid-cols-4 gap-20" v-show="visible">
                <div class="shortcut flex-row items-center px-12 py-20 text-center font-bold text-black" v-for="d in 7">
                    <!-- <span class="wh-24 mr-8"><img class="cover-image" src="/img/shortcut/bilibili.png"></span> -->
                    <span class="flex-1 min-w-0 van-ellipsis">百度</span>
                </div>
            </div>
        </transition>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';

const visible = ref(true);

const onfocus = () => {
    visible.value = false;
};
const onblur = () => {
    visible.value = true;
};
onMounted(() => {

});
</script>

<style scoped>
.navigation {
    transition: .5s all;
}

.searchbar {
    left: calc(50% - var(--searchbar-width) / 2);
}

.shortcut-wrap {
    width: var(--searchbar-width);
    left: calc(50% - var(--searchbar-width) / 2);
}
</style>

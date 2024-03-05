<template>
    <div class="navigation w-full absolute" :class="{ animateBottom: !visible }">
        <!-- 搜索框 -->
        <SearchBar @focus="onfocus" @blur="onblur" @clear="lockEngine" />
        <!-- 搜索引擎 -->
        <TransitionGroup name="fade-inout" tag="div" @enter="onEnter" @leave="onLeave" class="engine-wrap text-xs flex-row gap-10">
            <MenuCard class="engine" :class="activeEngine === i ? '!bg-[--engine-active-background] !text-[--engine-active-color]' : ''" v-for="(engine, i) in engineList" :key="i" v-show="!visible" :data-index="i" data-type="engine" :name="engine.title" small @click="onSelectEngine(i)" />
        </TransitionGroup>

        <!-- 快捷导航 -->
        <TransitionGroup name="fade-inout" tag="div" @enter="onEnter" @leave="onLeave" class="shortcut-wrap text-xs grid grid-cols-4 gap-20">
            <MenuCard class="shortcut" v-for="(shortcut, i) in shortcutList" :key="i" :data-index="i" :name="shortcut.title" v-show="visible" />
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';
import { MenuCard, SearchBar } from '@/components';

const visible = ref(true);
const engineClick = ref(false);
const activeEngine = ref(0);

const shortcutList = [
    { title: 'bilibili', url: '' },
    { title: 'Github', url: '' },
    { title: '百度贴吧', url: '' },
    { title: '知乎', url: '' },
    { title: '煎蛋网', url: '' },
    { title: '高德地图', url: '' },
    { title: '京东', url: '' },
    { title: '淘宝', url: '' },
    { title: '千帆搜索', url: '' },
    { title: '源仓库', url: '' },
];
const engineList = [
    { title: '必应', url: '' },
    { title: '谷歌', url: '' },
    { title: '百度', url: '' },
    { title: 'Yindex', url: '' },
    { title: '搜狗', url: '' },
    { title: '360', url: '' },
];
const lockEngine = () => {
    engineClick.value = true;
    setTimeout(() => {
        engineClick.value = false;
    }, 100);
};
const onfocus = () => {
    visible.value = false;
};
const onblur = () => {
    setTimeout(() => {
        if (engineClick.value) return;
        visible.value = true;
    }, 0);
};
const onEnter = (el: any) => {
    const index: number = el.dataset.index || 0;
    const type: string = el.dataset.type;
    const x = type === 'engine' ? 0.3 : 0
    const transitiondelay = `${index * 0.03 + x}s`;
    el.style.transitionDelay = transitiondelay;
};
// 离开动画是反向
const onLeave = (el: any) => {
    const index: number = el.dataset.index || 0;
    const type: string = el.dataset.type;
    const transitiondelay = `${(7 - index) * 0.03}s`;
    el.style.transitionDelay = transitiondelay;
};
/** 选择默认引擎 */
const onSelectEngine = (i: number) => {
    activeEngine.value = i;
    lockEngine()
}
onMounted(() => {

});
</script>

<style scoped>
.navigation {
    transition: 0.5s all;

    /* &.animateBottom {
        top: calc(100% - var(--searchbar-height) - 100px);
    } */
}


.shortcut-wrap,
.engine-wrap {
    position: absolute;
    width: var(--searchbar-width);
    top: calc(var(--searchbar-height) + var(--searchbar-active-marginBottom));
    left: calc(50% - var(--searchbar-width) / 2);
}
</style>

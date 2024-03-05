<template>
    <div class="navigation w-full absolute" :class="{ animateBottom: resize }">
        <!-- 搜索框 -->
        <SearchBar @focus="onfocus" @blur="onblur" @clear="lockEngine" />
        <!-- 搜索引擎 -->
        <TransitionGroup name="fade-inout" tag="div" @enter="onEnter" @leave="onLeave" class="engine-wrap text-xs flex-row gap-10">
            <MenuCard class="engine" :class="{ active: activeEngine === i }" v-for="(engine, i) in engineList" :key="i" v-show="!visible" :data-index="i" data-type="engine" small @click="onSelectEngine(i, engine)">
                <span v-if="!engine.add">{{ engine.title }}</span>
                <div v-else class="i-mingcute:add-fill"></div>
            </MenuCard>
        </TransitionGroup>
        <!-- 快捷导航 -->
        <TransitionGroup name="fade-inout" tag="div" @enter="onEnter" @leave="onLeave" class="shortcut-wrap text-xs grid grid-cols-4 gap-20">
            <MenuCard class="shortcut" v-for="(shortcut, i) in shortcutList" :key="i" :data-index="i" :name="shortcut.title" v-show="visible" />
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { MenuCard, SearchBar } from '@/components';
import useStore from '@/store/modules/useStore';
import useTop from './useTop';

const store = useStore();
const visible = ref(true);

const engineClick = ref(false);
const activeEngine = ref(0);

const { top, resize } = useTop(store.stylesOption.navigation?.styles?.custom?.top || '0', visible, 90);


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
    { title: '+', add: true },
];
/**选择搜索引擎及清空搜索内容时锁定聚焦状态 */
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
    const transitiondelay = `${(7 - index) * 0.03}s`;
    el.style.transitionDelay = transitiondelay;
};
/** 选择默认引擎 */
const onSelectEngine = (i: number, engine: typeof engineList[number]) => {
    if (!engine.add) {
        activeEngine.value = i;
    }
    lockEngine()
}
onMounted(() => {

});
</script>

<style scoped>
.navigation {
    transition: 0.3s top linear;
    top: v-bind(top);
}

.shortcut-wrap,
.engine-wrap {
    position: absolute;
    width: var(--searchbar-width);
    top: calc(var(--searchbar-height) + 20px);
    left: calc(50% - var(--searchbar-width) / 2);
}

.engine.active {
    background-color: var(--engine-custom-background);
    color: var(--engine-custom-color);
}
</style>

<template>
    <div class="navigation w-full absolute" ref="navigationRef" :class="{ animate: resize && offset !== '0px' }">
        <!-- logo -->
        <Logo />
        <!-- 搜索框 -->
        <SearchBar @focus="onfocus" @blur="onblur" @clear="lockEngine" ref="searchRef" />

        <!-- 搜索引擎 -->
        <TransitionGroup name="fade-inout" tag="div" @enter="onEnter" @leave="onLeave" @before-enter="onBeforeEnter" @after-enter="onAfterEnter" class="engine-wrap flex-row gap-10" :class="hideEngine ? 'invisible' : 'visible'">
            <MenuCard class="engine" :class="{ active: activeEngine === i }" v-for="(engine, i) in engineList" :key="i" v-show="!visible" :data-index="i" data-type="engine" small @click="onSelectEngine(i, engine)">
                <span v-if="engine.title">{{ engine.title }}</span>
                <div v-else class="i-mingcute:add-fill"></div>
            </MenuCard>
        </TransitionGroup>

        <!-- 快捷导航 -->
        <TransitionGroup name="fade-inout" tag="div" @enter="onEnter" @leave="onLeave" @before-enter="onBeforeEnter" @after-enter="onAfterEnter" class="shortcut-wrap grid grid-cols-4 gap-20">
            <MenuCard class="shortcut" v-for="(shortcut, i) in shortcutList" :key="i" :data-index="i" :name="shortcut.title" v-show="visible" />
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { SearchBar, Logo } from '@/container';
import { MenuCard } from '@/components';
import useStore from '@/store/modules/useStore';
import useResize from './useResize';

const dely = 0.025;
const store = useStore();
const visible = ref(false);
const engineClick = ref(false);
const activeEngine = ref(0);
const navigationRef = ref<HTMLDivElement>();
const searchRef = ref<InstanceType<typeof SearchBar>>();
const engine = computed(() => store.engine);
const shortcutList = computed(() => store.shortcutList);
const engineList = computed(() => [...store.engineList, { title: '', url: '', id: '' }]);
const offset = ref('0px');
const hideEngine = ref(true);
const { resize } = useResize();

/** 选择搜索引擎及清空搜索内容时锁定聚焦状态 */
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
    }, 100);
};
/** 动画逻辑 */
const getDataSet = (el: HTMLDivElement) => {
    const type = el.dataset.type || '';
    return {
        el,
        index: parseInt(el.dataset.index || '0'),
        type,
        totle: type == 'engine' ? engineList.value.length : shortcutList.value.length,
        otherTotle: type !== 'engine' ? engineList.value.length : shortcutList.value.length
    }
};
const onBeforeEnter = (e: Element) => {
    const el = e as HTMLDivElement;
    /* 执行动画前设置为absolute防止增加/移除元素的抖动 */
    if (el.parentElement && el.parentElement.style.position !== 'absolute') el.parentElement.style.position = 'absolute';
};
const onAfterEnter = (e: Element) => {
    const { index, totle, el, type, otherTotle } = getDataSet(e as HTMLDivElement);

    if (index === totle - 1 && el.parentElement) {
        el.parentElement.style.position = 'relative';
    }

};
const onEnter = (e: Element) => {
    const { index, otherTotle, el, type } = getDataSet(e as HTMLDivElement);
    // 等待另一组动画执行完(速度过慢减少4个)
    const transitiondelay = `${index * dely + ((otherTotle - 4) * dely) + 0.3}s`;
    el.style.transitionDelay = transitiondelay;
};
const onLeave = (e: Element) => {
    const { index, totle, el } = getDataSet(e as HTMLDivElement);
    const transitiondelay = `${(totle - index) * dely}s`;
    el.style.transitionDelay = transitiondelay;
    if (el.parentElement && el.parentElement.style.position !== 'absolute') el.parentElement.style.position = 'absolute';
};

/** 选择默认引擎 */
const onSelectEngine = (i: number, engine: typeof engineList.value[number]) => {
    if (engine.title) {
        activeEngine.value = i;
        store.UPDATE_ENGINE(engineList.value[i].id);
        if (searchRef.value) {
            searchRef.value.focus();
        }
    }
    lockEngine();
};
onMounted(() => {
    if (navigationRef.value) {
        offset.value = `${navigationRef.value.clientHeight + 10}px`;
        visible.value = true;
        setTimeout(() => {
            hideEngine.value = false;
        }, 300);
    }
    activeEngine.value = engine.value ? engineList.value.findIndex(e => e.id === engine.value) : 0;
});
</script>

<style scoped>
.navigation {
    transition: 0.3s all linear;
    transition-delay: .2s;

    &.animate {
        top: calc(100% - v-bind(offset));
    }
}

.shortcut-wrap,
.engine-wrap {
    position: relative;
    width: var(--searchbar-width);
    left: calc(50% - var(--searchbar-width) / 2);
    font-size: 24px;
    top: 100%;
}

.engine.active {
    background-color: var(--engine-custom-background);
    color: var(--engine-custom-color);
}
</style>
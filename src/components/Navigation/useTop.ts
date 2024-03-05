import { computed, ref, onMounted, Ref } from 'vue';

const useTop = (customTop: string, visible: Ref<boolean>, offsetHight = 70) => {
    const resize = ref(false);
    let innerHeight = window.innerHeight;
    // 历史top
    const lastTop = ref(`${parseInt(customTop) / 100 * innerHeight}px`);
    /**
     * 实际top
     * 聚焦时移动搜索框到底部
     * 点击选择引擎触发失焦且收起键盘时,控制保持位置不变
     * 其它情况按配置展示
     */
    const top = computed(() => {
        let res = `${parseInt(customTop) / 100 * innerHeight}px`;
        if (resize.value && !visible.value) res = `${window.innerHeight - offsetHight}px`;
        if (!resize.value && !visible.value) res = lastTop.value;
        return res;
    });
    onMounted(() => {
        innerHeight = window.innerHeight;
        window.addEventListener('resize', () => {
            lastTop.value = top.value;
            resize.value = innerHeight != window.innerHeight;
        });
    });
    return {
        top,
        resize
    };
};

export default useTop;
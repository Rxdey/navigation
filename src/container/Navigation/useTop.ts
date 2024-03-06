import { computed, ref, onMounted, Ref } from 'vue';

/**
 * 动态计算top距离
 * 输入法触发resize时，防止搜索框乱动
 * @param customTop 
 * @param visible 
 * @param offset 
 * @returns 
 */
const useTop = (customTop: string, visible: Ref<boolean>, offset: Ref<number>) => {
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
        if (resize.value && !visible.value) return `${window.innerHeight - (offset.value + 10)}px`;
        if (!resize.value && !visible.value) return lastTop.value;
        return `${(parseInt(customTop) / 100 * innerHeight)}px`;
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
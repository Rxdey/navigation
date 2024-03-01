import { ref, onMounted, computed, watch, Ref } from 'vue';

/**
 * vantlist请求hook
 * @returns 
 */
export default function useVanList<T>() {
    const pageNo = ref(1);
    const pageSize = ref(10);
    const loading = ref(false);
    const finished = ref(false);
    const error = ref(false);
    /**　数据列表 */
    const listData = ref<T[]>([]) as Ref<T[]>;

    const getListData = async (fnc: () => Promise<T[]>) => {
        const res = await fnc();
        loading.value = false;
        finished.value = res.length < pageSize.value;
        listData.value.push(...res);
        pageNo.value += 1;
    };
    return {
        pageNo,
        pageSize,
        loading,
        finished,
        error,
        listData,
        getListData
    }
}
import { ResponseType } from '@/server/responseTypes';
// import { showToast, showLoadingToast, closeToast } from 'vant';
import { ref, onMounted, computed } from 'vue';

type RequestConfig = {
    loading?: boolean;
    qs?: boolean,
    toast?: boolean,
    msg?: string,
}
const defaultConfig: RequestConfig = {
    loading: false,
    msg: '正在加载...',
    qs: false,
    toast: true
}

/**
 * 加载数据
 * @returns 
 */
export default function useFetch() {
    const loading = ref(false);
    /**
     * 请求封装
     * @param request 接口请求方法 定义详: src/server/model
     * @param params 请求参数
     * @param {RequestConfig|boolean} conf 附加参数,为boolean表示loading的简写
     * @returns {Promise<ResponseType<P>>} 返回结果
     */
    const fetchData = async <T, P>(
        request: (e: T) => Promise<ResponseType<P>>,
        params: T,
        conf: RequestConfig | boolean = defaultConfig,
    ) => {
        loading.value = true;
        if (typeof conf === 'boolean') conf = { ...defaultConfig, loading: conf };
        // if (conf.loading) {
        //     showLoadingToast({
        //         message: '正在加载...',
        //         forbidClick: true
        //     });
        // }
        const res = await request(params);
        loading.value = false;
        // closeToast();
        const { msg, data, success } = res;
        if (!success) {
            // if (conf.toast) showToast(message);
            return false;
        }
        return res;
    };
    return {
        fetchData,
        loading,
    };
};
import { defineStore } from 'pinia';
import type { StylesOption } from '../types';
import { DEFAULT_OPTIONS } from '../define';
import { options2CSSVar } from '@/store/tool';


const useStore = defineStore('main', {
    state: () => ({
        loading: false,
        /** 全局设置 */
        global: {},
        /** 模块基础样式配置 */
        stylesOption: DEFAULT_OPTIONS,
        /** 快捷方式列表 */
        shortcuts: []
    }),
    actions: {

    },
    getters: {
        // 仅打印分组展示配置方便开发时查看
        cssOptionsArray(state) {
            const res: any = {};
            Object.keys(state.stylesOption).forEach(n => {
                const o = state.stylesOption[n as keyof StylesOption];
                if (!o) return;
                res[n as any] = options2CSSVar(o, n).split(';').filter(e => e);
            });
            return res;
        },
        cssOptions(state) {
            return options2CSSVar(state.stylesOption);
        }
    }
});

export default useStore;
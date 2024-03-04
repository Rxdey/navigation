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
        styles(state) {
            return options2CSSVar(state.stylesOption);
        }
    }
});

export default useStore;
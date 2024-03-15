import { defineStore } from 'pinia';
import type { StylesOption, Shortcut, Keys, Options, Styles } from '../types';
import { DEFAULT_OPTIONS, DEFAULT_SHORTCUT_LIST, DEFAULT_ENGINE_LIST } from '../define';
import { options2CSSVar } from '@/store/tool';
import localforage from 'localforage';


type State = {
    stylesOption: StylesOption;
    shortcutList: Shortcut[],
    engineList: Shortcut[],
    engine: string,
};

const useStore = defineStore('main', {
    state: (): State => ({
        /** 模块基础样式配置 */
        stylesOption: JSON.parse(JSON.stringify(DEFAULT_OPTIONS)),
        /** 快捷方式列表 */
        shortcutList: JSON.parse(JSON.stringify(DEFAULT_SHORTCUT_LIST)),
        engineList: JSON.parse(JSON.stringify(DEFAULT_ENGINE_LIST)),
        engine: '1'
    }),
    actions: {
        /** 更新样式 */
        UPDATE_STYLES(keyArray: string[], value: string | number | boolean | null | Blob) {
            let current: any = this.stylesOption;
            keyArray.forEach((key, index) => {
                if (index === keyArray.length - 1) {
                    current[key] = value;
                } else {
                    if (!current[key]) current[key] = {};
                    current = current[key];
                }
            });
        },
        /** 选择默认引擎 */
        UPDATE_ENGINE(engine: string) {
            this.engine = engine;
        },
        /** 新增导航 */
        ADD_SHORTCUT(data: Shortcut) {
            this.shortcutList.push(data);
        },
        /** 删除导航 */
        DELETE_SHORTCUT_BY_ID(id: string) {
            // this.shortcutList = this.shortcutList.filter(e => e.id !== id);
            const index = this.shortcutList.findIndex(e => e.id === id);
            if (index < 0) return;
            this.shortcutList.splice(index, 1);
        },
        RESET_STORE() {
            localforage.clear();
            this.stylesOption = JSON.parse(JSON.stringify(DEFAULT_OPTIONS));
            this.shortcutList = JSON.parse(JSON.stringify(DEFAULT_SHORTCUT_LIST));
            this.engineList = JSON.parse(JSON.stringify(DEFAULT_ENGINE_LIST));
            this.engine = '1';
        }
    },
    getters: {
        styles(state) {
            return options2CSSVar(state.stylesOption);
        },
        defaultEngine(state) {
            return state.engineList.find(e => e.id === state.engine) || state.engineList[0];
        }
    }
});

export default useStore;
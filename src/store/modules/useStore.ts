import { defineStore } from 'pinia';
import type { StylesOption, Shortcut, Engine } from '../types';
import { DEFAULT_OPTIONS } from '../define';
import { options2CSSVar } from '@/store/tool';


type State = {
    loading: boolean;
    global: any;
    stylesOption: StylesOption;
    shortcutList: Shortcut[],
    engineList: Engine[],
};

const useStore = defineStore('main', {
    state: (): State => ({
        loading: false,
        /** 全局设置 */
        global: {},
        /** 模块基础样式配置 */
        stylesOption: DEFAULT_OPTIONS,
        /** 快捷方式列表 */
        shortcutList: [
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
        ],
        engineList: [
            { title: '必应', url: '' },
            { title: '谷歌', url: '' },
            { title: '百度', url: '' },
            { title: 'Yindex', url: '' },
            { title: '搜狗', url: '' },
            { title: '360', url: '' },
        ]
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
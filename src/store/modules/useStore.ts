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
    engine: string,
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
            { title: '必应', url: 'https://www.bing.com/search?q=%s', id: '1' },
            { title: '必应CN', url: 'https://cn.bing.com/search?q=%s', id: '2' },
            { title: '谷歌', url: 'https://www.google.com/search?q=%s', id: '3' },
            { title: '百度', url: 'https://m.baidu.com/s?word=%s', id: '4' },
            { title: 'Yindex', url: 'https://yandex.com/search/?text=%s', id: '5' },
            { title: '搜狗', url: 'https://www.sogou.com/sogou?query=%s', id: '6' },
        ],
        engine: '1'
    }),
    actions: {
        UPDATE_ENGINE(engine: string) {
            this.engine = engine;
        }
    },
    getters: {
        styles(state) {
            return options2CSSVar(state.stylesOption);
        },
        defaultEngine (state) {
            return state.engineList.find(e => e.id === state.engine) || state.engineList[0];
        }
    }
});

export default useStore;
import { defineStore } from 'pinia';
import type { StylesOption, Shortcut, Engine, Keys, Options, Styles } from '../types';
import { DEFAULT_OPTIONS } from '../define';
import { options2CSSVar } from '@/store/tool';
import localforage from 'localforage';


type State = {
    global: any;
    stylesOption: StylesOption;
    shortcutList: Shortcut[],
    engineList: Engine[],
    engine: string,
};

const useStore = defineStore('main', {
    state: (): State => ({
        /** 全局设置 */
        global: {},
        /** 模块基础样式配置 */
        stylesOption: JSON.parse(JSON.stringify(DEFAULT_OPTIONS)),
        /** 快捷方式列表 */
        shortcutList: [
            { title: 'Github', url: 'https://github.com/' },
            { title: '百度贴吧', url: 'https://tieba.baidu.com/' },
            { title: '煎蛋网', url: 'https://i.jandan.net/pic' },
            { title: '千帆搜索', url: 'https://pan.qianfan.app/' },
            { title: 'Bilibili', url: 'https://m.bilibili.com/' },
            { title: '源仓库', url: 'http://www.yckceo.com/' },
            { title: 'Greasyfork', url: 'https://greasyfork.org/zh-CN' },
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
        UPDATE_ENGINE(engine: string) {
            this.engine = engine;
        },
        RESET_STORE() {
            localforage.clear();
            this.stylesOption = DEFAULT_OPTIONS;
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
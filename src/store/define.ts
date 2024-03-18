import type { StylesOption, Shortcut, GlobalType } from './types';

/** 基础样式配置 */
export const DEFAULT_OPTIONS: StylesOption = {
    /** 壁纸 */
    wallpaper: {
        options: {
            onlineUrl: './img/bg/bg.webp',
            wallpaperType: 2,
            file: null,
            // radial | color
            maskType: 'radial',
            video: false,
            muted: false,
        },
        styles: {
            background: {
                color: 'transparent',
                size: 'cover',
                repeat: 'no-repeat',
                position: 'center top',
                image: '',
            },
            custom: {
                blur: '0px',
                mask: 0.32,
            },
        },
    },
    /** 导航含搜索栏 */
    navigation: {
        styles: {
            top: '40%',
        },
    },
    /** 搜索栏 */
    searchbar: {
        options: {
            isFocus: false,
            blurOnFocus: false,
            scaleOnFocus: true,
        },
        styles: {
            width: '90%',
            height: '45px',
            borderRadius: '4px',
            backgroundColor: 'rgba(237, 237, 237, .8)',
            marginBottom: '10px',

            custom: {
                shadow: 'rgba(0,0,0,.2)',
                shadowSize: '16px',
            },
        },
    },
    /** 快捷导航 */
    shortcut: {
        options: {
            /** 排列方式 1:grid 2: flex */
            arrangement: 1,
            hide: false,
        },
        styles: {
            userSelect: 'none',
            backgroundColor: 'rgba(237, 237, 237, .9)',
            color: 'rgba(0,0,0,1)',
            custom: {
                gridCol: 4,
                gap: '10px',
            },
            fontSize: '12px'
        },
    },
    /** 搜索引擎 */
    engine: {
        styles: {
            userSelect: 'none',
            backgroundColor: 'rgba(237, 237, 237, .9)',
            color: 'rgba(0,0,0,1)',
            custom: {
                background: 'var(--color-primary)',
                color: 'white',
            },
        },
    },
    /** logo */
    logo: {
        options: {
            // image: '/img/shortcut/bilibili.png',
            // text: 'Explorer',
            // show: false,
        },
        styles: {
            color: '#fff',
            marginBottom: '16px',
        },
    },
};

export const DEFAULT_SHORTCUT_LIST: Shortcut[] = [
    { title: 'Github', url: 'https://github.com/', id: 'C1jHSf40ojn3OY1DFkDih', type: 'shortcut' },
    { title: '百度贴吧', url: 'https://tieba.baidu.com/', id: 'ic-qwlIWaTNZDEoCKLZR9', type: 'shortcut' },
    { title: '煎蛋网', url: 'https://i.jandan.net/pic', id: 'B3R2rGgXCsyV384pVGwuE', type: 'shortcut' },
    { title: '千帆搜索', url: 'https://pan.qianfan.app/', id: 'YFQxIz0PM3PowcbGM1I9x', type: 'shortcut' },
    { title: 'Bilibili', url: 'https://m.bilibili.com/', id: 'l6-cmV1r6kWMksstD6vhb', type: 'shortcut' },
    { title: '源仓库', url: 'http://www.yckceo.com/', id: '33TFsqjjgJhGlVwIeIdCQ', type: 'shortcut' },
    { title: 'Greasyfork', url: 'https://greasyfork.org/zh-CN', id: '90MNL-TaMg7BgoPccf-RY', type: 'shortcut' },
];
export const DEFAULT_ENGINE_LIST: Shortcut[] = [
    { title: '默认', url: 'https://cn.bing.com/search?q=%s', id: 'JuZRYJctZYtEJE5xw7fb5', type: 'engine' },
    { title: '必应', url: 'https://www.bing.com/search?q=%s', id: 'ci59QVBrCaw6CWwzN6JiJ', type: 'engine' },

    { title: '谷歌', url: 'https://www.google.com/search?q=%s', id: 'isLI_ZYAZEXh77SBaK2z3', type: 'engine' },
    { title: '百度', url: 'https://m.baidu.com/s?word=%s', id: 'V4MTp1YxDlIM9sUEqPjXg', type: 'engine' },
    { title: 'Yindex', url: 'https://yandex.com/search/?text=%s', id: '8f8i7CGF3yAavzTonGc7J', type: 'engine' },
    { title: '搜狗', url: 'https://www.sogou.com/sogou?query=%s', id: 'jwn39jp0ouU3FGjGB6A8C', type: 'engine' },
];

export const DEFAULT_GLOBAL: GlobalType = {
    sync: {
        server: '',
        username: '',
        password: '',
    }
};
/** 禁止操作 */
export const FIXED_ENGINE_IDS = ['JuZRYJctZYtEJE5xw7fb5'];
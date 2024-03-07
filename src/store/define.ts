import type { StylesOption } from './types';

export const DEFAULT_OPTIONS: StylesOption = {
    /** 壁纸 */
    wallpaper: {
        options: {
            videoSource: '',
            // radial | color
            maskType: 'radial'
        },
        styles: {
            filter: {
                blur: '0px',
            },
            background: {
                color: 'transparent',
                size: 'cover',
                repeat: 'no-repeat',
                position: 'left top',
                image: 'url(/img/bg/bg.jpg)',
            },
            custom: {
                blur: '',
                mask: 0.32
            }
        },
    },
    /** 导航含搜索栏 */
    navigation: {
        styles: {
            top: '30%',
        },
    },
    /** 搜索栏 */
    searchbar: {
        options: {
            blurOnFocus: true
        },
        styles: {
            width: '90%',
            height: '45px',
            borderRadius: '4px',
            backgroundColor: '#ededed',
            marginBottom: '10px',
            custom: {
                shadow: 'rgba(0,0,0,.2)',
                shadowSize: '16px'
            }
        }
    },
    /** 快捷导航 */
    shortcut: {
        styles: {
            userSelect: 'none',
        }
    },
    /** 搜索引擎 */
    engine: {
        styles: {
            userSelect: 'none',
            custom: {
                background: 'var(--color-primary)',
                color: 'white'
            }
        }
    },
    /** logo */
    logo: {
        options: {
            image: '/img/shortcut/bilibili.png',
            text: 'Explorer',
            show: false,
        },
        styles: {
            color: '#fff',
            marginBottom: '16px'
        }
    }
};
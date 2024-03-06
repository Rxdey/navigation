import type { StylesOption } from './types';

export const DEFAULT_OPTIONS: StylesOption = {
    /** 壁纸 */
    wallpaper: {
        options: {
            videoSource: ''
        },
        styles: {
            filter: {
                blur: '0px'
            },
            mask: {
                alpha: 0.30
            },
            background: {
                color: '#000',
                size: 'cover',
                repeat: 'no-repeat',
                position: 'left top',
                image: 'url(/img/bg/bg.jpg)',
            }

        },
    },
    /** 导航含搜索栏 */
    navigation: {
        styles: {
            custom: {
                top: '30%',
            }
        },
    },
    /** 搜索栏 */
    searchbar: {
        styles: {
            width: '90%',
            height: '40px',
            borderRadius: '4px',
            backgroundColor: '#ededed',
            marginBottom: '10px',
        }
    },
    /** 快捷导航 */
    shortcut: {
        styles: {

        }
    },
    /** 搜索引擎 */
    engine: {
        styles: {
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
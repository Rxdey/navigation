import type { StylesOption } from './types';

export const DEFAULT_OPTIONS: StylesOption = {
    /** 壁纸 */
    wallpaper: {
        options: {
            imageUrl: '',
            imageType: 2,
            imageFile: null,
            videoSource: '',
            // radial | color
            maskType: 'radial',
        },
        styles: {
            background: {
                color: 'transparent',
                size: 'cover',
                repeat: 'no-repeat',
                position: 'center top',
                image: ''
            },
            custom: {
                blur: '0px',
                mask: 0.32,
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
            isFocus: false,
            blurOnFocus: true,
            scaleOnFocus: true
        },
        styles: {
            width: '90%',
            height: '45px',
            borderRadius: '4px',
            backgroundColor: 'rgba(237, 237, 237, .8)',
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
            backgroundColor: 'rgba(237, 237, 237, .9)',
        }
    },
    /** 搜索引擎 */
    engine: {
        styles: {
            userSelect: 'none',
            backgroundColor: 'rgba(237, 237, 237, .9)',
            custom: {
                background: 'var(--color-primary)',
                color: 'white'
            }
        }
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
            marginBottom: '16px'
        }
    }
};
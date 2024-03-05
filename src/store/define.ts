import type { StylesOption } from './types';

export const DEFAULT_OPTIONS: StylesOption = {
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
    navigation: {
        styles: {
            custom: {
                top: '30%',
            }
        },
    },
    searchbar: {
        styles: {
            width: '90%',
            height: '40px',
            borderRadius: '4px',
            backgroundColor: '#ededed'
        }
    },
    shortcut: {
        styles: {

        }
    },
    engine: {
        styles: {
            custom: {
                background: 'var(--color-primary)',
                color: 'white'
            }
        }
    },
};
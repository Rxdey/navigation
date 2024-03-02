import type { StylesOption } from './types';

export const DEFAULT_OPTIONS: StylesOption = {
    wallpaper: {
        background: {
            conf: {
                videoSource: ''
            },
            color: '#000',
            size: 'cover',
            repeat: 'no-repeat',
            position: 'center',
            image: 'url(/img/bg/bg.jpg)',
            blur: '0px',
            mask: {
                alpha: 0.30
            }
        }
    },
    navigation: {
        rect: {
            top: '30%',
        }
    },
    searchbar: {
        rect: {
            width: '90%',
            round: '100px',
            marginBottom: '18px'
        }
    },
    shortcut: {
        rect: {
            width: '90%',
        }
    },
};
import { defineStore } from 'pinia';
import type { StylesOption } from '../types';
import { options2CSSVar } from '@/store/tool';

const defaultOptions: StylesOption = {
    wallpaper: {
        background: {
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
    searchbar: {
        rect: {
            width: '90%',
            round: '90px',
            top: '30%',
        }
    }
};

const useStore = defineStore('main', {
    state: () => ({
        loading: false,
        stylesOption: defaultOptions
    }),
    actions: {

    },
    getters: {
        // 仅打印分组展示配置方便开发时查看
        cssOptionsArray(state) {
            const res: any = {};
            Object.keys(state.stylesOption).forEach(n => {
                res[n as any] = options2CSSVar(state.stylesOption[n as keyof StylesOption], n).split(';').filter(e => e);
            });
            return res;
        },
        cssOptions(state) {
            return options2CSSVar(state.stylesOption);
        }
    }
});

export default useStore;
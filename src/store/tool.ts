import type { StylesOption } from '@/store/types';

/**
 * 配置转cssVar并动态创建部分style
 * @param options 
 * @param name 
 * @returns 
 */
function camelToKebab(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const flatCss = (styles: any, name: string) => {
    return Object.keys(styles).reduce((p, n) => {
        let res = '';
        const target = styles[n];
        if (Object.prototype.toString.call(target) === '[object Object]') {
            res = flatCss(target, name ? `${name}-${n}` : n);
        } else {
            res = `--${name}-${n}: ${target};`;
        }
        p += res;
        return p;
    }, '');
};
const flatStyles = (styles: any, name: string) => {
    const result = { cssVar: '', styles: `.${name}{` };
    Object.keys(styles).forEach(e => {
        const target = styles[e];
        if (Object.prototype.toString.call(target) === '[object Object]') {
            Object.keys(target).forEach(f => {
                const key = name ? `--${name}-${e}-${f}` : `--${e}-${f}`;
                result.cssVar += `${key}: ${target[f]};`;
                // 特殊处理
                if (['custom'].includes(e)) return;
                // if (['filter'].includes(e)) {
                //     result.styles += `filter:${f}(var(${key}));`;
                //     return;
                // }
                result.styles += `${e}-${f}:var(${key});`;
            });
        } else {
            const key = `--${name}-${e}`;
            result.styles += `${camelToKebab(e)}:var(${key});`;
            result.cssVar += `${key}: ${target};`
        }
    });
    result.styles += '}';
    return result;
};

export const options2CSSVar = (options: any) => {
    const list = Object.keys(options).reduce((p, n) => {
        const styles = options[n].styles;
        // const option = options[n].options;
        if (styles) {
            p.cssVar += flatStyles(styles, n).cssVar;
            p.styles += flatStyles(styles, n).styles;
        }
        return p;
    }, { cssVar: '', styles: '' });
    return list;
}

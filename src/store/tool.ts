import type { StylesOption } from '@/store/types';

/**
 * 配置转cssVar
 * @param options 
 * @param name 
 * @returns 
 */
export const options2CSSVar = (options: Record<string, any>, name = '') => {
    if (!options) return '';
    return Object.keys(options).reduce((p, n) => {
        let res = '';
        const target = options[n];
        if (!target) return p;
        if (Object.prototype.toString.call(target) === '[object Object]') {
            res = options2CSSVar(target, name ? `${name}-${n}` : n);
        } else {
            res = `--${name}-${n}: ${options[n]};`;
        }
        return p += res;
    }, '');
}

import { defineConfig, presetAttributify, presetUno, presetIcons, transformerVariantGroup } from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
// import { presetUseful } from 'unocss-preset-useful';

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify({
            prefix: 'un-',
            prefixedOnly: true
        }),
        presetIcons({
            scale: 1.2,
        }),
        presetRemToPx({
            //基准字体大小  官方的默认预设16（1单位 = 0.25rem）所以这里为4 为1：1
            baseFontSize: 4,
        }),
        // presetUseful(),
    ],
    transformers: [
        transformerVariantGroup(),
    ],
    shortcuts: [
        {
            'flex-center': 'flex justify-center items-center',
            'flex-col': 'flex flex-col',
            'flex-row': 'flex flex-row',
            'wh-full': 'w-full h-full',
            'cover-image': 'w-full h-full object-cover',
            'contain-image': 'w-full h-full object-contain',
            'slider-button': 'wh-40 bg-white border-5 border-solid border-primary rounded-full'
        },
    ],
    rules: [
        [/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}` })],
        [/^t-a-(\d+)$/, ([, d]) => ({ transition: `all 0.${d}s linear` })],
        [/^bg-white-(\d+)$/, ([, d]) => ({ "background-color": `rgb(255 255 255 / ${d}%)` })],
        [/^bg-black-(\d+)$/, ([, d]) => ({ "background-color": `rgb(0 0 0 / ${d}%)` })],
        [/^l-s-(\d+)$/, ([, d]) => ({ "letter-spacing": `${d}px` })],
        [/^wh-(\d+)$/, ([, d]) => ({ 'width': `${d}px`, 'height': `${d}px`, })],
        [/^pixel-(\d+)$/, ([, d]) => ({ 'background-color': 'rgb(221, 221, 221)', 'background-image': 'linear-gradient(45deg, rgb(255, 255, 255) 25%, transparent 0px, transparent 75%, rgb(255, 255, 255) 0px), linear-gradient(45deg, rgb(255, 255, 255) 25%, transparent 0px, transparent 75%, rgb(255, 255, 255) 0px)', 'background-position': `0px 0px, ${parseInt(d) / 2}px ${parseInt(d) / 2}px`, 'background-size': `${d}px ${d}px` })],
        [/^transition-(\d+)$/, ([, d]) => ({ 'transition': `all ${parseInt(d) / 100}s`, })],
    ],
    theme: {
        colors: {
            'primary': 'var(--color-primary)',
            'success': 'var(--color-success)',
            'info': 'var(--color-info)',
            'warning': 'var(--color-warning)',
            'danger': 'var(--color-danger)',
            'board': '#f5f5f5',
            'active': 'rgb(242,243,245)'
        },
        fontSize: {
            xs: '24px',
            sm: '28px',
            base: '28px',
            lg: '36px',
            xl: '40px',
        },
        animation: {
            keyframes: {
                scale: '{0% {transform: scale(1)} 100% {transform: scale(1.2)}}',
            },
            durations: {
                scale: '1s',
            },
            timingFns: {
                scale: 'ease-in',
            },
            properties: {
                // transform-origin and backface-visibility here
            },
            counts: {
                scale: 'infinite',
            },
        }
    },
    // content: {
    //     pipeline: {
    //         include: [/.*\/anu-vue\.js(.*)?$/, './**/*.vue', './**/*.md']
    //     }
    // }
});
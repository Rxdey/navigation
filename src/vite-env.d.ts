/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

// declare module '*.vue' {
//     import { ComponentOptions } from 'vue'
//     const componentOptions: ComponentOptions
//     export default componentOptions
// }

declare module 'md5';
declare module 'colorpicker-v3';

interface Window {
    [key: string]: any;
}
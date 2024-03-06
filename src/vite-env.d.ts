/// <reference types="vite/client" />

// declare module '*.vue' {
//     import { ComponentOptions } from 'vue'
//     const componentOptions: ComponentOptions
//     export default componentOptions
// }

declare module 'md5';

interface Window {
    [key: string]: any;
}
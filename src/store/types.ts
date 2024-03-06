type Background = {
    /** 背景颜色 */
    color?: string;
    /** background-size属性 */
    size?: 'cover' | 'contain';
    /** background-repeat属性 */
    repeat?: 'no-repeat' | 'repeat';
    /** background-position属性 */
    position?: string;
    /** background-image属性 */
    image?: string;
};
/** 基础样式 */
type Styles = {
    width?: string;
    height?: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    marginTop?: string;
    marginLeft?: string;
    marginRight?: string;
    marginBottom?: string;
    paddingTop?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingBottom?: string;
    fontSize?: string;
    color?: string;
    borderRadius?: string;
    background?: Background;
    filter?: {
        blur?: string;
    },
    /** 遮罩 */
    mask?: {
        alpha?: number;
    },
    /** 仅渲染csscar */
    custom?: {
        [key: string]: any
    },
    [key: string]: string | Record<string, string | number> | undefined
};
/** 设置项 */
type Options = {
    // videoSource?: string;
    [key: string]: any;
};


/** 所有模块 */
export type Keys = 'wallpaper' | 'searchbar' | 'navigation' | 'shortcut' | 'engine' | 'logo';

/**
 * 配置项
 * 解析为cssVar --[key]-[name]: [value];
 */
export type StylesOption = {
    [key in Keys]?: {
        options?: Options;
        styles?: Styles;
    }
};

/** 全局设定 */
export type GlobalOptions = {
    /** 自定义css */
    style?: string;
};


/** 快捷导航 */
export type Shortcut = {
    title: string;
    url: string;
    icon?: string;
    color?: string;
    background?: string;
    sort?: number;
};
/** 搜索引擎 */
export type Engine = {
    title: string;
    url: string;
    icon?: string;
    color?: string;
    background?: string;
    sort?: number;
};
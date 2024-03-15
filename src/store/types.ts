export type Background = {
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
export type Styles = {
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
    // filter?: {
    //     blur?: string;
    // },
    /** 仅渲染csscar */
    custom?: {
        [key: string]: any
    },
    [key: string]: any
};
/** 设置项暂时any占位 */
export type Options = {
    /** 壁纸类型 1:本地 2:在线壁纸, 3:网页地址 4: 在线视频 */
    wallpaperType?: 1 | 2 | 3 | 4;
    /** 是否视频 */
    video?: boolean;
    /** 在线地址 */
    onlineUrl?: string;
    /** 本地图片文件 */
    file?: Blob | null;
    /** 遮罩类型 */
    maskType?: 'radial' | 'color';

    /** 聚焦模糊 */
    blurOnFocus?: boolean;
    [key: string]: any;
};


/** 所有模块 */
export type Keys = 'wallpaper' | 'searchbar' | 'navigation' | 'shortcut' | 'engine' | 'logo';

export type DefineOpt = {
    options?: Options;
    styles?: Styles;
};
/**
 * 配置项
 * 解析为cssVar --[key]-[name]: [value];
 */
export type StylesOption = {
    [key in Keys]: DefineOpt
};

/** 全局设定 */
export type GlobalOptions = {
    /** 自定义css */
    style?: string;
};


/** 快捷导航 */
export type Shortcut = {
    id: string;
    title: string;
    url: string;
    icon?: string;
    /** 文本颜色 */
    color?: string;
    /** 背景颜色 */
    background?: string;
    sort?: number;
};
/** 搜索引擎 */
// export type Engine = { id: string } & Shortcut;
export type GlobalOptions = {
    /** 自定义css */
    style?: string;
};

/** 矩形属性 */
export type RectProtoType = {
    width?: string;
    height?: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    /** 圆角 */
    round?: string;
    marginTop?: string;
    marginLeft?: string;
    marginRight?: string;
    marginBottom?: string;
    paddingTop?: string;
    paddingLeft?: string;
    paddingRight?: string;
    paddingBottom?: string;
};

/** 文字属性 */
export type TextProtoType = {
    size?: string;
    color?: string;
};

/** background属性 */
export type BackgroundProtoType = {
    /** 设置项可选(不转换) */
    conf?: {
        videoSource?: string;
    };
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
    /** 模糊 */
    blur?: string;
    /** 遮罩 */
    mask?: {
        alpha?: number;
    }
};

/** 所有模块 */
export type Keys = 'wallpaper' | 'searchbar' | 'navigation' | 'shortcut';
/** 基础模块 */
export type DefineRect = {
    rect?: RectProtoType;
    background?: BackgroundProtoType;
    text?: TextProtoType;
};
/**
 * 配置项
 * {[key]: {[name]: [value]}}
 * 解析为cssVar --[key]-[name]: [value];
 * 最多嵌套两层object
 */
export type StylesOption = {
    [key in Keys]?: DefineRect;
}

/** 快捷导航 */
export type Shortcut = {
    label: string;
    url: string;
    icon?: string;
    color?: string;
    background: string;
    sort: number;
};
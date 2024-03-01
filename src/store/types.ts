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
};

/** 文字属性 */
export type TextProtoType = {
    size?: string;
    color?: string;
};

/** background属性 */
export type BackgroundProtoType = {
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

export type DefineRect = {
    rect?: RectProtoType,
    background?: BackgroundProtoType,
    text?: TextProtoType
};


export type Keys = 'wallpaper' | 'searchbar';
/**
 * 配置项
 * {[key]: {[name]: [value]}}
 * 解析为cssVar --[key]-[name]: [value];
 * 最多嵌套两层object
 */
export type StylesOption = {
    [key in Keys]: DefineRect;
}
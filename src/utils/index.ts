/** 复制指定文本 */
export const copyToClipboard = (txt = '', cb = () => { }) => {
    const node: HTMLTextAreaElement = document.createElement('textarea');
    node.value = txt;
    document.body.appendChild(node);
    node.select();
    document.execCommand('Copy');
    document.body.removeChild(node);
    cb();
};
/** 下载文件 */
export const downLoadFile = (href = '', fileName = '') => {
    if (!href) return;
    const a = document.createElement('a');
    a.href = href;
    a.download = fileName;
    a.click();
};

/** 多层级合并对象 */
export const mergeObjects = (obj1: Record<string, any>, obj2: Record<string, any>) => {
    const merged = { ...obj2 };
    for (let key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (Object.prototype.toString.call(obj1[key]) === '[object Object]' && Object.prototype.toString.call(obj2[key])) {
            // if (typeof obj1[key] === 'object' && !Array.isArray(obj1[key]) && typeof obj2[key] === 'object' && !Array.isArray(obj2[key])) {
                merged[key] = mergeObjects(obj1[key], obj2[key]);
            } else {
                merged[key] = obj1[key];
            }
        }
    }
    return merged;
};

// 获取链接参数
export const getSearchCode = (name: string) => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substring(1).match(reg);
    return r ? decodeURIComponent(r[2]) : null;
};
/** 随机数 */
export const randomId = (n = 5) => {
    return (~~(Math.random() * (1 << 30))).toString(36);
};
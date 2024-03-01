// 微信浏览器
export const isWechat = () => /MicroMessenger/i.test(window.navigator.userAgent.toLowerCase());
// 企业微信
export const isWxwork = () => {
    const ua: any = window.navigator.userAgent.toLowerCase();
    return (ua.match(/MicroMessenger/i) == 'micromessenger') && (ua.match(/wxwork/i) == 'wxwork');
};
// pc
export const IsPC = () => {
    const Agents = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod',
    ];
    return !Agents.some(item => {
        return navigator.userAgent.includes(item);
    });
};
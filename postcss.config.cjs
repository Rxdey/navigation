module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-nesting': {},
        'postcss-mobile-forever': {
            viewportWidth: file => file.includes("vant") ? 375 : 750,
            maxDisplayWidth: 520,
            appSelector: "#app",
            propList: ['*'],
            disableLandscape: true, // 关闭横屏媒体查询
            disableDesktop: true, // 关闭桌面端媒体查询
            selectorBlackList: ['.ignore'],
            propertyBlackList: ['line-height'],
        }
    },
};
import { Directive, DirectiveBinding } from 'vue';
// import { showImagePreview } from 'vant'

/** 
 * modifiers.children为true: value代表选择器
 * modifiers.children为false: value代表图片和图片列表
 */
type PreviewParams = string[] | string;

/**
 * 使用：
 * `app.directive('preview', VPreview);`
 * 
 * ```html
 * // 单张预览:
 * <img src="url" v-preview />
 * 
 * // 指定预览列表:
 * <div v-preview="['url']"></div>
 * 
 * // 预览节点下的所有图片
 * // 所有img标签
 * <div v-preview.children>
 *   <img src="url" >
 *   <img src="url" >
 * </div>
 * // 指定选择器(代码会加标签名 组合成 img.img-name)
 * <div v-preview.children="'.img-name'">
 *   <img class="img-name" src="url" >
 *   <img src="url" >
 * </div>
 * ```
 */
const VPreview: Directive = {
    // 绑定元素的父组件及他自己的所有子节点都挂载完成后调用
    mounted(el: HTMLElement, binding: DirectiveBinding<PreviewParams>) {
        const { value, modifiers } = binding;
        // children模式：遍历子元素的img
        if (modifiers.children) {
            el.addEventListener('click', (e: MouseEvent) => {
                if (!e.target || (e.target as HTMLElement).nodeName !== 'IMG') return;
                const key = value ? `img${value}` : 'img';
                const imgEls = el.querySelectorAll(key);
                const images = Array.from(imgEls).map((item: any) => item.dataset.src || item.src)
                // showImagePreview({
                //     images
                // });
            })
        } else {
            el.addEventListener('click', () => {
                let images = [];
                if (value) {
                    images = Array.isArray(value) ? value : [value]
                } else {
                    if (el.nodeName !== 'IMG') return;
                    images = [el.dataset.src || (el as HTMLImageElement).src]
                }
                // showImagePreview({
                //     images
                // });
            })
        }

    },
    // 绑定元素的父组件卸载前调用
    beforeUnmount(el, binding, vnode, prevVnode) {
        console.log('beforeUnmount')
    },
}
export default VPreview
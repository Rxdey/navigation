import { computed, ref, onMounted, Ref, watch } from 'vue';

/**
 * @returns 
 */
const useResize = () => {
    const resize = ref(false);
    const innerHeight = window.innerHeight;
    const windowHeight = ref(window.innerHeight);
    onMounted(() => {
        window.addEventListener('resize', () => {
            resize.value = innerHeight - window.innerHeight > 100;
            windowHeight.value = window.innerHeight;
        });
    });
    return {
        resize,
        windowHeight
    }
}

export default useResize;
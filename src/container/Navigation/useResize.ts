import { computed, ref, onMounted, Ref, watch } from 'vue';

/**
 * @returns 
 */
const useResize = () => {
    const resize = ref(false);
    const innerHeight = window.innerHeight;
    onMounted(() => {
        window.addEventListener('resize', () => {
            resize.value = innerHeight - window.innerHeight > 100;
        });
    });
    return {
        resize
    }
}

export default useResize;
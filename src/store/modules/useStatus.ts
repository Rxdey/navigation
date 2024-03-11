import { defineStore } from 'pinia';


type State = {
    focus: boolean;
};
/**
 * 不需要保存的全局状态
 */
const useStatus = defineStore('status', {
    state: (): State => ({
        focus: false,
    }),
    actions: {
        UPDATE_FOCUS(val: boolean) {
            this.focus = val;
        }
    },
    getters: {

    }
});

export default useStatus;
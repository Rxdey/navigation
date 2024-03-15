import { defineStore } from 'pinia';
import { Shortcut } from '../types';


type State = {
    focus: boolean;
    showAddMenu: boolean;
    editData?: Shortcut | null;
};
/**
 * 不需要保存的全局状态
 */
const useStatus = defineStore('status', {
    state: (): State => ({
        focus: false,
        showAddMenu: false,
        editData: null
    }),
    actions: {
        UPDATE_FOCUS(val: boolean) {
            this.focus = val;
        },
        UPDATE_SHOW_ADD_MENU(val: boolean) {
            this.showAddMenu = val;
            if (!val && this.editData) {
                this.editData = null;
            }
        },
        UPDATE_EDIT_DATA(data: Shortcut) {
            this.editData = data;
        },
    },
    getters: {

    }
});

export default useStatus;
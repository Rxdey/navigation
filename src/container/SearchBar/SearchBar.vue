<template>
    <div class="searchbar relative flex-row items-center text-sm px-24 transition-30">
        <div class="mr-8">
            <div class="i-mingcute:search-3-line"></div>
        </div>
        <div class="flex-1">
            <input type="search" autocomplete="off" name="search" class="outline-none border-none bg-transparent w-full" v-model="value" @focus="onfocus" @blur="onblur" ref="inputRef" @search="onEnter" @input="oninput" />
        </div>

        <div @click="onClear">
            <Transition name="scale">
                <div class="i-mingcute:close-line" v-if="!!value"></div>
            </Transition>
        </div>
        <!-- 联想词 -->
        <Transition name="van-fade">
            <div class="absolute w-full left-0 bottom-110% rounded-8 bg-white-70 max-h-400 overflow-y-auto transition-30" v-if="showSuggest && suggestionList.length" id="suggest">
                <div class="active:bg-white-30 flex-row" v-for="(suggest, i) in suggestionList" @click="onSearch(suggest)">
                    <div class="flex-1 van-ellipsis min-w-0 py-32 p-l-32">{{ suggest }}</div>
                    <div class="py-32 px-32" @click.stop="onFill(suggest)">
                        <div class="i-mingcute:arrow-left-up-line "></div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import useStore from '@/store/modules/useStore';
import useStatus from '@/store/modules/useStatus';
import Server from '@/server';
import { nextTick } from 'vue';

const store = useStore();
const statusStore = useStatus();
const emit = defineEmits(['focus', 'blur', 'clear']);
const inputRef = ref<HTMLInputElement>();
const value = ref('');
// 上次搜索文本，防止多余搜索
const lastValue = ref('');
const suggestionList = ref<string[]>([]);
const showSuggest = ref(false);

const onfocus = () => {
    emit('focus', value.value);
    showSuggest.value = !!(suggestionList.value.length && value.value.trim());
    statusStore.UPDATE_FOCUS(true);
};
const onblur = () => {
    emit('blur', value.value);
    showSuggest.value = false;
    statusStore.UPDATE_FOCUS(false);
};
const onClear = () => {
    value.value = '';
    if (inputRef.value) {
        inputRef.value.focus();
    }
    emit('clear');
};
const onEnter = () => {
    if (!store.engine || !value.value) return;
    const url = store.defaultEngine.url.replace('%s', encodeURIComponent(value.value.trim()));
    window.location.href = url;
};
/** 填充联想词 */
const onFill = (text: string) => {
    value.value = text;
    if (inputRef.value) inputRef.value.focus();
    nextTick(() => {
        oninput()
    });
};
/** 点击联想词搜索 */
const onSearch = (text: string) => {
    value.value = text;
    onEnter();
};
/** 输入内容加载联想词 */
const oninput = async () => {
    if (!value.value.trim()) {
        showSuggest.value = false;
    }
    if (!value.value.trim() || lastValue.value === value.value) return;
    const query = {
        wd: value.value.trim(),
        ie: 'UTF-8',
        p: 3
    };
    const res = await Server.index.Suggestion(query);
    lastValue.value = value.value;
    if (!res.data) return;
    suggestionList.value = res.data.s.reverse();
    showSuggest.value = true;
};
defineExpose({
    focus: () => {
        if (inputRef.value) inputRef.value.focus();
    }
});
watch(() => showSuggest.value, val => {
    if (val) {
        setTimeout(() => {
            const box = document.querySelector('#suggest');
            if (box) box.scrollTop = box.scrollHeight;
        }, 0);
    }
})
</script>

<style>
.searchbar {
    box-shadow: 0 0 var(--searchbar-custom-shadowSize) 0 var(--searchbar-custom-shadow);
    left: calc(50% - var(--searchbar-width) / 2);

    input::-webkit-search-cancel-button {
        display: none;
    }
}
</style>

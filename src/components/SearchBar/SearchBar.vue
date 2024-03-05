<template>
    <div class="searchbar relative flex-row items-center text-sm rounded-full px-24">
        <div class="mr-8">
            <div class="i-mingcute:search-3-line"></div>
        </div>
        <div class="flex-1">
            <input type="search" autocomplete="off" name="search" class="outline-none border-none bg-transparent w-full" v-model="value" @focus="onfocus" @blur="onblur" ref="inputRef" />
        </div>
        <div class="" @click="onClear">
            <Transition name="scale">
                <div class="i-mingcute:close-line" v-if="!!value"></div>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';

const emit = defineEmits(['focus', 'blur', 'clear']);
const inputRef = ref<HTMLInputElement>();
const value = ref('');

const onfocus = () => {
    emit('focus', inputRef.value);
};
const onblur = () => {
    emit('blur', inputRef.value);
};
const onClear = () => {
    value.value = '';
    if (inputRef.value) {
        inputRef.value.focus();
    }
    emit('clear');
};

</script>

<style scoped>
.searchbar {
    left: calc(50% - var(--searchbar-width) / 2);

    input::-webkit-search-cancel-button {
        display: none;
    }
}
</style>

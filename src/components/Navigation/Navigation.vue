<template>
    <div class="navigation w-full absolute">
        <div class="searchbar relative bg-white h-88 flex-row items-center text-32 rounded-full px-32">
            <div class="flex-1"><input type="text" class="outline-none border-none bg-transparent"></div>
            <div class=""></div>
        </div>
        <div class="shortcut bg-black-30 p-32 relative"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
</script>

<style scoped>
.navigation {
    top: var(--navigation-rect-top);
}

.searchbar {
    width: var(--searchbar-rect-width);
    left: calc(50% - var(--searchbar-rect-width) / 2);
    border-radius: var(--searchbar-rect-round);
    margin-bottom: var(--searchbar-rect-marginBottom);
}

.shortcut {
    width: var(--shortcut-rect-width);
    left: calc(50% - var(--searchbar-rect-width) / 2);
}
</style>

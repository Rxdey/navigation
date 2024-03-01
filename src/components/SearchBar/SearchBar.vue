<template>
    <div class="search-bar absolute bg-white h-90 flex-row items-center text-32 rounded-full px-32">
        <div class="flex-1"><input type="text" class="outline-none border-none bg-transparent"></div>
        <div class=""></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
</script>

<style scoped>
.search-bar {
    width: var(--searchbar-rect-width);
    top: var(--searchbar-rect-top);
    left: calc(50% - var(--searchbar-rect-width) / 2);
    border-radius: var(--searchbar-rect-round);
}
</style>

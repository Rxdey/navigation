<template>
    <div class="mb-20">
        <div class="text-xs mb-12 text-white">{{ title }}</div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
const props = defineProps<{
    title: string;
}>();
</script>

<style scoped></style>

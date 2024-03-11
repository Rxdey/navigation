<template>
    <div class="mb-24">
        <div class="text-xs mb-16 text-#ccc">{{ title }}</div>
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

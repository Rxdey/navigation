<template>
    <div class="font-bold text-32 mb-20">
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
</script>

<style scoped></style>

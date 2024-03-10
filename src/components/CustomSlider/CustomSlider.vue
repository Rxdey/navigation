<template>
    <van-slider v-model="value" :min="0" :max="10" :step="0" class="mt-32">
        <template #button>
            <div class="slider-button"></div>
        </template>
    </van-slider>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';

const value = ref(0);


</script>

<style scoped></style>

<template>
    <div class="logo text-88 font-bold text-center" v-if="logoOptions.show">
        <span v-if="!logoOptions.image">{{ logoOptions.text }}</span>
        <img class="h-full max-h-200 block mx-a" v-else :src="logoOptions.image">
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import useStore from '@/store/modules/useStore';

const store = useStore();

const logoOptions = computed(() => store.stylesOption.logo?.options || {});
</script>

<style scoped></style>

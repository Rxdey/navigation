<template>
    <div class="frame transition-30 mx-16 min-h-50vh p-32 bg-ablue shadow-lg shadow-black" @click.stop>
        <slot name="title">
            <div class="text-white font-bold text-sm mb-24" v-if="title">{{ title }}</div>
        </slot>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{ title?: string }>();
</script>

<style scoped>
.frame {
    /* font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */
    background: linear-gradient(45deg,
      var(--color-dblue) 63%,
      var(--color-ablue) 0%,
      var(--color-ablue) 100%,
      var(--color-ablue) 0%);
}
</style>

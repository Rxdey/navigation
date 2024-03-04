<template>
    <div class="wallpaper absolute">
        <div class="wallpaper-mask h-full"></div>
    </div>
</template>

<script setup  lang="ts">

</script>

<style scoped>
.wallpaper {
    top: calc(var(--wallpaper-filter-blur)*-1);
    left: calc(var(--wallpaper-filter-blur)*-1);
    bottom: calc(var(--wallpaper-filter-blur)*-1);
    right: calc(var(--wallpaper-filter-blur)*-1);

    .wallpaper-mask {
        background-color: rgba(0, 0, 0, var(--wallpaper-mask-alpha))
    }
}
</style>

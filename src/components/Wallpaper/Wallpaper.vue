<template>
    <div class="wallpaper absolute">
        <div class="wallpaper-mask h-full"></div>
    </div>
</template>

<script setup  lang="ts">

</script>

<style scoped>
.wallpaper {
    background-color: var(--wallpaper-background-color);
    background-image: var(--wallpaper-background-image);
    background-size: var(--wallpaper-background-size);
    background-repeat: var(--wallpaper-background-repeat);
    background-position: var(--wallpaper-background-position);
    filter: blur(var(--wallpaper-background-blur));
    top: calc(var(--wallpaper-background-blur)*-1);
    left: calc(var(--wallpaper-background-blur)*-1);
    bottom: calc(var(--wallpaper-background-blur)*-1);
    right: calc(var(--wallpaper-background-blur)*-1);

    .wallpaper-mask {
        background-color: rgba(0, 0, 0, var(--wallpaper-background-mask-alpha))
    }
}
</style>

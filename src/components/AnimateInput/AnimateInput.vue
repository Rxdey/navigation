<template>
  <div class="AnimateInput">
    <div class="input-wrap bg-white relative py-12 px-16">
        <input type="text" class="border-none py-8 outline-none w-full placeholder:text-sm bg-transparent" placeholder="图片地址">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';

</script>

<style scoped>
.input-wrap {
    border-bottom: 2px solid var(--color-board);
}
</style>

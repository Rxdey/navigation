<template>
    <div class="fbi relative wh-full overflow-hidden">
        <div class="scroll" style="--d:25;--y:300;">
            <div>
                <span>{{ text }}</span>
            </div>
            <div>
                <span>{{ text }}</span>
            </div>
        </div>
        <div class="scroll" style="--d:-10;--y:800;">
            <div>
                <span>{{ text }}</span>
            </div>
            <div>
                <span>{{ text }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const text = "- 設置 - SETTING - 設置 - SETTING - 設置 - SETTING - 設置 - SETTING - 設置 - SETTING - 設置 - SETTING - 設置 - SETTING "
</script>

<style scoped>
.fib {
    font-family: "MatissePro";
};
.fbi::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(transparent, transparent, rgba(0, 0, 0, 0.205), rgba(0, 0, 0, 0.171));
    z-index: 10000;
    pointer-events: none;
}

.scroll {
    width: calc(100% + 400px);
    left: -400px;
    display: flex;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    transform: rotate(calc(var(--d) * 1deg)) translateY(calc(var(--y) * 1px));
}

.scroll div {
    /* background: #e9c804; */
    background: var(--color-green);
    box-shadow: 0 0 16px rgba(0,0,0,.3);
    color: #1d1104;
    font-size: 3em;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 600;
    white-space: nowrap;
    animation: move-scroll 200s linear infinite;
    animation-delay: -200s;
}

.scroll div:nth-child(2) {
    animation: move-scroll-two 200s linear infinite;
    animation-delay: -100s;
}


@keyframes move-scroll {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
}

@keyframes move-scroll-two {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-200%);
    }
}
</style>

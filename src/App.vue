<script setup lang="ts">
import Ball from './components/Ball.vue';
</script>

<template>
  <div class="app">
    <Ball class="ball-com"></Ball>
  </div>
</template>

<style scoped>
.app {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #111;
}

.ball-com {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>

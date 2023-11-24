<template>
  <div class="ball-com">
    <div class="ball b1"></div>
    <div class="ball b2"></div>
    <div class="ball b3"></div>
    <div class="ball b4"></div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.ball-com {
  position: relative;
  width: 100vw;
  height: 100vw;
  background-color: #000;
  filter: contrast(80);
}

.ball {
  width: 20vw;
  height: 20vw;
  background-color: #fff;
  border-radius: 50%;
  filter: blur(5vw);
}

.b1 {
  position: relative;
  left: 10px;
  top: 10px;
  animation: move 2s infinite;
}

@keyframes move {
  from{
    left: 10px;
  }
  to{
    left: 100px;
  }
}

</style>
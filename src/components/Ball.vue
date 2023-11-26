<template>
  <div class="ball-com">
    <div ref="b1" class="ball b1"></div>
    <div ref="b2" class="ball b2"></div>
    <div ref="b3" class="ball b3"></div>
    <div ref="b4" class="ball b4"></div>
    <div ref="b5" class="ball b5"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { move_to, zoom, amp1, amp2, cancel_animations, to_circle } from '@/lib/animation';

const b1 = ref<HTMLDivElement|null>(null);
const b2 = ref<HTMLDivElement|null>(null);
const b3 = ref<HTMLDivElement|null>(null);
const b4 = ref<HTMLDivElement|null>(null);
const b5 = ref<HTMLDivElement|null>(null);
const balls = [b1, b2, b3, b4, b5];

enum ChatStatus {
  USER = 'User',
  ASSISTANT = 'Assistant',
  THINKING = 'Thinking'
}
const status = ref<ChatStatus>(ChatStatus.ASSISTANT);

const to_user = () => {
  status.value = ChatStatus.USER;
  cancel_animations(() => {
    move_to(b1.value!, '50%', '43%', 200);
    move_to(b2.value!, '50%', '41%', 200);
    move_to(b3.value!, '50%', '48%', 200);
    move_to(b4.value!, '50%', '35%', 200, () => {
      move_to(b1.value!, '50%', '40%', 200);
      move_to(b2.value!, '50%', '40%', 200);
      move_to(b3.value!, '50%', '40%', 200);
      move_to(b4.value!, '50%', '40%', 200);
    });

    zoom(b1.value!, '10vw', '10vw', '50%', 80);
    zoom(b2.value!, '10vw', '10vw', '50%', 80);
    zoom(b3.value!, '10vw', '10vw', '50%', 80);
    zoom(b4.value!, '10vw', '10vw', '50%', 80);

    zoom(b1.value!, '70vw', '70vw', '50%', 320);
    zoom(b2.value!, '70vw', '70vw', '50%', 320);
    zoom(b3.value!, '70vw', '70vw', '50%', 320);
    zoom(b4.value!, '70vw', '70vw', '50%', 320);
  });
}

const to_assistant = () => {
  status.value = ChatStatus.ASSISTANT;
  cancel_animations(() => {
    move_to(b1.value!, '15vw', '60vw', 200);
    move_to(b2.value!, '38vw', '60vw', 200);
    move_to(b3.value!, '61vw', '60vw', 200);
    move_to(b4.value!, '84vw', '60vw', 200);
    zoom(b1.value!, '20vw', '30vw', '15vw', 180);
    zoom(b2.value!, '20vw', '30vw', '15vw', 180);
    zoom(b3.value!, '20vw', '30vw', '15vw', 180);
    zoom(b4.value!, '20vw', '30vw', '15vw', 180);
  });
}

const to_thinking = () => {
  status.value = ChatStatus.THINKING
  to_circle(b1.value!, 20, 1, 115000);
  to_circle(b2.value!, 20, 2, 115000);
  to_circle(b3.value!, 20, 3, 115000);
  to_circle(b4.value!, 20, 4, 115000);
  to_circle(b5.value!, 20, 5, 115000);
}

const init_ball = (ele: HTMLDivElement) => {
  ele.style.width = '20vw';
  ele.style.height = '30vw';
  ele.style.borderRadius = '15vw';

  ele.style.top = '60vw';

  if(ele === b1.value) ele.style.left = '15vw';
  if(ele === b2.value) ele.style.left = '38vw';
  if(ele === b3.value) ele.style.left = '61vw';
  if(ele === b4.value) ele.style.left = '84vw';
}


onMounted(() => {
  if(!b1.value) return;
  if(!b2.value) return;
  if(!b3.value) return;
  if(!b4.value) return;

  init_ball(b1.value);
  init_ball(b2.value);
  init_ball(b3.value);
  init_ball(b4.value);

  setInterval(() => {
    if(status.value === ChatStatus.ASSISTANT) return to_user();
    if(status.value === ChatStatus.USER) return to_thinking();
    if(status.value === ChatStatus.THINKING) return to_assistant();
  }, 1500);
});
</script>

<style lang="scss" scoped>
.ball-com {
  overflow: hidden;
  position: relative;
  width: 100vw;
  height: 120vw;
  background-color: #000;
  filter: contrast(20);
}

.ball {
  position: absolute;
  background-color: #fff;
  filter: blur(1.2vw);
  box-shadow: 0.5vw 0.5vw 0.1vw rgba(31, 82, 171);
  transform: translate(-50%, -50%);
}

.b5 {
  background-color: red;
}
</style>
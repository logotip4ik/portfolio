<template>
  <div class="heading">
    <div class="container">
      <div class="logo-line"></div>
      <h1 class="anim-text text-1">Bogdan Kostyuk</h1>
      <h2 class="anim-text">Full Stack Dev</h2>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { gsap } from 'gsap';

export default {
  name: 'Heading',
  setup() {
    onMounted(() => {
      gsap.from('.logo-line', { x: 100, duration: 0.8 });
      gsap.from('.anim-text', {
        opacity: 0,
        x: 100,
        duration: 1,
        delay: 0.2,
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.heading {
  background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
  height: calc(100vh - 76px);

  .container {
    top: 50%;
    left: 10%;
    max-width: 80vw;
    transform: translateY(-50%);
    color: white;
    position: relative;
    text-shadow: 1px 1px 2px rgba($color: #000000, $alpha: 0.2);
    h1 {
      font-size: 3rem;
    }

    h2 {
      font-weight: 200;
      font-size: 2rem;
    }

    .logo-line {
      position: absolute;
      height: 110%;
      width: 2px;
      border-radius: 0.25rem;
      background: white;
      top: 50%;
      transform: translateY(-50%);
      left: -1rem;
    }
  }
}
</style>

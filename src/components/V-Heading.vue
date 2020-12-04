<template>
  <div class="heading">
    <!-- TODO: Some thing add, becouse it is to empty  -->
    <div class="container">
      <div class="logo-line"></div>
      <h1 class="anim-text text-1">Bogdan Kostyuk</h1>
      <h2 class="anim-text">Full Stack Dev</h2>
    </div>
    <p @click="$emit('scroll-to', 'projects')" ref="bottomText" class="heading__bottom"></p>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default {
  name: 'Heading',
  setup() {
    gsap.registerPlugin(ScrollTrigger);
    const bottomText = ref(null);

    const leftArr = '&#x2039;';
    const rightArr = '&#x203A;';
    const text = 'Scroll down';

    function setText() {
      bottomText.value.innerHTML += `<span class="text-to-anim">${leftArr}</span><span class="text-to-anim">${leftArr}</span> `;
      text.split('').forEach((char) => {
        bottomText.value.innerHTML += `<span class="text-to-anim">${char}</span>`;
      });
      bottomText.value.innerHTML += ` <span class="text-to-anim">${rightArr}</span><span class="text-to-anim">${rightArr}</span>`;
    }

    function toggleViewText() {
      bottomText.value.classList.toggle('opacity-0');
    }

    onMounted(() => {
      setText();
      gsap.from('.logo-line', { x: 100, duration: 0.8 });
      gsap.from('.anim-text', {
        opacity: 0,
        x: 100,
        duration: 1,
        delay: 0.2,
      });
      ScrollTrigger.create({
        trigger: '.heading__bottom',
        start: 'center center',
        invalidateOnRefresh: true,
        onToggle: () => toggleViewText(),
      });
      gsap.to('.text-to-anim', {
        stagger: {
          each: 0.3,
          repeat: -1,
          from: 'center',
          yoyo: true,
          repeatDelay: 0.4,
        },
        x: 5,
        opacity: 0.3,
        duration: 1,
      });
    });

    return {
      bottomText,
    };
  },
};
</script>

<style lang="scss" scoped>
.heading {
  background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
  background-attachment: fixed;
  height: 100vh;
  position: relative;
  overflow: hidden;

  .container {
    top: 55%;
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
  .heading__bottom {
    cursor: pointer;
    color: white;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);

    &.opacity-0 {
      transition: opacity 300ms ease-out;
      opacity: 0;
    }
  }
}
</style>

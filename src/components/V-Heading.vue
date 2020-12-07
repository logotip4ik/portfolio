<template>
  <header class="heading">
    <!-- TODO: Some thing add, becouse it is to empty  -->
    <div class="container">
      <div class="logo-line">
        <font-awesome-icon
          class="logo-icon"
          @click="openURL('https://github.com/logotip4ik')"
          @mouseover="hovering = true"
          @mouseleave="hovering = false"
          size="lg"
          :icon="['fab', 'github']"
        ></font-awesome-icon>
      </div>
      <h1 class="anim-text">
        Bogdan Kostyuk
        <div class="box"></div>
      </h1>
      <br />
      <h2 class="anim-text">
        Full Stack Dev
        <div class="box"></div>
      </h2>
    </div>
    <p @click="$emit('scroll-to', 'projects')" ref="bottomText" class="heading__bottom"></p>
  </header>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default {
  name: 'Heading',
  setup() {
    gsap.registerPlugin(ScrollTrigger);
    const bottomText = ref(null);
    const isShowingBottomText = ref(true);
    const hovering = inject('hovering');

    const text = '‹‹ Scroll down ››';

    function setText() {
      text.split('').forEach((char) => {
        bottomText.value.innerHTML += `<span class="text-to-anim">${char}</span>`;
      });
    }

    function setHoveringTrue() {
      hovering.value = true;
    }
    function setHoveringFalse() {
      hovering.value = false;
    }

    function toggleViewText() {
      bottomText.value.classList.toggle('opacity-0');
      if (isShowingBottomText.value) {
        bottomText.value.removeEventListener('mouseover', setHoveringTrue);
        bottomText.value.removeEventListener('mouseout', setHoveringFalse);
      } else {
        bottomText.value.addEventListener('mouseover', setHoveringTrue);
        bottomText.value.addEventListener('mouseout', setHoveringFalse);
      }
      isShowingBottomText.value = !isShowingBottomText.value;
    }

    function openURL(url) {
      window.open(url);
    }

    onMounted(() => {
      bottomText.value.addEventListener('mouseover', setHoveringTrue);
      bottomText.value.addEventListener('mouseout', setHoveringFalse);
      setText();
      const TL = gsap.timeline();
      TL.from('.logo-line', { x: 100, duration: 0.8, delay: 0.3 });
      TL.from(
        '.anim-text',
        {
          stagger: 0.2,
          opacity: 0,
          y: 100,
          duration: 1,
          delay: 0.2,
        },
        '-=0.8',
      );
      TL.to(
        '.box',
        {
          stagger: 0.1,
          height: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.9',
      );
      TL.to('.logo-icon', { opacity: 1 });
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
        duration: 1.2,
      });
    });

    return {
      hovering,
      bottomText,
      openURL,
    };
  },
  emits: ['scroll-to'],
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
    left: 15%;
    max-width: 85vw;
    transform: translateY(-50%);
    color: white;
    position: relative;
    text-shadow: 1px 1px 2px rgba($color: #000000, $alpha: 0.2);
    line-height: 1.2;

    h1 {
      display: inline-block;
      font-size: 3rem;
      position: relative;
    }

    h2 {
      display: inline-block;
      font-weight: 200;
      position: relative;
      font-size: 2rem;
    }

    .box {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: #303944;
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

      * {
        opacity: 0;
        position: absolute;
        left: -2rem;
        top: 10%;
        cursor: pointer;
      }
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
      cursor: default;
      pointer-events: none;
    }
  }
}
</style>

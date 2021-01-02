<template>
  <header id="heading" class="heading">
    <div class="heading__container">
      <div class="logo-line">
        <div class="logo-icons">
          <FontAwesomeIcon
            v-for="(icon, key) in icons"
            :key="key"
            class="logo-icons--icon"
            @click="icon.click"
            @mouseover="hovering = true"
            @mouseleave="hovering = false"
            size="lg"
            :icon="[icon.prefix, icon.name]"
          ></FontAwesomeIcon>
        </div>
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
    <p
      @click="$emit('scroll-to', 'projects')"
      @mouseover="hovering = true"
      @mouseleave="hovering = false"
      ref="bottomText"
      :class="{ heading__bottom: true, 'heading__bottom--phone': isMobile }"
    ></p>
  </header>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'particles.js';
import particlesJSON from '@/assets/particles.json';

export default {
  name: 'Heading',
  setup(_, { emit }) {
    gsap.registerPlugin(ScrollTrigger);
    const bottomText = ref(null);
    const hovering = inject('hovering');

    const text = '‹‹ Scroll down ››';

    function setText() {
      text.split('').forEach((char) => {
        const isEmpty = char === ' ' ? 'empty' : '';
        bottomText.value.innerHTML += `<span class="text-to-anim ${isEmpty}">${char}</span>`;
      });
      gsap.set('.empty', { width: '0.4ch' });
    }

    function openURL(url) {
      window.open(url);
    }

    function setupParticlesJS() {
      window.particlesJS('heading', particlesJSON);
      gsap.set('.particles-js-canvas-el', {
        transform: 'translateY(-110px)',
        height: '105vh',
        zIndex: -1,
      });
    }

    function setupAnimations() {
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
      TL.to('.logo-icons--icon', { opacity: 1, stagger: 0.3 });
    }

    onMounted(() => {
      setText();
      setupAnimations();
      setupParticlesJS();

      ScrollTrigger.create({
        trigger: '.heading__bottom',
        start: 'center center',
        onEnter: () => bottomText.value.classList.add('opacity-0'),
        onLeaveBack: () => bottomText.value.classList.remove('opacity-0'),
      });
      gsap.to('.text-to-anim', {
        stagger: {
          each: 0.3,
          repeat: -1,
          from: 'center',
          yoyo: true,
          repeatDelay: 0.4,
          ease: 'power1.inOut',
        },
        y: 1.0,
        opacity: 0.3,
        duration: 1.2,
      });
    });

    return {
      icons: [
        { prefix: 'fab', name: 'github', click: () => openURL('https://github.com/logotip4ik') },
        { prefix: 'fas', name: 'paper-plane', click: () => emit('scroll-to', 'contact') },
      ],
      hovering,
      bottomText,
      openURL,
    };
  },
  emits: ['scroll-to'],
  props: {
    isMobile: {
      type: Boolean,
      required: true,
      default: false,
    },
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

  &__container {
    top: 50%;
    left: 15%;
    color: white;
    position: relative;
    text-shadow: 1px 1px 2px rgba($color: #000000, $alpha: 0.2);
    line-height: 1.2;
    z-index: 10;
    display: inline-block;
    max-width: 82vw;

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
      // background: #303944;
      background: #242a33;
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

      .logo-icons {
        position: absolute;
        left: -2rem;
        top: 10%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;

        &--icon {
          opacity: 0;
          &:first-child {
            margin-bottom: 1rem;
          }
        }
      }
    }
  }

  &__bottom {
    cursor: pointer;
    color: white;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    transition: opacity 300ms ease-out;
    z-index: 10;

    &--phone {
      display: flex;

      .text-to-anim {
        display: inline-block;
      }
    }

    &.opacity-0 {
      opacity: 0;
      cursor: default;
      pointer-events: none;
    }
  }
}
</style>

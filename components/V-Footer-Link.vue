<script setup>
defineProps({ href: { type: String, required: true, default: '' } });

const { gsap } = useGsap();
const slots = useSlots();
const prefersReducedMotion = useReducedMotion();

const hoverChars = ref(null);
const idleChars = ref(null);

const linkText = computed(() => slots.default()[0].children);

let prevAnim;

function makeTimeline(props) {
  return gsap.timeline({
    defaults: {
      stagger: { amount: 0.3, from: 'end' },
      duration: 0.5,
      ease: 'expo.out',
    },
    ...props,
  });
}

function showHoverText() {
  if (prefersReducedMotion.value) return;

  if (prevAnim) prevAnim.kill();

  prevAnim = makeTimeline();

  prevAnim.to(idleChars.value, { yPercent: -100 });
  prevAnim.to(hoverChars.value, { yPercent: -100 }, '<');
}

function hideHoverText() {
  if (prefersReducedMotion.value) return;

  if (prevAnim) prevAnim.kill();

  prevAnim = makeTimeline();

  prevAnim.to(idleChars.value, { yPercent: 0 });
  prevAnim.to(hoverChars.value, { yPercent: 0 }, '<');
}
</script>

<template>
  <NuxtLink
    :href="href"
    target="_blank"
    class="social-link"
    @focus="showHoverText"
    @blur="hideHoverText"
    @pointerenter="showHoverText"
    @pointerleave="hideHoverText"
  >
    <div class="social-link__wrapper" aria-hidden="true">
      <span class="social-link__line serif">
        <span v-for="(char, key) in linkText" :key="key" ref="hoverChars">{{
          char
        }}</span>
      </span>
      <span class="social-link__line">
        <span v-for="(char, key) in linkText" :key="key" ref="idleChars">{{
          char
        }}</span>
      </span>
    </div>
    <!-- <span class="sr-only">{{ linkText }}</span> -->
  </NuxtLink>
</template>

<style lang="scss" scoped>
.social-link {
  display: inline-block;

  color: var(--ff-color);
  text-transform: uppercase;

  margin: 0;

  cursor: none;

  &__wrapper {
    position: relative;

    line-height: 1;
    overflow: hidden;
  }

  &__line {
    letter-spacing: 0.25px;

    margin: 0;
    padding: 0;
    white-space: nowrap;

    &:nth-child(1) {
      font-size: calc(var(--step-0) - 0.075rem);

      transform: translateY(100%);

      transition: opacity 400ms;

      @media (prefers-reduced-motion: reduce) {
        transform: none;

        &:is(:hover, :focus-visible) {
          opacity: 0.5;

          transition: opacity 200ms;
        }
      }
    }

    &:nth-child(2) {
      position: absolute;
      top: 0;
      right: 0;

      font-size: var(--step--1);

      @media screen and (max-width: 600px) {
        font-size: calc(var(--step--1) - 0.05rem);

        right: 50%;
        transform: translateX(50%);
      }

      @media (prefers-reduced-motion: reduce) {
        display: none;
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    cursor: pointer;
  }

  span {
    display: inline-block;
  }
}
</style>

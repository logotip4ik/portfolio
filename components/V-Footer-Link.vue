<script setup>
defineProps({ href: { type: String, required: true, default: '' } });

const { gsap } = useGsap();
const slots = useSlots();

const footerLinkUpper = ref(null);
const footerLinkLower = ref(null);

const linkText = computed(() => slots.default()[0].children);

let prevAnim;

function hoverLink() {
  if (prevAnim) prevAnim.kill();

  prevAnim = gsap.timeline({
    defaults: { ease: 'expo.out', stagger: { amount: 0.25, from: 'end' } },
  });

  prevAnim.fromTo(
    footerLinkLower.value.children,
    { yPercent: 0 },
    { yPercent: -100 },
    0
  );
  prevAnim.fromTo(
    footerLinkUpper.value.children,
    { yPercent: 0 },
    { yPercent: -100 },
    0.05
  );
}

function idleLink() {
  if (prevAnim) prevAnim.kill();

  prevAnim = gsap.timeline({
    defaults: { ease: 'expo.out', stagger: { amount: 0.35, from: 'end' } },
  });

  prevAnim.to(footerLinkLower.value.children, { yPercent: 0 }, 0);
  prevAnim.to(footerLinkUpper.value.children, { yPercent: 0 }, 0);
}

onMounted(() => {
  // gsap.set(footerLinkUpper.value, { y: -105 });
});
</script>

<template>
  <NuxtLink
    :href="href"
    target="_blank"
    class="footer-link"
    @pointerenter="hoverLink"
    @pointerleave="idleLink"
    @focus="hoverLink"
    @blur="idleLink"
  >
    <span ref="footerLinkUpper" class="footer-link__line">
      <span
        v-for="(char, key) in linkText"
        :key="key"
        class="footer-link__line__char"
        >{{ char }}</span
      >
    </span>
    <span
      ref="footerLinkLower"
      class="footer-link__line footer-link__line--smaller"
    >
      <span
        v-for="(char, key) in linkText"
        :key="key"
        class="footer-link__line__char"
        >{{ char }}</span
      >
    </span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.footer-link {
  display: inline-block;

  position: relative;

  color: currentColor;
  text-decoration: none;
  line-height: 1.24;

  opacity: 0.85;

  overflow: hidden;

  transition: opacity 400ms ease;

  &__line {
    display: flex;

    font-size: var(--step-0);

    &--smaller {
      position: absolute;

      top: 87%;
      right: 0;

      font-size: calc(var(--step-0) - 0.25rem);

      @media (max-width: 685px) {
        right: 50%;

        transform: translate(50%);
      }
    }

    &__char {
      display: inline-block;
    }
  }

  &:is(:hover, :focus-visible) {
    opacity: 1;
  }
}
</style>

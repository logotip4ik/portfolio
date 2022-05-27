<script setup>
import LinkSVG from '~/assets/img/arrow-link.svg';
import OuterLinkSVG from '~/assets/img/arrow-outer-link.svg';
import MailLinkSVG from '~/assets/img/mail-link.svg';
import ActionSVG from '~/assets/img/action.svg';

import { pointerModifiersWhitelist } from '~/lib/constants';

const SVGComponents = {
  [pointerModifiersWhitelist[0]]: LinkSVG,
  [pointerModifiersWhitelist[1]]: OuterLinkSVG,
  [pointerModifiersWhitelist[2]]: MailLinkSVG,
  [pointerModifiersWhitelist[3]]: ActionSVG,
};

const { $checkReducedMotion } = useNuxtApp();
const { gsap } = useGsap();
const emitter = useEmitter();

let firstMove = false;

const pointer = ref(null);
const pointerState = ref('');

function svgEnterAnimation(svgEl, done) {
  gsap.fromTo(
    svgEl,
    {
      yPercent: -55,
      xPercent: -55,
      scale: 0,
      rotate: 45,
    },
    {
      yPercent: -55,
      xPercent: -55,
      scale: 1,
      rotate: 0,
      duration: 0.25,
      delay: 0.15,
      ease: 'back.out',
      onComplete: () => done(),
    }
  );
}

function svgLeaveAnimation(svgEl, done) {
  gsap.to(svgEl, {
    yPercent: -55,
    xPercent: -55,
    scale: 0,
    duration: 0.25,
    ease: 'back.out',
    onComplete: () => done(),
  });
}

watch(pointerState, (val) => {
  const pointerTl = gsap.timeline({
    defaults: { ease: 'back.out', duration: 0.3 },
    paused: true,
  });

  if (val) pointerTl.to(pointer.value, { scale: 6 });
  else pointerTl.to(pointer.value, { scale: 1 });

  pointerTl.play();
});

onMounted(() => {
  gsap.set(pointer.value, {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    autoAlpha: 0,
  });

  const isTouch = 'ontouchstart' in document.documentElement;
  const prefersReducedMotion = $checkReducedMotion();

  if (isTouch || prefersReducedMotion) return;

  const toPointerX = gsap.quickTo(pointer.value, 'x', {
    ease: 'expo.out',
    duration: 0.5,
  });
  const toPointerY = gsap.quickTo(pointer.value, 'y', {
    ease: 'expo.out',
    duration: 0.5,
  });

  const pointerScaleTl = gsap.to(pointer.value, {
    scale: '-=1',
    ease: 'back.out',
    duration: 0.25,
    paused: true,
  });

  window.addEventListener('pointermove', ({ x, y }) => {
    if (!firstMove)
      gsap.to(pointer.value, { autoAlpha: 1 }).then(() => (firstMove = true));

    toPointerX(x);
    toPointerY(y);
  });

  window.addEventListener('pointerdown', () => {
    if (pointerState.value !== '') pointerScaleTl.play();
  });

  window.addEventListener('pointerup', () => {
    if (pointerState.value !== '') pointerScaleTl.reverse();
  });

  for (const modifier of pointerModifiersWhitelist) {
    emitter.on(`pointer:${modifier}:active`, () => {
      pointerState.value = modifier;
    });
    emitter.on(`pointer:${modifier}:inactive`, () => {
      pointerState.value = '';
    });
  }

  emitter.on('pointer:inactive', () => {
    pointerState.value = '';
  });
});
</script>

<template>
  <div ref="pointer" class="pointer">
    <Transition
      :css="false"
      @enter="svgEnterAnimation"
      @leave="svgLeaveAnimation"
    >
      <Component
        :is="SVGComponents[pointerState]"
        :key="pointerState"
        class="pointer__svg"
      />
    </Transition>
  </div>
</template>

<style lang="scss">
.pointer {
  --size: 0.85rem;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;

  width: var(--size);
  height: var(--size);

  border-radius: 50%;
  background-color: #ffe6ed;

  mix-blend-mode: exclusion;

  pointer-events: none;
  transform: translate(-50%, -50%);

  &__svg {
    --size: 30%;

    position: absolute;
    top: 50%;
    left: 50%;

    width: var(--size);
    height: var(--size);

    color: #030303;
  }
}
</style>

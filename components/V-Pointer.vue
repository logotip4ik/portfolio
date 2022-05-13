<script setup>
import LinkSVG from '~/assets/img/arrow-link.svg';
import OuterLinkSVG from '~/assets/img/arrow-outer-link.svg';
import MailLinkSVG from '~/assets/img/mail-link.svg';
import ActionSVG from '~/assets/img/action.svg';

import { pointerModifiersWhitelist } from '~/lib/constants';

const SVGComponents = {
  [pointerModifiersWhitelist.at(0)]: LinkSVG,
  [pointerModifiersWhitelist.at(1)]: OuterLinkSVG,
  [pointerModifiersWhitelist.at(2)]: MailLinkSVG,
  [pointerModifiersWhitelist.at(3)]: ActionSVG,
};

const { gsap } = useGsap();
const emitter = useEmitter();

let firstMove = false;

const pointer = ref(null);
const pointerState = ref('');

onMounted(() => {
  gsap.set(pointer.value, {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    autoAlpha: 0,
  });

  const isTouch = 'ontouchstart' in document.documentElement;

  if (isTouch) return;

  const toPointerX = gsap.quickTo(pointer.value, 'x', {
    ease: 'expo.out',
    duration: 0.5,
  });
  const toPointerY = gsap.quickTo(pointer.value, 'y', {
    ease: 'expo.out',
    duration: 0.5,
  });

  window.addEventListener('pointermove', ({ x, y }) => {
    if (!firstMove)
      gsap.to(pointer.value, { autoAlpha: 1 }).then(() => (firstMove = true));

    toPointerX(x);
    toPointerY(y);
  });

  for (const modifier of pointerModifiersWhitelist) {
    emitter.on(`pointer:${modifier}:active`, () => {
      pointerState.value = modifier;
    });
    emitter.on(`pointer:${modifier}:inactive`, () => {
      pointerState.value = '';
    });
  }
});
</script>

<template>
  <div
    ref="pointer"
    :class="{ pointer: true, 'pointer--active': pointerState !== '' }"
  >
    <Transition name="pointer-svg">
      <Component
        :is="SVGComponents[pointerState]"
        :key="pointerState"
        class="pointer__svg"
      />
    </Transition>
  </div>
</template>

<style lang="scss">
$ease-back-out: cubic-bezier(0.34, 1.56, 0.64, 1);

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

  transition: width 300ms $ease-back-out, height 300ms $ease-back-out;

  &--active {
    --size: 5rem;
  }

  &__svg {
    --size: 35%;

    position: absolute;
    top: 50%;
    left: 50%;

    width: var(--size);
    height: var(--size);

    color: #030303;

    transform: translate(-50%, -50%) rotate(0) scale(1);
  }
}

.pointer-svg-enter-active,
.pointer-svg-leave-active {
  transition: transform 175ms $ease-back-out, opacity 175ms;
  transition-delay: 75ms;
}

.pointer-svg-enter-from {
  transform: translate(-50%, -50%) rotate(50deg) scale(0);
}
.pointer-svg-leave-to {
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
}
</style>

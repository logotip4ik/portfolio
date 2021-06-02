<template>
  <div class="popup__container">
    <div ref="popup" :class="{ popup: true, 'popup--error': !success }">
      {{
        success
          ? 'Your message is send successfully!'
          : 'Something went wrong. Please try again later.'
      }}
      <div :class="{ popup__timer: true, 'popup__timer--error': !success }" ref="timer"></div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Hammer from 'hammerjs';
import gsap from 'gsap';

export default {
  name: 'Popup',
  setup(_, { emit }) {
    const popup = ref(null);
    const timer = ref(null);

    const timeToShow = 9;
    let currTime = 1;
    let timerAnim;
    let timeout;

    function timeoutCallback() {
      const div = 57.4;
      if (Math.floor(currTime / div) === timeToShow) {
        emit('close');
        return;
      }
      currTime += 1;
      timeout = requestAnimationFrame(timeoutCallback);
    }
    function initHammer() {
      const hammertime = new Hammer(popup.value);
      hammertime.on('panstart panmove', ({ deltaX }) => {
        const delta = deltaX < 0 ? deltaX * 0.05 : deltaX;
        gsap.to(popup.value, { x: delta });
      });
      hammertime.on('hammer.input', ({ isFinal, deltaX, velocityX }) => {
        timerAnim.pause();
        cancelAnimationFrame(timeout);
        if (!isFinal) return;
        timerAnim.resume();
        timeout = requestAnimationFrame(timeoutCallback);
        const delta = deltaX + Math.abs(velocityX) * deltaX;
        if (delta <= 0) {
          gsap.to(popup.value, { x: 0 });
        } else if (delta > 0 && delta < 300) {
          gsap.to(popup.value, { x: 0 });
        } else {
          gsap.to(popup.value, {
            xPercent: 120,
            onComplete: () => {
              if (timerAnim) timerAnim.kill();
              cancelAnimationFrame(timeout);
              emit('close');
            },
          });
        }
      });
    }
    function initTimer() {
      timerAnim = gsap.to(timer.value, {
        width: '100%',
        duration: timeToShow,
        ease: 'linear',
      });
      timeout = requestAnimationFrame(timeoutCallback);
    }

    onMounted(() => {
      initHammer();
      initTimer();
    });

    return { popup, timer };
  },
  props: {
    success: {
      type: Boolean,
      requreid: true,
      default: true,
    },
  },
  emits: ['close'],
};
</script>

<style lang="scss" scoped>
.popup__container {
  position: fixed;
  top: 4rem;
  right: 0;
  padding: 1rem;
  z-index: 200;
  max-width: 400px;
  display: flex;
  justify-content: flex-end;
}
.popup {
  width: 100%;
  padding: 1rem 2rem;
  color: #18181e;
  text-align: center;
  background: rgba(#79ffe1, 0.7);
  border-radius: 0.25rem;
  box-shadow: 0 0 5px rgba(#000, 0.3);
  backdrop-filter: blur(2px);
  position: relative;
  overflow: hidden;

  &--error {
    background: rgba($color: #f85151, $alpha: 0.7);
    color: white;
  }

  &__timer {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 0;
    background-color: rgba(#d1faf1, 0.9);

    &--error {
      background-color: rgba($color: #ffb4b4, $alpha: 0.9) !important;
    }
  }
}
</style>

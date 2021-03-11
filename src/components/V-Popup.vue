<template>
  <div class="popup__container">
    <div ref="popup" :class="{ popup: true, error: !success }" @click="$emit('close')">
      {{
        success
          ? 'Your message is send successfully!'
          : 'Something went wrong. Please try again later.'
      }}
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
    const hammertime = ref(null);

    onMounted(() => {
      hammertime.value = new Hammer(popup.value);
      hammertime.value.get('swipe').set({ direction: Hammer.DIRECTION_UP });
      hammertime.value.on('swipe', () => {
        emit('close');
      });
      hammertime.value.on('panstart panmove', ({ deltaY }) => {
        if (deltaY < -80) emit('close');
        gsap.to(popup.value, { translateY: deltaY > 200 ? 200 : deltaY });
      });
      hammertime.value.on('hammer.input', ({ isFinal }) => {
        if (isFinal) {
          gsap.to(popup.value, { translateY: 0 });
        }
      });
    });

    return { popup };
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
  top: 2rem;
  left: 50%;
  transform: translate(-50%);
  padding: 1rem;
  z-index: 200;
  width: 100%;
  display: flex;
  justify-content: center;
}
.popup {
  max-width: 400px;
  padding: 1.5rem 2rem;
  color: #18181e;
  text-align: center;
  background: rgba(#79ffe1, 0.7);
  border-radius: 0.25rem;
  box-shadow: 0 0 5px rgba(#000, 0.3);

  &.error {
    background: rgba($color: #ff0000, $alpha: 0.3);
    color: white;
  }
}

@media screen and (max-width: 485px) {
  .popup {
    // padding: 0.8rem 1.25rem;
  }
}
</style>

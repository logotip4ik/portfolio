<template>
  <div class="popup__container">
    <div :class="{ popup: true, error: !success }" @click="$emit('close')">
      {{
        success
          ? 'Your message is send successfully!'
          : 'Something went wrong. Please try again later.'
      }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
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

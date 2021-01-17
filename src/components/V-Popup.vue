<template>
  <div :class="{ popup: true, error: !success }" @click="$emit('close')">
    {{
      success
        ? 'Your message is send Successfully!'
        : 'Something went wrong. Please try again later.'
    }}
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
.popup {
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translate(-50%);
  max-width: 500px;
  padding: 1.5rem 2rem;
  color: #18181e;
  background: rgba(#79ffe1, 0.6);
  z-index: 200;
  border-radius: 0.25rem;
  box-shadow: 0 0 5px rgba(#000, 0.3);

  &.error {
    background: rgba($color: #ff0000, $alpha: 0.3);
    color: white;
  }
}
</style>

<template>
  <div class="overlay">
    loading...
  </div>
</template>

<script>
export default {
  name: 'Loading-Overlay',
};
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  background: #18181e;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;

  * {
    color: white;
  }
}
</style>

<script setup>
const props = defineProps({ text: { type: String, required: true } });

onMounted(() => {
  console.log(props.text);
});
</script>

<template>
  <canvas class="canvas" />
</template>

<style lang="scss" scoped>
.canvas {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  width: 100%;
  height: 100%;
}
</style>

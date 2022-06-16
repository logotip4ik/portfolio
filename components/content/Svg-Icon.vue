<script setup>
const props = defineProps({
  name: { type: String, required: true, default: '' },
});

const icons = useIcons();

const icon = computed(() =>
  icons.value[props.name] ? icons.value[props.name] : ''
);
</script>

<template>
  <!-- eslint-disable -->
  <span v-html="icon" />
</template>

<style scoped lang="scss">
span {
  display: inline-block;

  width: auto;
  height: auto;

  svg {
    width: 100%;
  }
}
</style>

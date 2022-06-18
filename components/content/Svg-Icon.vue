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
  <span class="project-svg-icon" v-html="icon" />
</template>

<style lang="scss">
.project-svg-icon {
  display: inline-block;

  width: auto;
  height: auto;

  svg {
    width: 100%;
  }
}
</style>

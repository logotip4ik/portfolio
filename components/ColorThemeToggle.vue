<template>
  <button
    :title="$colorMode.preference"
    aria-label="color theme toggle"
    class="theme-toggle"
    @click="toggleColorTheme()"
  >
    <transition mode="out-in" name="fade">
      <SystemSvg v-if="$colorMode.preference === 'system'" key="0" />
      <SunSvg v-else-if="$colorMode.preference === 'light'" key="1" />
      <MoonSvg v-else-if="$colorMode.preference === 'dark'" key="2" />
    </transition>
  </button>
</template>

<script>
import SunSvg from '~/assets/img/sun.svg?inline'
import MoonSvg from '~/assets/img/moon.svg?inline'
import SystemSvg from '~/assets/img/system.svg?inline'

export default {
  components: { SunSvg, MoonSvg, SystemSvg },
  data: () => ({
    colorModeIdx: 0,
    colorModes: ['system', 'light', 'dark'],
  }),
  mounted() {
    this.colorModeIdx = this.colorModes.indexOf(this.$colorMode.value)
  },
  methods: {
    toggleColorTheme() {
      this.colorModeIdx = (this.colorModeIdx + 1) % this.colorModes.length
      this.$colorMode.preference = this.colorModes[this.colorModeIdx]
    },
  },
}
</script>

<style lang="scss">
.theme-toggle {
  --btn-size: 2.5rem;
  --br-radius: 0.25rem;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  position: relative;

  width: var(--btn-size);
  height: var(--btn-size);

  border: none;
  border-radius: var(--br-radius);
  background-color: transparent;

  cursor: pointer;

  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    opacity: 0;
    border-radius: var(--br-radius);
    box-shadow: 0 0 30px rgba($color: hsl(0, 0%, 20%), $alpha: 0.25),
      inset 0 0 5px rgba($color: hsl(0, 0%, 20%), $alpha: 0.05);

    transition: opacity var(--transition-time) var(--transition-function);
  }

  svg {
    height: 75%;
    width: auto;

    transform: scale(1);
    transition: opacity var(--transition-time) var(--transition-function),
      transform var(--transition-time) var(--transition-function);
  }

  &:hover {
    &::after {
      opacity: 1;
      transition: opacity 200ms var(--transition-function);
    }

    svg {
      transform: scale(1.05);
      transition: opacity var(--transition-time) var(--transition-function),
        transform 100ms var(--transition-function);
    }
  }
}
</style>

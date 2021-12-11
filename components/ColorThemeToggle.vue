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
  --btn-size: 3rem;
  --br-radius: 0.3rem;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  position: relative;
  isolation: isolate;

  width: var(--btn-size);
  height: var(--btn-size);

  border: 1px solid hsla(var(--primary-color-values), 0.05);
  border-radius: var(--br-radius);
  background-color: transparent;

  cursor: pointer;

  &::after {
    content: '';

    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    border-radius: var(--br-radius);
    mix-blend-mode: lighten;
    background-color: hsla(var(--theme-color), 10%, 50%, 0.125);
    opacity: 0;

    transition: opacity 300ms var(--transition-function-ease-out);
  }

  svg {
    height: 65%;
    width: auto;
  }

  &:hover {
    border-color: hsla(var(--primary-color-values), 0.1);
    &::after {
      opacity: 1;
    }
  }
}
</style>

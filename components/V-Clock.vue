<template>
  <p ref="clock" class="clock">
    <span aria-hidden="true"><GlobeSVG></GlobeSVG>{{ localTime }}</span>
    <br />
    <span aria-hidden="true">Ukraine</span>
    <span class="sr-only">{{ `time in Ukraine ${localTime}` }}</span>
  </p>
</template>

<script>
import GlobeSVG from '~/assets/img/globe.svg?inline'

export default {
  components: { GlobeSVG },
  data() {
    return {
      localTime: this.getLocalTime(),
    }
  },
  mounted() {
    setInterval(() => (this.localTime = this.getLocalTime()), 1000)
  },
  methods: {
    getLocalTime() {
      return Intl.DateTimeFormat('uk-UA', {
        timeZone: 'Europe/Kiev',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date())
    },
  },
}
</script>

<style lang="scss">
.clock {
  --base-font-size: calc(var(--step--1) - 0.075rem);

  position: absolute;

  color: lighten(black, 20);
  opacity: 0.95;
  margin: 0;
  font-size: var(--base-font-size);
  font-weight: 200;
  line-height: 1.25;
  text-align: center;

  svg {
    transform: translateY(19%);

    max-width: var(--step-0);
    height: auto;
  }

  span:nth-of-type(2) {
    display: inline-block;
    font-size: calc(var(--base-font-size) + 0.13rem);
    transform: translateX(1px);
  }
}
</style>

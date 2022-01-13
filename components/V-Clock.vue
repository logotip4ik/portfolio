<template>
  <p ref="clock" class="clock">
    <span>Ukraine</span>
    <span>[{{ localTime }}]</span>
  </p>
</template>

<script>
export default {
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
  position: absolute;

  color: lighten(black, 20);
  opacity: 0.95;

  span:nth-child(2) {
    display: inline-block;

    font-size: calc(var(--step--2) - 0.115rem);

    margin-inline-start: 0.25rem;
    transform: translateY(-1px);
  }
}
</style>

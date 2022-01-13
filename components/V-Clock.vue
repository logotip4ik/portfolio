<template>
  <p ref="clock" class="clock">
    <span>Kyiv</span>
    <span>{{ localTime }}</span>
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

<style>
.clock {
  position: absolute;
  color: grey;
}
</style>

<template>
  <div>
    <div role="presentation" class="scroller">
      <Nuxt></Nuxt>
    </div>
    <V-Pointer></V-Pointer>
    <V-Loader></V-Loader>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  mounted() {
    this.logGreeting()
    this.setViewHeight()
    window.addEventListener('resize', this.setViewHeight)
  },
  methods: {
    setViewHeight() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    },
    logGreeting() {
      // eslint-disable-next-line
      console.log(
        '%cBogdan Kostyuk',
        'background-color: #030303;border-radius: 0.125rem;padding: 5px 10px;font-family: "Times New Roman", serif;font-size: 2rem;color: white'
      )
      // eslint-disable-next-line
      console.log(
        "%cHello😁 curios friend! Currently I am looking👀 for a job as a front end developer, so let's get in touch! If you are looking for a source📦 here you are: https://github.com/logotip4ik/portfolio",
        'background-color: #030303;border-radius: 0.125rem;padding: 5px 10px;font-size:1rem;color: white;line-height:1.75'
      )
    },
  },
}
</script>

<style></style>

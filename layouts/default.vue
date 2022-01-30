<template>
  <div>
    <div role="presentation" class="scroller">
      <Nuxt></Nuxt>
    </div>
    <V-Menu :current-section="currentSection"></V-Menu>
    <V-Navbar></V-Navbar>
    <V-Loader></V-Loader>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data: () => ({ currentSection: 0 }),
  mounted() {
    const gsap = this.$gsap
    const ScrollTrigger = this.$ScrollTrigger

    gsap.utils.toArray('header, section').forEach((item, i) => {
      const start = 'top 45%'
      const end = 'bottom 45%'

      ScrollTrigger.create({
        trigger: item,
        start,
        end,
        onEnter: () => (this.currentSection = i),
        onEnterBack: () => (this.currentSection = i),
      })
    })

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
        "%cHello😁 curios friend! Currently I am looking👀 for a job as a front end developer, so write let's get in touch! If you are looking for a source📦 here you are: https://github.com/logotip4ik/portfolio",
        'background-color: #030303;border-radius: 0.125rem;padding: 5px 10px;font-size:1rem;color: white;line-height:1.75'
      )
    },
  },
}
</script>

<style></style>

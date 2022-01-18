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
      // NOTE: this is need cuz we are pinning section with class of 'about'
      const end =
        item.classList[0] === 'about' ? 'bottom+=100% 45%' : 'bottom 45%'

      ScrollTrigger.create({
        trigger: item,
        start,
        end,
        onEnter: () => (this.currentSection = i),
        onEnterBack: () => (this.currentSection = i),
      })
    })

    this.setViewHeight()
    window.addEventListener('resize', this.setViewHeight)
  },
  methods: {
    setViewHeight() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    },
  },
}
</script>

<style></style>

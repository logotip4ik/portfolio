<template>
  <div>
    <V-Navbar></V-Navbar>
    <div class="scroller">
      <Nuxt></Nuxt>
    </div>
    <V-Loader></V-Loader>
    <V-Menu :current-section="currentSection"></V-Menu>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data: () => ({ currentSection: 'home' }),
  mounted() {
    const gsap = this.$gsap
    const ScrollTrigger = this.$ScrollTrigger

    gsap.utils.toArray('header, section').forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: '1% 45%',
        end: 'bottom 45%',
        onEnter: () => (this.currentSection = i),
        onEnterBack: () => (this.currentSection = i),
      })
    })
  },
}
</script>

<style></style>

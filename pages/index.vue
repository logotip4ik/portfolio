<template>
  <div role="presentation">
    <V-Navbar :current-section="currentSection"></V-Navbar>
    <V-Header aria-label="content header"></V-Header>
    <main aria-label="main content">
      <V-Work></V-Work>
      <V-About></V-About>
      <V-Contact></V-Contact>
    </main>
    <V-Footer></V-Footer>
    <V-Menu :current-section="currentSection"></V-Menu>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({ currentSection: 0 }),
  mounted() {
    const gsap = this.$gsap
    const ScrollTrigger = this.$ScrollTrigger

    gsap.utils.toArray('header, section').forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 45%',
        end: 'bottom 45%',
        onEnter: () => (this.currentSection = i),
        onEnterBack: () => (this.currentSection = i),
      })
    })
  },
}
</script>

<style></style>

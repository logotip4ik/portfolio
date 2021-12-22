<template>
  <div>
    <Navbar />
    <SectionHeader />
    <main>
      <SectionProjects />
    </main>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted() {
    const blobs = document.querySelectorAll('.parallax-blob')
    const gsap = this.$gsap

    gsap.to(blobs, {
      y: 'random(-500, -200)',
      invalidateOnRefresh: true,
      scrollTrigger: { scrub: 2, start: 'top top', end: 'bottom top' },
    })
  },
}
</script>

<style lang="scss"></style>

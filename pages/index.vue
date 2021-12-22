<template>
  <div>
    <Navbar />
    <SectionHeader />
    <main>
      <section class="projects">
        <h2 class="projects__title">/ Projects</h2>
      </section>
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
      // ease: 'power1.easeInOut',
      scrollTrigger: { scrub: 1.75, start: 'top top', end: 'bottom top' },
    })
  },
}
</script>

<style lang="scss">
.projects {
  min-height: 100vh;
}
</style>

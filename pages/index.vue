<template>
  <div>
    <SectionHeader />
    <main>
      <SectionProjects />
      <SectionAbout />
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
      y: (i) => gsap.utils.random(-300, -100) * (i + 1),
      invalidateOnRefresh: true,
      scrollTrigger: {
        scrub: 2,
        start: 'top top',
        end: 'bottom top',
      },
    })
  },
}
</script>

<style lang="scss"></style>

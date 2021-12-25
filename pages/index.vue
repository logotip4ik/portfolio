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
      yPercent: (i) => gsap.utils.random(-50, -20) * (i + 1),
      scrollTrigger: {
        scrub: 1,
        start: 'top top',
        end: 'bottom top',
        invalidateOnRefresh: true,
      },
    })
  },
}
</script>

<style lang="scss"></style>

<template>
  <h2 class="section-title">
    <slot />
    <span ref="headerCover" class="cover"></span>
  </h2>
</template>

<script>
export default {
  mounted() {
    const gsap = this.$gsap

    const { headerCover } = this.$refs

    const header = headerCover.parentElement
    const section = header.parentElement

    gsap.to(headerCover, {
      top: '100%',
      duration: 0.65,
      scrollTrigger: {
        trigger: header,
        start: 'top bottom-=100px',
      },
    })

    gsap.fromTo(
      header,
      { y: '-random(10, 30)' },
      {
        y: 'random(10, 30)',
        duration: 0.65,
        scrollTrigger: {
          trigger: section,
          scrub: 1,
        },
      }
    )
  },
}
</script>

<style lang="scss">
.section-title {
  display: inline-block;

  position: relative;

  font-weight: 500;
  font-size: clamp(1.5rem, 5vw, 2.25rem);
  margin-bottom: 3rem;

  .cover {
    position: absolute;
    top: 0%;
    left: 0;
    right: 0;
    bottom: 0%;

    background-color: var(--ff-primary-color);
  }
}
</style>

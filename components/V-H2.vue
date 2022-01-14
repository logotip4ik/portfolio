<template>
  <h2 ref="title" class="title-h2 serif"><slot></slot></h2>
</template>

<script>
export default {
  mounted() {
    const { title } = this.$refs

    const gsap = this.$gsap

    gsap.fromTo(
      title,
      { yPercent: 50 },
      {
        yPercent: -50,
        scrollTrigger: {
          scrub: 0.75,
          trigger: title.parentElement,
          start: 'top bottom',
          end: '+=50% top',
        },
      }
    )
  },
}
</script>

<style>
.title-h2 {
  text-align: center;
}
</style>

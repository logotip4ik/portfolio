<template>
  <li ref="item" class="item">
    <span class="item__line item__line--1">
      <span v-for="(char, key) in textChars" :key="key">{{ char }}</span>
    </span>
    <span class="item__line item__line--2">
      <span v-for="(char, key) in textChars" :key="key">{{ char }}</span>
    </span>
  </li>
</template>

<script>
export default {
  computed: {
    textChars() {
      return this.$slots.default[0].text.trim().split('')
    },
  },
  mounted() {
    const { item } = this.$refs
    const [normalText, hoverText] = Array.from(item.children)

    const gsap = this.$gsap

    const tl = gsap
      .timeline({ defaults: { ease: 'power1.inOut', duration: 0.4 } })
      .pause()

    tl.to(normalText.children, {
      yPercent: -110,
      stagger: {
        each: 0.01,
        from: 'start',
      },
    })

    tl.fromTo(
      hoverText.children,
      { yPercent: 120 },
      {
        yPercent: 0,
        stagger: {
          each: 0.01,
          from: 'start',
        },
      },
      '<'
    )

    item.addEventListener('mouseenter', () => tl.play())
    item.addEventListener('mouseleave', () => tl.reverse())
  },
}
</script>

<style lang="scss" scoped>
.item {
  display: inline-block;

  position: relative;

  overflow: hidden;
  cursor: pointer;

  &__line {
    display: inline-block;

    &--2 {
      position: absolute;
      left: 0;

      font-family: 'Boska', serif;
      font-size: 1.175rem;
      letter-spacing: 0.5px;
    }

    & > span {
      display: inline-block;
    }
  }
}
</style>

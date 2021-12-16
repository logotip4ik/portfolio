<template>
  <div ref="blob" class="blob" :style="{ ...getBlobStyles() }"></div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  props: {
    maxBottomPos: { type: Number, required: false, default: 95 },
    maxRightPos: { type: Number, required: false, default: 95 },
    delayToAppear: { type: Number, required: false, default: 0.5 },
  },
  data: () => ({
    blobSettings: [
      { name: 'height', value: { from: 15, to: 25, postfix: 'rem' } },
      { name: 'width', value: { from: 16, to: 25, postfix: 'rem' } },
      {
        name: 'borderTopLeftRadius',
        value: { from: 5, to: 15, postfix: 'rem' },
      },
      {
        name: 'borderTopRightRadius',
        value: { from: 5, to: 15, postfix: 'rem' },
      },
      {
        name: 'borderBottomLeftRadius',
        value: { from: 5, to: 15, postfix: 'rem' },
      },
      {
        name: 'borderBottomRightRadius',
        value: { from: 5, to: 15, postfix: 'rem' },
      },
    ],
  }),
  mounted() {
    const { blob } = this.$refs
    const blobStyles = {}

    for (const style of this.blobSettings)
      blobStyles[style.name] =
        `random(${style.value.from}, ${style.value.to})` + style.value.postfix

    blobStyles.bottom = `random(5, ${this.maxBottomPos})%`
    blobStyles.right = `random(5, ${this.maxRightPos})%`

    const tl = gsap.timeline({ delay: this.delayToAppear })
    tl.fromTo(blob, { opacity: 0 }, { opacity: 0.25, duration: 1 })
    tl.to(blob, { ...blobStyles, repeat: -1, repeatRefresh: true, duration: 5 })
  },
  methods: {
    getBlobStyles() {
      const stylesObj = {}

      // yeah, i know, everything could be done with reduce,
      // but try to read that reduce after 3 month of doing other project
      for (const style of this.blobSettings)
        stylesObj[style.name] =
          gsap.utils.random(style.value.from, style.value.to) +
          style.value.postfix

      stylesObj.bottom = gsap.utils.random(5, this.maxBottomPos) + '%'
      stylesObj.right = gsap.utils.random(5, this.maxRightPos) + '%'

      return stylesObj
    },
  },
}
</script>

<style>
.blob {
  position: absolute;
  z-index: -1;

  filter: blur(50px);

  background-color: var(--primary-color);
  opacity: 0;
}
</style>

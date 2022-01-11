<template>
  <div>
    <V-Header></V-Header>
    <main>
      <V-Work :works="works"></V-Work>
      <V-About :about="about"></V-About>
    </main>
    <div class="spacer"></div>
    <!-- TODO: add about section -->
    <!-- TODO: add contact section -->
    <!-- NOTE: projects, about and contact should me in a main tag, footer should be separate -->
    <!-- TODO: add footer section -->
    <!-- NOTE: footer section should have some sort of reveal animation as user is scrolling -->
    <!-- NOTE: footer ideas: https://www.rezo-zero.com -->
    <!-- TODO: add and see if floating particles will suite the site, like here: https://www.details.co.jp/ -->
    <!-- BUG: on computer, scrolling gsap is also somehow messing around cuz then the scroller is a bit buggy and jumpy -->
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $content }) {
    const works = await $content('works').fetch()
    const about = await $content('about').fetch()

    return { works, about }
  },
  beforeMount() {
    this.setVH()
    window.addEventListener('resize', this.setVH)
  },
  methods: {
    setVH() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    },
  },
}
</script>

<style>
.spacer {
  min-height: 200vh;
}
</style>

<template>
  <div>
    <V-Navbar></V-Navbar>
    <V-Header></V-Header>
    <main>
      <V-Work :works="works"></V-Work>
    </main>
    <div class="spacer"></div>
    <!-- TODO: add loader, also need to track the three js loaded state or somehow to wait for scene to load -->
    <!-- TODO: add project section -->
    <!-- NOTE: project section should probably scroll horizontally -->
    <!-- NOTE: project section IDK what and how, but it should be really cool to keep scrolling -->
    <!-- TODO: add about section -->
    <!-- TODO: add contact section -->
    <!-- NOTE: projects, about and contact should me in a main tag, footer should be separate -->
    <!-- TODO: add footer section -->
    <!-- NOTE: footer section should have some sort of reveal animation as user is scrolling -->
    <!-- NOTE: footer ideas: https://www.rezo-zero.com -->
    <!-- TODO: add and see if floating particles will suite the site, like here: https://www.details.co.jp/ -->
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ $content }) {
    const works = await $content('works').fetch()

    return { works }
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

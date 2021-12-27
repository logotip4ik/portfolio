<template>
  <div>
    <Loader />
    <Navbar />
    <ASScroll>
      <Nuxt />
    </ASScroll>
    <Pointer />

    <!-- TODO: add three js background -->
    <!-- TODO: thought what and how will be transitioning (possibly will use separate project for that)  -->
    <!-- TODO: try again with to do something locomotive scroll, it's smooth scroll is better in firefox compared to asscroll -->
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

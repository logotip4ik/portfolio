<template>
  <div>
    <Loader />
    <Navbar />
    <ASScroll>
      <Nuxt />
    </ASScroll>
    <Pointer />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

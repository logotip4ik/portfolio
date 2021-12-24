<template>
  <div>
    <Loader />
    <Navbar />
    <LocoScroll>
      <Nuxt />
    </LocoScroll>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

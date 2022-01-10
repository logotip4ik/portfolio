<template>
  <div>
    <V-Navbar></V-Navbar>
    <div class="scroller">
      <Nuxt></Nuxt>
    </div>
    <V-Loader></V-Loader>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style></style>

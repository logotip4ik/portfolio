<template>
  <div>
    <V-Navbar></V-Navbar>
    <V-Header></V-Header>
    <div class="spacer"></div>
    <!-- TODO: add project section -->
    <!-- NOTE: project section should probably scroll horizontally -->
    <!-- TODO: add about section -->
    <!-- TODO: add contact section -->
    <!-- NOTE: projects, about and contact should me in a main tag, footer should be separate -->
    <!-- TODO: add footer section -->
    <!-- NOTE: footer section should have some sort of reveal animation as user is scrolling -->
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style>
.spacer {
  min-height: 200vh;
}
</style>

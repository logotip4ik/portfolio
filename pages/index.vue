<template>
  <div>
    <V-Header></V-Header>
    <main>
      <V-Work></V-Work>
      <V-About></V-About>
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
}
</script>

<style>
.spacer {
  min-height: 200vh;
}
</style>

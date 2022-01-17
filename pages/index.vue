<template>
  <div role="presentation">
    <V-Header aria-label="content header"></V-Header>
    <main aria-label="main content">
      <V-Work></V-Work>
      <V-About></V-About>
      <V-Contact></V-Contact>
    </main>
    <!-- TODO: add contact section -->
    <!-- TODO: add footer section -->
    <!-- NOTE: footer section should have some sort of reveal animation as user is scrolling -->
    <!-- NOTE: footer ideas: https://www.rezo-zero.com -->
    <!-- TODO: add and see if floating particles will suite the site, like here: https://www.details.co.jp/ -->
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style></style>

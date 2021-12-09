<template>
  <div>
    <h1>Hello from projects route</h1>
    <pre>{{ projects }}</pre>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const projects = await $content('projects').fetch()

    return { projects }
  },
}
</script>

<style></style>

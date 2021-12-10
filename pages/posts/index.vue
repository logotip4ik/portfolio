<template>
  <div>
    <h1>Hello world from {{ $route.path }}</h1>

    <hr />

    <ul>
      <li v-for="post in posts" :key="post.slug">
        <NuxtLink :to="post.path">
          {{ post.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const posts = await $content('posts').fetch()

    return { posts }
  },
}
</script>

<style></style>

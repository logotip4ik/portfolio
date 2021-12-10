<template>
  <div class="main">
    <h1 ref="heading" class="main__heading">Posts</h1>

    <hr class="main__hr" />

    <ul class="">
      <li v-for="post in posts" :key="post.slug">
        <NuxtLink :to="post.path">
          {{ post.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  async asyncData({ $content }) {
    const posts = await $content('posts').fetch()

    return { posts }
  },
  mounted() {
    gsap.fromTo(this.$refs.heading, { y: 20, opacity: 0 }, { y: 0, opacity: 1 })
  },
}
</script>

<style lang="scss">
.main {
  &__heading {
    margin-bottom: 0.5rem;
  }

  &__hr {
    width: 100%;
    margin: 0 auto;
  }
}
</style>

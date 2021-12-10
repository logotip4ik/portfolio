<template>
  <div class="post">
    <h1>
      Hello from post with slug: <code>{{ $route.params }}</code>
    </h1>

    <!-- TODO: add table of contents (https://content.nuxtjs.org/snippets#table-of-contents) -->
    <!-- {{ post.toc }} -->

    <hr />

    <nuxt-content :document="post" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const post = await $content('posts', params.slug).fetch()

    return { post }
  },
}
</script>

<style lang="scss">
.post {
  padding: 4rem 4vw;

  .nuxt-content-container {
    font-size: calc(12px + 0.4vw);
    line-height: 1.65;

    // Code stylings
    .nuxt-content-highlight {
      position: relative;
    }

    code {
      font-family: 'IBM Plex Mono';
    }

    .filename {
      position: absolute;
      top: 0;
      right: 0;

      color: whitesmoke;

      padding: 0.2rem 0.75rem;
      border-radius: 0 0.3rem 0 0.3rem;

      background-color: hsla(0, 50%, 50%, 0.125);
    }

    // Heading links
    a[aria-hidden='true'] {
      margin-right: 0.5rem;
    }

    .icon.icon-link::before {
      content: '#';
    }
  }
}
</style>

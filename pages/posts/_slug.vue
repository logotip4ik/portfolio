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

    // blockquote
    --accent-color: hsla(var(--theme-color), 15%, 50%, 0.125);
    blockquote {
      background: hsla(var(--theme-color), 10%, 50%, 0.125);
      border-left: 10px solid var(--accent-color);
      margin: 1.5em 10px;
      padding: 0.5em 10px;
      quotes: '\201C''\201D''\2018''\2019';
    }
    blockquote::before {
      color: var(--accent-color);
      content: open-quote;
      font-size: 4em;
      line-height: 0.1em;
      margin-right: 0.25em;
      vertical-align: -0.4em;
    }
    blockquote p {
      display: inline;
    }

    // tables
    table {
      width: 100%;

      border-radius: 0.3rem;
      background-color: var(--accent-color);

      td,
      th {
        text-align: left;
        padding: 0.25rem 1rem;
      }
      th {
        border-bottom: 1px solid rgba($color: #ccc, $alpha: 0.125);
      }
      tbody tr:nth-child(even) {
        background-color: var(--accent-color);
      }
    }
  }
}
</style>

<template>
  <main class="project-main">
    <Markdown :use="$slots.default" />
  </main>
</template>

<style lang="scss">
.project-main {
  width: 100%;

  padding: 15rem 0 10rem;
}
</style>

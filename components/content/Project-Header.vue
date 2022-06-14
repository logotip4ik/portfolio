<template>
  <header class="project-header" data-scroll-section>
    <slot class="project-header__title" />

    <div class="project-header__info">
      <div class="project-header__info__links">
        <slot class="project-header__info__links__live" name="live" />
        <slot class="project-header__info__links__source" name="source" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.project-header {
  padding: 30vh clamp(1rem, 7vw, 10rem) 5vh;

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    margin-top: 2rem;

    &__links {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      flex-direction: column;

      text-align: right;

      margin-left: auto;
    }
  }
}
</style>

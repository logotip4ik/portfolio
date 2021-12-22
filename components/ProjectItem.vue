<template>
  <li class="project">
    <div class="project__content">
      <h3 class="project__content__title">LPNU StudRecruit</h3>
      <hr class="project__content__hr" />
      <ul class="project__content__desc-list">
        <li v-for="j in 5" :key="j" class="project__content__desc-list__item">
          Next.js,
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {}
</script>

<style lang="scss">
.project {
  margin-bottom: 1.5rem;

  &::marker {
    content: '/ ' counter(list-item) '  ';
    font-variant-numeric: diagonal-fractions;
  }

  &__content {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    position: relative;

    &__title {
      display: inline-block;
      font-size: calc(1.5rem + 0.33vw);
      font-weight: 500;
    }

    &__hr {
      display: inline-block;

      flex: 1;

      width: 100%;
      margin-left: 2rem;
      border-color: #fff;
    }

    &__desc-list {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      position: absolute;
      top: 60%;
      right: 0;

      padding: 0;
      list-style-type: none;

      &__item {
        display: inline-block;

        font-size: calc(0.75rem + 0.3vw);
        color: var(--ff-secondary-color);

        & + & {
          margin-left: 0.5rem;
        }
      }
    }
  }
}
</style>

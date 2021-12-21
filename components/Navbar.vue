<template>
  <nav class="navbar">
    <ul class="navbar__navigation">
      <li
        v-for="(link, key) in links"
        :key="key"
        class="navbar__navigation__item"
      >
        {{ link.label }}
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  data: () => ({
    links: [{ label: 'Projects' }, { label: 'About' }, { label: 'Contact' }],
  }),
}
</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  padding: 1rem var(--pd-x) 0;

  &__navigation {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    list-style-type: none;

    &__item + &__item {
      margin-left: 3vw;

      cursor: pointer;
    }
  }
}
</style>

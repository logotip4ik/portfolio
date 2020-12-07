<template>
  <footer>
    <h3>&copy;BogdanKostyuk</h3>
    <div class="icons">
      <font-awesome-icon
        @click="openURL('https://github.com/logotip4ik')"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
        size="lg"
        :icon="['fab', 'github']"
      ></font-awesome-icon>
    </div>
  </footer>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'Footer',
  setup() {
    const hovering = inject('hovering');

    function openURL(url) {
      window.open(url);
    }

    return { hovering, openURL };
  },
};
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  padding: 0.75rem 1rem;
  background: #18181e;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1.3rem;
    text-transform: uppercase;
    font-weight: 200;
    letter-spacing: 2px;
    // line-height: 1.4;
  }
}
</style>

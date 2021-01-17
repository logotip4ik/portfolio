<template>
  <footer>
    <div class="text">
      <h3>&copy;2019-{{ currYear }}</h3>
      <h2>BogdanKostyuk</h2>
    </div>
    <div class="icons">
      <font-awesome-icon
        @click="openURL('https://github.com/logotip4ik')"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
        size="2x"
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
    const openURL = inject('openURL');

    const currYear = new Date().getFullYear();

    return { hovering, openURL, currYear };
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

  .text {
    * {
      font-size: 1.4rem;
      text-transform: uppercase;
      font-weight: 200;
      letter-spacing: 2.75px;
      line-height: 1.15;
    }
    *:last-child {
      font-size: 1rem;
      letter-spacing: 1px;
    }
  }
}
</style>

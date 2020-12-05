<template>
  <section class="contact">
    <h2>Contact</h2>
    <h3>I will answer as soon as posible</h3>
    <form @submit.prevent></form>
  </section>
</template>

<script>
export default {
  name: 'Contact',
};
</script>

<style lang="scss" scoped>
.contact {
  min-height: 100vh;
  padding: 0.75rem 1rem;
  text-align: center;

  h2,
  h3 {
    line-height: 1.3;
  }

  h2 {
    font-size: 2rem;
  }
  h3 {
    color: rgb(90, 90, 90);
    font-size: 1.4rem;
    font-weight: 200;
  }
}
</style>

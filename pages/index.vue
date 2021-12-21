<template>
  <div>
    <Navbar />
    <header class="header">
      <h1 ref="headerTitle" class="header__title">
        <!-- eslint-disable -->
        <!-- <span
          v-for="(char, key) in headerTextChars"
          :key="key"
          :class="['header__title__char', ...char.classes]"
        >
          <span ref="headerTitleChar" v-html="char.content" />
        </span> -->
        <!-- eslint-enable -->

        Hello. <br />
        I am Frontend Developer<br />
        My name is <span class="bold">Bogdan Kostyuk</span>
      </h1>
    </header>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    // headerText: 'Hello.\nI am Frontend Developer,\nmy name is Bogdan Kostyuk',
  }),
  computed: {
    // headerTextChars() {
    //   const splittedHeaderText = this.headerText.split('')
    //   const chars = []
    //   for (let i = 0; i < splittedHeaderText.length; i++) {
    //     const char = { content: splittedHeaderText[i], classes: [] }
    //     if (char.content !== '\n' && char.content !== ' ')
    //       char.classes.push('animatable')
    //     if (char.content === '\n') char.content = '<br />'
    //     if (splittedHeaderText.length - i < 15) char.classes.push('bold')
    //     chars.push(char)
    //   }
    //   return chars
    // },
  },
  mounted() {
    // const gsap = this.$gsap
    // const { headerTitleChar } = this.$refs
    // const tl = gsap.timeline()
    // tl.fromTo(
    //   headerTitleChar,
    //   { yPercent: 100 },
    //   { yPercent: 0, stagger: 0.01 }
    // )
  },
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: flex-start;
  align-content: center;

  min-height: 80vh;

  padding: 0 var(--pd-x);

  &__title {
    margin: auto 0;

    font-size: clamp(1.5rem, 6vw, 4.5rem);
    font-weight: 300;

    .bold {
      font-weight: 500;
    }

    // &__char {
    //   overflow: hidden;

    //   &.bold {
    //     font-weight: 500;
    //   }

    //   &.animatable {
    //     display: inline-block;

    //     span {
    //       display: inline-block;
    //     }
    //   }
    // }
  }
}
</style>

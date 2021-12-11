<template>
  <smooth-scrollbar id="scroll-area">
    <Navbar />
    <Nuxt id="scroll-content" />
  </smooth-scrollbar>
</template>

<style>
#scroll-area.is-pc {
  width: 100%;
  height: 100vh;
}

#scroll-content.is-pc {
  width: 100%;
  height: max-content;
}
</style>

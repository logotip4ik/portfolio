<template>
  <div>
    <Navbar />
    <Nuxt id="content-element" />
  </div>
</template>

<style>
#__layout.is-pc {
  width: 100%;
  height: 100vh;
}
#content-element.is-pc {
  width: 100%;
  height: max-content;
}
</style>

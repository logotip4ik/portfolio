import Vue from 'vue'

export default () => {
  const emitFactory = (name, value) => () => window.$nuxt.$emit(name, value)

  Vue.directive('hoverable', {
    bind: (node) => {
      node.style.cursor = 'none'

      node.addEventListener('mouseenter', emitFactory('toggle-hovering'))
      node.addEventListener('mouseleave', emitFactory('toggle-hovering'))
    },
  })
}

import Vue from 'vue'

export default function (context) {
  const emitFactory = (name, value) => () => window.$nuxt.$emit(name, value)

  Vue.directive('hoverable', (node) => {
    node.style.cursor = 'none'

    node.addEventListener('mouseenter', emitFactory('toggle-hovering'))
    node.addEventListener('mouseleave', emitFactory('toggle-hovering'))
  })
}

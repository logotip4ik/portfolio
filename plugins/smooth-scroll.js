import Vue from 'vue'
import VueSmoothScrollbar from 'vue-smooth-scrollbar'

Vue.use(VueSmoothScrollbar, {
  renderByPixels: true,
  continuousScrolling: false,
  damping: 0.125,
})

const mixinName = '___never_guess_Mixin_name'

const toggleClassesFactory = (
  widthBreakPoint,
  classToToggle,
  ...elementsSelectors
) => {
  const elements = []
  for (const selector of elementsSelectors) {
    const element = document.querySelector(selector)
    if (element) elements.push(element)
  }

  return (windowWidth) => {
    if (windowWidth > widthBreakPoint) {
      for (const element of elements) element.classList.add(classToToggle)
    } else {
      for (const element of elements) element.classList.remove(classToToggle)
    }
  }
}

function registerListener() {
  Vue[mixinName] = true

  Vue.mixin({
    mounted() {
      const classesToggle = toggleClassesFactory(
        1100,
        'is-pc',
        '#scroll-content',
        '#scroll-area'
      )

      window.addEventListener('resize', () => classesToggle(window.innerWidth))
      classesToggle(window.innerWidth)
    },
  })
}

if (!Vue[mixinName]) registerListener()

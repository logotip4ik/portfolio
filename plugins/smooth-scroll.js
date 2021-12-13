import Vue from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const mixinName = '__never_guess_THis_name_smooth_scroll'

function main() {
  window[mixinName] = true

  const smoothToggle = smoothToggleFactory(1000, '#__nuxt', '#__layout')
  gsap.registerPlugin(ScrollTrigger)

  Vue.mixin({
    watch: {
      $route() {
        setTimeout(() => {
          smoothToggle(window.innerWidth)

          const scrollAreaEl = document.querySelector('#__layout')
          const height = scrollAreaEl.clientHeight

          document.body.style.height = `${height}px`
        }, 500)
      },
    },
  })

  window.addEventListener('DOMContentLoaded', () =>
    smoothToggle(window.innerWidth)
  )
  window.addEventListener('resize', () => smoothToggle(window.innerWidth))
}

if (!window[mixinName]) main()

function registerGsapSmoothScroll(scrollbarInstance, selectors) {
  const elements = selectors.map((selector) => document.querySelector(selector))
  elements.forEach((el) => el.classList.add('is-pc'))

  const height = elements[1].clientHeight
  document.body.style.height = `${height}px`

  scrollbarInstance.enabled = true
  scrollbarInstance.current = gsap.to(elements[1], {
    y: -(height - document.documentElement.clientHeight),
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.75,
    },
  })
}

function unregisterGsapSmoothScroll(scrollbarInstance, selectors) {
  const elements = selectors.map((selector) => document.querySelector(selector))

  elements.forEach((el) => el.classList.remove('is-pc'))
  document.body.style.height = `auto`

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

  scrollbarInstance.current?.kill()
  scrollbarInstance.current = null
  scrollbarInstance.enabled = false
}

function smoothToggleFactory(widthBreakpoint, ...selectors) {
  const scrollbarInstance = { current: null }

  return (width) => {
    if (scrollbarInstance.current) gsap.to(selectors[1], { y: 0, duration: 0 })

    if (width > widthBreakpoint) {
      const scrollAreaEl = document.querySelector(selectors[1])
      const height = scrollAreaEl.clientHeight

      document.body.style.height = `${height}px`

      registerGsapSmoothScroll(scrollbarInstance, selectors)
    } else if (width < widthBreakpoint && scrollbarInstance.current)
      unregisterGsapSmoothScroll(scrollbarInstance, selectors)
  }
}

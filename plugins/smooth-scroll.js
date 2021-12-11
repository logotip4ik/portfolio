// import Vue from 'vue'
import Scrollbar from 'smooth-scrollbar'

const mixinName = '___never_guess_Mixin_name'
let scrollbarInstance

function registerScrollbar() {
  const containerEl = document.querySelector('#__layout')
  const contentEl = document.querySelector('#content-element')

  containerEl.classList.add('is-pc')
  contentEl.classList.add('is-pc')

  scrollbarInstance = Scrollbar.init(containerEl, {
    damping: 0.05,
    continuousScrolling: false,
    renderByPixels: false,
  })
}

function unregisterScrollbar() {
  const containerEl = document.querySelector('#__layout')
  const contentEl = document.querySelector('#content-element')

  containerEl.classList.remove('is-pc')
  contentEl.classList.remove('is-pc')

  if (!scrollbarInstance) return

  scrollbarInstance.destroy()
  scrollbarInstance = null
}

function toggleScrollbarFactory(breakpointWidth) {
  return () =>
    window.innerWidth > breakpointWidth
      ? registerScrollbar()
      : unregisterScrollbar()
}

function main() {
  window[mixinName] = true

  const toggleScrollbar = toggleScrollbarFactory(1000)
  toggleScrollbar()

  window.addEventListener('resize', toggleScrollbar)
}

if (!window[mixinName]) document.addEventListener('DOMContentLoaded', main)

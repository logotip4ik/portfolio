import Vue from 'vue'

import ASScroll from '@ashthornton/asscroll'

const install = (instance) => {
  instance.prototype.ASScroll = ASScroll
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
  if (install.installed) {
    install.installed = false
  }
}

Vue.use(install)

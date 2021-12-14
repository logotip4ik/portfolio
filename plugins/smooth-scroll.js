import Vue from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const mixinName = '__never_guess_THis_name_smooth_scroll'

gsap.registerPlugin(ScrollTrigger)

function registerMixin() {
  Vue[mixinName] = true
  Vue.mixin({
    data: () => ({
      smoothScroll: null,
      calculateHeight: calculateHeightFactory('#__layout'),
    }),
    watch: {
      $route() {
        setTimeout(() => this.calculateHeight(this.smoothScroll), 500)
      },
    },
    mounted() {
      const widthBreakpoint = 1000
      const isPcClassToggle = classToggleFactory(
        'is-pc',
        widthBreakpoint,
        '#__nuxt',
        '#__layout'
      )

      isPcClassToggle(window.innerWidth)

      if (window.innerWidth > widthBreakpoint)
        this.smoothScroll = createSmoothScroll('#__layout', '#__nuxt', 0.75)

      window.addEventListener('resize', () => {
        if (window.innerWidth < widthBreakpoint) {
          this.smoothScroll && this.smoothScroll.instance.kill()
          this.smoothScroll = null
        } else if (window.innerWidth > widthBreakpoint && !this.smoothScroll)
          this.smoothScroll = createSmoothScroll('#__layout', '#__nuxt', 0.75)

        isPcClassToggle(window.innerWidth)
        this.calculateHeight(this.smoothScroll)
      })
    },
  })
}

if (!Vue[mixinName]) registerMixin()

function calculateHeightFactory(selector) {
  return (smoothScrollInstance) => {
    const el = document.querySelector(selector)

    if (smoothScrollInstance)
      document.body.style.height = el.clientHeight + 'px'
    else document.body.style.height = 'auto'
  }
}

function classToggleFactory(classToToggle, breakpoint, ...selectors) {
  const elements = selectors.map((selector) => document.querySelector(selector))

  return (width) => {
    if (width > breakpoint)
      elements.forEach((el) => el.classList.add(classToToggle))
    else elements.forEach((el) => el.classList.remove(classToToggle))
  }
}

function createSmoothScroll(content, viewport, smoothness = 1) {
  content = gsap.utils.toArray(content)[0]

  const getProp = gsap.getProperty(content)
  const setProp = gsap.quickSetter(content, 'y', 'px')
  const setScroll = ScrollTrigger.getScrollFunc(window)
  const removeScroll = () => (content.style.overflow = 'visible')
  const killScrub = (trigger) => {
    const scrub = trigger.getTween
      ? trigger.getTween()
      : gsap.getTweensOf(trigger.animation)[0] // getTween() was added in 3.6.2
    scrub && scrub.kill()
    trigger.animation.progress(trigger.progress)
  }
  let height
  let isProxyScrolling

  function refreshHeight() {
    height = content.clientHeight
    content.style.overflow = 'visible'
    document.body.style.height = height + 'px'
    return height - document.documentElement.clientHeight
  }

  ScrollTrigger.addEventListener('refresh', () => {
    removeScroll()
    requestAnimationFrame(removeScroll)
  })
  ScrollTrigger.defaults({ scroller: content })

  ScrollTrigger.scrollerProxy(content, {
    scrollTop(value) {
      if (arguments.length) {
        isProxyScrolling = true // otherwise, if snapping was applied (or anything that attempted to SET the scroll proxy's scroll position), we'd set the scroll here which would then (on the next tick) update the content tween/ScrollTrigger which would try to smoothly animate to that new value, thus the scrub tween would impede the progress. So we use this flag to respond accordingly in the ScrollTrigger's onUpdate and effectively force the scrub to its end immediately.
        setProp(-value)
        setScroll(value)
        return
      }
      return -getProp('y')
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
  })

  return {
    killScrub,
    refreshHeight,
    instance: ScrollTrigger.create({
      animation: gsap.fromTo(
        content,
        { y: 0 },
        {
          y: () => document.documentElement.clientHeight - height,
          ease: 'none',
          onUpdate: ScrollTrigger.update,
        }
      ),
      scroller: window,
      invalidateOnRefresh: true,
      start: 0,
      end: refreshHeight,
      refreshPriority: -999,
      scrub: smoothness,
      onUpdate: (self) => {
        if (isProxyScrolling) {
          killScrub(self)
          isProxyScrolling = false
        }
      },
      onRefresh: killScrub, // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
    }),
  }
}

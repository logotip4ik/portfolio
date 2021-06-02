<template>
  <VNavbar @scroll-to="scroll"></VNavbar>
  <div id="laxy-scroll">
    <VHeading :isMobile="isMobile" @scroll-to="scroll"></VHeading>
    <VProjects></VProjects>
    <VAboutMe></VAboutMe>
    <VContact @scroll-to="scroll" @success="showPopup"></VContact>
    <VFooter></VFooter>
  </div>
  <div ref="pointer" class="pointer"></div>
  <transition name="slide-left" @enter="playSoundTransition">
    <VPopup v-if="showingPopup" @close="showingPopup = false" :success="popupSuccess"></VPopup>
  </transition>
</template>

<script>
// eslint-disable-next-line
import { onMounted, provide, ref, watch } from 'vue';
import VueScrollTo from 'vue-scrollto';
import gsap from 'gsap';
import luxy from 'luxy.js';

import VHeading from './components/V-Heading.vue';
import VNavbar from './components/V-Navbar.vue';
import VProjects from './components/V-Projects.vue';
import VAboutMe from './components/V-AboutMe.vue';
import VContact from './components/V-Contact.vue';
import VFooter from './components/V-Footer.vue';
import VPopup from './components/V-Popup.vue';

import soundFileClick from './assets/sounds/ui_tap-variant-03.ogg';
import soundFileSuccess from './assets/sounds/notification_decorative-02.ogg';
import soundFileError from './assets/sounds/alert_error-01.ogg';

export default {
  name: 'App',
  setup() {
    const pointer = ref(null);

    // This is used for detecting mobile
    let isMobile = false;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ) {
      isMobile = true;
    }

    const showWave = ref(false);
    const soundClick = new Audio(soundFileClick);
    const soundSuccess = new Audio(soundFileSuccess);
    const soundError = new Audio(soundFileError);

    const hovering = ref(false);
    provide('hovering', hovering);
    watch(hovering, () => pointer.value.classList.toggle('pointer--active'));

    // LOADER stuff
    let initialLoading = true;
    const loading = ref(true);
    provide('loading', loading);
    watch(loading, () => {
      if (CSS.supports('clip-path: inset(100% 0 100% 0)')) {
        gsap.to('#loader', {
          delay: initialLoading ? 0.3 : 0,
          clipPath: loading.value ? 'inset(100% 0 100% 0)' : 'inset(100% 0 0 0)',
          ease: 'linear',
          onComplete: () => {
            initialLoading = false;
          },
        });
      } else {
        gsap.set('#loader', { display: loading.value ? 'flex' : 'none' });
      }
    });

    const showingPopup = ref(false);
    const popupSuccess = ref(true);

    function openURL(url) {
      window.open(url);
    }
    provide('openURL', openURL);

    /**
     * @param {String} target
     * @param {Number} duration
     */
    function scroll(target, duration = 1000) {
      VueScrollTo.scrollTo(target !== 'top' ? `.${target}` : 'body', duration, {
        offset: -60,
        cancelable: true,
        easing: [0.25, 0, 0.25, 1],
      });
    }

    function interact() {
      if (soundClick.readyState) soundClick.play();
      if ('vibrate' in window.navigator) window.navigator.vibrate(10);
    }
    provide('interact', interact);

    function showPopup(success = true) {
      popupSuccess.value = success;
      showingPopup.value = true;
    }
    window.showPopup = showPopup;

    function playSoundTransition() {
      if (popupSuccess.value) return soundSuccess.play();
      return soundError.play();
    }

    function checkForURLParams() {
      const params = new URLSearchParams(window.location.search);
      if (params.has('q')) scroll(params.get('q'));
    }

    let timeout;

    function setupPointer() {
      if (isMobile) return;
      gsap.set(pointer.value, { xPercent: -50, yPercent: -50 });

      window.addEventListener('mousemove', (e) => {
        gsap.to(pointer.value, 0.2, { x: e.clientX, y: e.clientY, opacity: 1 });
        pointer.value.classList.remove('pointer--animate');
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          pointer.value.classList.add('pointer--animate');
        }, 7000);
      });
      window.addEventListener('scroll', () => {
        pointer.value.classList.remove('pointer--animate');
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          pointer.value.classList.add('pointer--animate');
        }, 7000);
      });
    }
    function setupLuxy() {
      if (isMobile) return;
      luxy.init({
        wrapper: '#laxy-scroll',
        wrapperSpeed: 0.045,
      });
    }

    function sayHay() {
      console.log(
        '▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\n██ ▄▄▀█▀▄▄▀█ ▄▄▄█ ▄▀█ ▄▄▀█ ▄▄▀████ █▀▄█▀▄▄▀█ ▄▄█▄ ▄█ ██ █ ██ █ █▀█\n██ ▄▄▀█ ██ █ █▄▀█ █ █ ▀▀ █ ██ ████ ▄▀██ ██ █▄▄▀██ ██ ▀▀ █ ██ █ ▄▀█\n██ ▀▀ ██▄▄██▄▄▄▄█▄▄██▄██▄█▄██▄████ ██ ██▄▄██▄▄▄██▄██▀▀▀▄██▄▄▄█▄█▄█\n▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀',
      );
      console.log(
        '%c Did you forget something here?',
        'font-size: 16px;font-weight: 600; color: #65C6B5; border-radius: 5px; background-color: #333; padding: 0.25rem;',
      );
    }

    onMounted(() => {
      loading.value = false;
      sayHay();
      setTimeout(() => checkForURLParams(), 500);
      setupPointer();
      setupLuxy();
    });

    return {
      scroll,
      loading,
      isMobile,
      popupSuccess,
      showingPopup,
      showWave,
      pointer,
      showPopup,
      playSoundTransition,
    };
  },
  components: {
    VNavbar,
    VHeading,
    VProjects,
    VAboutMe,
    VContact,
    VFooter,
    VPopup,
  },
};
</script>

<style lang="scss">
/* poppins-200 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  src: local(''), url('./assets/fonts/poppins-v15-latin-200.woff2') format('woff2'),
    url('./assets/fonts/poppins-v15-latin-200.woff') format('woff');
}

/* poppins-regular - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  src: local(''), url('./assets/fonts/poppins-v15-latin-regular.woff2') format('woff2'),
    url('./assets/fonts/poppins-v15-latin-regular.woff') format('woff');
}
/* poppins-600 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  src: local(''), url('./assets/fonts/poppins-v15-latin-500.woff2') format('woff2'),
    url('./assets/fonts/poppins-v15-latin-500.woff') format('woff');
}

*,
:before,
:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scrollbar-width: none;
  -webkit-tap-highlight-color: transparent;
}
::-webkit-scrollbar {
  display: none;
}
h2 {
  font-weight: 500;
}
#app {
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  scroll-behavior: smooth;
  // cursor: none;

  *::selection {
    background-color: rgba($color: #79ffe1, $alpha: 0.7);
  }
}
.pointer {
  position: fixed;
  opacity: 0;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border: 0 solid transparent;
  border-radius: 50%;
  background-color: rgba($color: #79ffe1, $alpha: 0.7);
  backdrop-filter: blur(1px);
  z-index: 9999;
  user-select: none;
  pointer-events: none;
  transition: width 200ms cubic-bezier(0.34, 1.56, 0.64, 1),
    height 200ms cubic-bezier(0.34, 1.56, 0.64, 1),
    background-color 200ms cubic-bezier(0.34, 1.56, 0.64, 1),
    border 200ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  justify-content: center;
  align-items: center;

  &--animate {
    transition-duration: 1s;
    height: 250px !important;
    width: 250px !important;
    border: none !important;
    filter: invert(1);
    background-color: transparent;
  }

  &--active {
    width: 50px;
    height: 50px;
    background-color: rgba($color: #79ffe1, $alpha: 0.2);
    border: 2px solid #79ffe1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-left-enter-active {
  transition: transform 0.8s cubic-bezier(0.61, 1, 0.88, 1);
}
.slide-left-leave-active {
  transition: transform 0.8s cubic-bezier(0.12, 0, 0.39, 0);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(120%);
}
</style>

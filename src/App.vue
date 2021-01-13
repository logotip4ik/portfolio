<template>
  <VNavbar @scroll-to="scroll"></VNavbar>
  <div id="laxy-scroll">
    <div class="top"></div>
    <VHeading :isMobile="isMobile" @scroll-to="scroll"></VHeading>
    <VProjects></VProjects>
    <VAboutMe></VAboutMe>
    <VContact @scroll-to="scroll" @success="showPopup"></VContact>
    <VFooter></VFooter>
  </div>
  <div ref="pointer" class="pointer"><i class="pointer--wave"></i></div>
  <transition
    mode="out-in"
    @enter="enterAnim"
    @leave="leaveAnim"
    :duration="{ enter: 500, leave: 500 }"
  >
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

export default {
  name: 'App',
  setup() {
    const pointer = ref(null);

    // This is used for detecting mobile
    let isMobile = false;
    // prettier-ignore
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent,
      )
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
        navigator.userAgent.substr(0, 4),
      )
    ) {
      isMobile = true;
    }

    const hovering = ref(false);
    provide('hovering', hovering);
    watch(hovering, () => pointer.value.classList.toggle('active'));

    const loading = ref(true);
    provide('loading', loading);
    watch(loading, () => {
      gsap.to('#loader', {
        clipPath: loading.value ? 'inset(100% 0 100% 0)' : 'inset(100% 0 0 0)',
      });
    });

    const showingPopup = ref(false);
    const popupSuccess = ref(true);

    /**
     * @param {String} target
     * @param {Number} duration
     */
    function scroll(target, duration = 1000) {
      VueScrollTo.scrollTo(`.${target}`, duration, {
        offset: -60,
        cancelable: true,
        easing: [0.25, 0, 0.25, 1],
      });
    }

    function showPopup(success = true) {
      showingPopup.value = true;
      popupSuccess.value = success;
      setTimeout(() => {
        showingPopup.value = false;
      }, 2500);
    }

    function enterAnim(el) {
      gsap.from(el, {
        y: -300,
        duration: 0.5,
      });
    }
    function leaveAnim(el) {
      gsap.to(el, {
        y: -300,
        duration: 0.5,
        ease: 'power1.in',
      });
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
        pointer.value.children[0].classList.remove('animate');
        clearTimeout(timeout);
        timeout = setTimeout(() => pointer.value.children[0].classList.add('animate'), 7000);
      });
      window.addEventListener('scroll', () => {
        pointer.value.children[0].classList.remove('animate');
        clearTimeout(timeout);
        timeout = setTimeout(() => pointer.value.children[0].classList.add('animate'), 7000);
      });
    }
    function setupLuxy() {
      luxy.init({
        wrapper: '#laxy-scroll',
        wrapperSpeed: 0.085,
      });
    }

    function sayHay() {
      console.log(
        '▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\n██ ▄▄▀█▀▄▄▀█ ▄▄▄█ ▄▀█ ▄▄▀█ ▄▄▀████ █▀▄█▀▄▄▀█ ▄▄█▄ ▄█ ██ █ ██ █ █▀\n██ ▄▄▀█ ██ █ █▄▀█ █ █ ▀▀ █ ██ ████ ▄▀██ ██ █▄▄▀██ ██ ▀▀ █ ██ █ ▄▀\n██ ▀▀ ██▄▄██▄▄▄▄█▄▄██▄██▄█▄██▄████ ██ ██▄▄██▄▄▄██▄██▀▀▀▄██▄▄▄█▄█▄\n▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀',
      );
      console.log(
        '%c Did you forget something here?',
        'font-size: 16px; color: #65C6B5; border-radius: 5px; background-color: #333',
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
      pointer,
      showPopup,
      enterAnim,
      leaveAnim,
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
  src: local('Poppins'), url('./assets/fonts/poppins-v15-latin-200.woff2') format('woff2'),
    url('./assets/fonts/poppins-v15-latin-200.woff') format('woff');
}

/* poppins-regular - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  src: local('Poppins'), url('./assets/fonts/poppins-v15-latin-regular.woff2') format('woff2'),
    url('./assets/fonts/poppins-v15-latin-regular.woff') format('woff');
}

*,
:before,
:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
    border 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    width: 50px;
    height: 50px;
    background-color: rgba($color: #79ffe1, $alpha: 0.2);
    border: 2px solid #79ffe1;
  }
  &--wave {
    width: 20px;
    height: 20px;
    background-color: rgba($color: #79ffe1, $alpha: 0.7);
    opacity: 0;
    border-radius: 50%;
    transition: transform 200ms linear;

    &.animate {
      animation: pulse 3s infinite;
      animation-delay: 1;
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: scale(7);
    opacity: 0;
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
</style>

import { createApp } from 'vue';
import {
  faCss3,
  faGit,
  faGithub,
  faHtml5,
  faJs,
  faLinux,
  faPython,
  faVuejs,
  faWindows,
} from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';

library.add(
  faPython,
  faCss3,
  faJs,
  faHtml5,
  faGit,
  faGithub,
  faWindows,
  faLinux,
  faVuejs,
  faPaperPlane,
);

createApp(App)
  .directive('click-outside', {
    beforeMount(el, binding) {
      // eslint-disable-next-line
      el.clickOutsideEvent = (event) => {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event, el);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
      document.body.removeEventListener('click', el.clickOutsideEvent);
    },
  })
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app');

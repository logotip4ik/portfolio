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
  faReact,
  faWindows,
} from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import VueClickAway from 'vue3-click-away';
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
  faReact,
  faPaperPlane,
);

createApp(App)
  .use(VueClickAway)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app');

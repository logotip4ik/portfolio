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
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app');

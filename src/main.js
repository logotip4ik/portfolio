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
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import './registerServiceWorker';

library.add(faPython, faCss3, faJs, faHtml5, faGit, faGithub, faWindows, faLinux, faVuejs);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');

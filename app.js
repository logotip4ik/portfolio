const { ref, onMounted } = Vue;

const vm = Vue.createApp({
  setup() {
    const line1 = ref(null);
    const line2 = ref(null);
    const line3 = ref(null);
    const unleash = ref(null);
    const logoName = ref(null);
    const logoDesc = ref(null);
    const logoButton = ref(null);
    const submitBtn = ref(null);
    const warningBreadcrumb = ref(null);
    const successBreadcrumb = ref(null);

    const falseData = ref([
      {
        name: 'Color Game',
        img: './img/ColorGameLogo.png',
        desc:
          "This is simple game in web. You need to guess color by it's hex.",
        techUsed: [
          { id: Math.random() * 100, content: 'Javascript' },
          { id: Math.random() * 100, content: 'Vue' },
          { id: Math.random() * 100, content: 'Vuetify' },
          { id: Math.random() * 100, content: 'IndexDB' },
        ],
        source: 'https://github.com/logotip4ik/ColorGame',
        live: 'https://color-game-virid.vercel.app/',
      },
      {
        name: 'My journal',
        img: './img/MyJournalLogo.png',
        desc: 'Simple Vue project with index db for logging my homework.',
        techUsed: [
          { id: Math.random() * 100, content: 'Javascript' },
          { id: Math.random() * 100, content: 'Vue' },
          { id: Math.random() * 100, content: 'Vuetify' },
          { id: Math.random() * 100, content: 'IndexDB' },
        ],
        source: 'https://github.com/logotip4ik/My-journal',
        live: 'https://my-journal.vercel.app/',
      },
      {
        name: 'Todo Web App',
        img: './img/TodoWebAppLogo.png',
        desc: 'Your todos in browser. Synced beetween all devices.',
        techUsed: [
          { id: Math.random() * 100, content: 'Javascript' },
          { id: Math.random() * 100, content: 'NodeJS' },
          { id: Math.random() * 100, content: 'Vue' },
          { id: Math.random() * 100, content: 'BootstrapVue' },
          { id: Math.random() * 100, content: 'Feathers.js' },
        ],
        source: 'https://github.com/logotip4ik/TodoWebApp',
        live: 'https://todo-web-app.vercel.app',
      },
      {
        name: 'Pixel Drawer',
        img: './img/PixelDrawerLogo.png',
        desc: 'YWebsite were you can draw your staff in pixel theme.',
        techUsed: [
          { id: Math.random() * 100, content: 'Javascript' },
          { id: Math.random() * 100, content: 'Vue' },
          { id: Math.random() * 100, content: 'Vuetify' },
        ],
        source: 'https://github.com/logotip4ik/Pixel-Drawer',
        live: 'https://pixel-drawer.vercel.app',
      },
    ]);

    const loading = ref(true);
    const showMenu = ref(false);
    const errorText = ref('');
    const name = ref('');
    const email = ref('');
    const message = ref('');

    const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;

    let warningBreadcrumbTL;
    let successBreadcrumbTL;

    onMounted(() => {
      loading.value = false;
      warningBreadcrumbTL = gsap
        .timeline()
        .to(warningBreadcrumb.value, {
          y: -70,
        })
        .pause();
      successBreadcrumbTL = gsap
        .timeline()
        .to(successBreadcrumb.value, {
          y: 120,
          delay: 1.5,
        })
        .pause();
      gsap
        .timeline()
        .from(logoButton.value, {
          y: -100,
          // rotateZ: 100,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(2)',
          delay: 0.5,
        })
        .from(logoDesc.value, {
          y: -100,
          opacity: 0,
          ease: 'back.out(2)',
          duration: 0.8,
        })
        .from(logoName.value, {
          y: -100,
          opacity: 0,
          ease: 'back.out(2)',
          duration: 0.8,
        });
    });

    const openURL = (url) => {
      window.open(url);
    };

    const scroll = (target, time = 1000) => {
      VueScrollTo.scrollTo(target, time);
      if (showMenu.value) toggleMenu();
    };

    const hover = (ev, back = false) => {
      gsap.to(ev.target, {
        x: back ? 0 : -10,
        duration: 0.2,
      });
    };

    const showError = (error) => {
      errorText.value = error;
      if (!warningBreadcrumbTL.isActive()) {
        warningBreadcrumbTL.play();
        setTimeout(() => warningBreadcrumbTL.reverse(), 2500);
      }
    };

    const submit = async () => {
      if (!name.value && !email.value && !message.value) {
        showError('Fill all fields!');
        return;
      } else if (!email.value.match(reEmail)) {
        showError('Email is not Valid!');
        return;
      } else if (!name.value) {
        showError('Fill in Your Name');
        return;
      } else if (!email.value) {
        showError('Fill in Your Email');
        return;
      } else if (!message.value) {
        showError('Fill in Your Message');
        return;
      }
      loading.value = true;
      const res = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          message: message.value,
        }),
      });
      if (res.ok) {
        scroll('#top', 1);
        successBreadcrumbTL.play();
        setTimeout(() => successBreadcrumbTL.reverse(), 3500);
      } else {
        const { error } = await res.json();
        showError(error);
      }
      loading.value = false;
    };

    const toggleMenu = () => {
      showMenu.value = !showMenu.value;
      gsap.to(line1.value, {
        duration: 0.2,
        y: showMenu.value ? 8 : 0,
        rotate: showMenu.value ? 45 : 0,
      });
      gsap.to(line2.value, {
        duration: 0.2,
        ease: 'power4.inOut',
        opacity: showMenu.value ? 0 : 1,
      });
      gsap.to(line3.value, {
        duration: 0.2,
        y: showMenu.value ? -8 : 0,
        rotate: showMenu.value ? -45 : 0,
      });
      gsap.to(unleash.value, {
        duration: 0.7,
        ease: 'power3.inOut',
        y: showMenu.value ? 5 : -80,
      });
    };

    return {
      openURL,
      loading,
      showMenu,
      toggleMenu,
      unleash,
      falseData,
      line1,
      line2,
      line3,
      scroll,
      warningBreadcrumb,
      successBreadcrumb,
      logoName,
      logoDesc,
      logoButton,
      submitBtn,
      name,
      errorText,
      email,
      hover,
      message,
      submit,
    };
  },
});

vm.mount('#root');

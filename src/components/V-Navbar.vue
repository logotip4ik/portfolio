<template>
  <nav ref="navbar">
    <h1 @click="scroll('top')" @mouseover="hovering = true" @mouseleave="hovering = false">
      BogdanKostyuk
    </h1>
    <ul class="routing">
      <li
        v-for="(item, idx) in links"
        :key="idx"
        @click="scroll(item.emits)"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="burger" @click="toggleNav">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <ul class="navigation">
      <li
        v-for="(item, idx) in links"
        :key="idx"
        @click="scroll(item.emits, true)"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
      >
        {{ item.name }}
      </li>
    </ul>
  </nav>
</template>

<script>
import { inject, ref } from 'vue';

export default {
  name: 'Navbar',
  setup(_, { emit }) {
    const navbar = ref(null);

    const toggleNav = () => {
      navbar.value.classList.toggle('show-menu');
    };
    const scroll = (target, isOpenNav = false) => {
      emit('scroll-to', target);
      if (isOpenNav) toggleNav();
    };

    const hovering = inject('hovering');

    const links = [
      {
        name: 'Projects',
        emits: 'projects',
      },
      {
        name: 'About Me',
        emits: 'about-me',
      },
      {
        name: 'Contact',
        emits: 'contact',
      },
    ];

    return {
      hovering,
      links,
      navbar,
      scroll,
      toggleNav,
    };
  },
  emits: ['scroll-to'],
};
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  background: #18181e;
  color: whitesmoke;
  padding: 0.85rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.3);
  z-index: 10;
  // height: 76px;
  position: fixed;

  h1 {
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 200;
    letter-spacing: 2px;
  }

  .routing {
    display: flex;
    list-style-type: none;

    li:nth-child(2) {
      margin: 0 2rem;
    }

    &:hover {
      color: #9b9b9b;
    }
  }
  .line {
    background: whitesmoke;
  }
  &:hover .line {
    background: #9b9b9b;
  }

  &.show-menu > .burger {
    .line:first-child {
      transform: translateY(10px) rotate(45deg);
    }
    .line:nth-child(2) {
      background: transparent;
    }
    .line:last-child {
      transform: translateY(-9px) rotate(-45deg);
    }
  }
  &.show-menu > .navigation {
    transform: translateY(115px);
  }
}
li {
  cursor: pointer;
  padding: 0.75rem;
  transition: color 150ms ease-out;
  &:hover {
    color: white;
  }
}
.burger {
  width: 30px;
  height: 22px;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  &:hover > .line {
    background: whitesmoke;
  }

  .line {
    transition: background 150ms ease-out, transform 200ms ease-in-out;
    width: 100%;
    height: 3px;
    border-radius: 0.25rem;
  }
}
.navigation {
  transform: translateY(-15rem);
  position: absolute;
  left: 0;
  background: #18181e;
  display: none;
  justify-content: flex-start;
  width: 100%;
  flex-direction: column;
  color: white;
  padding: 0.75rem;
  transition: transform 500ms ease-in-out;
  list-style-type: none;
  z-index: 10;

  &:hover {
    color: #9b9b9b;
  }
}

@media screen and (max-width: 720px) {
  nav > .routing {
    display: none;
  }
  .navigation {
    display: flex;
  }
  .burger {
    display: flex;
  }
}
</style>

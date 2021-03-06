<template>
  <nav ref="navbar" v-click-away="handleClickOutside">
    <h1
      @click="scroll('top', true), interact()"
      @mouseover="hovering = true"
      @mouseleave="hovering = false"
    >
      BogdanKostyuk
    </h1>
    <ul class="routing">
      <li
        v-for="(item, idx) in links"
        :key="idx"
        @click="scroll(item.emits), interact()"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
      >
        {{ item.name }}
      </li>
    </ul>
    <div
      :class="{ burger: true, 'burger--active': showingNavigation }"
      @click="toggleNav(), interact()"
      @mouseover="hovering = true"
      @mouseleave="hovering = false"
    >
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <transition name="slide" mode="out-in">
      <ul class="navigation" v-show="showingNavigation">
        <li
          v-for="(item, idx) in links"
          :key="idx"
          @click="scroll(item.emits, true), interact()"
          @mouseover="hovering = true"
          @mouseleave="hovering = false"
        >
          {{ item.name }}
        </li>
      </ul>
    </transition>
  </nav>
</template>

<script>
import { inject, ref } from 'vue';

export default {
  name: 'Navbar',
  setup(_, { emit }) {
    const navbar = ref(null);

    const showingNavigation = ref(false);
    const triggerClickAway = ref(false);

    const hovering = inject('hovering');
    const interact = inject('interact');

    function toggleNav() {
      showingNavigation.value = !showingNavigation.value;
      setTimeout(() => {
        triggerClickAway.value = !triggerClickAway.value;
      }, 500);
    }
    function handleClickOutside() {
      if (triggerClickAway.value === false) return;
      showingNavigation.value = false;
      triggerClickAway.value = false;
    }
    function scroll(target, isOpenNav = false) {
      emit('scroll-to', target);
      if (isOpenNav) {
        showingNavigation.value = false;
        triggerClickAway.value = false;
      }
    }

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
      showingNavigation,
      hovering,
      links,
      navbar,
      scroll,
      toggleNav,
      handleClickOutside,
      interact,
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
  // height: 76px;
  position: fixed;
  z-index: 9999;

  h1 {
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 200;
    letter-spacing: 2px;
    position: relative;
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

  &--active {
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
}
.navigation {
  position: absolute;
  left: 0;
  top: 100%;
  background: #18181e;
  display: none;
  justify-content: flex-start;
  width: 100%;
  flex-direction: column;
  color: white;
  padding: 0.75rem;
  list-style-type: none;
  border-top: 2px solid #373746;

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

.slide-enter-active,
.slide-leave-active {
  transition: transform 500ms cubic-bezier(0.37, 0, 0.63, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-15rem);
}
</style>

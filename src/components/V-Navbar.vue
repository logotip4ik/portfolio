<template>
  <nav>
    <h1>BogdanKostyuk</h1>
    <div class="routing">
      <p>Projects</p>
      <p>About Me</p>
      <p>Contact</p>
    </div>
    <div class="burger" ref="burger" @click="showNavigation">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </nav>
  <div class="navigation" ref="navigation">
    <p>Projects</p>
    <p>About Me</p>
    <p>Contact</p>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Navbar',
  setup() {
    const burger = ref(null);
    const navigation = ref(null);

    const showNavigation = () => {
      burger.value.classList.toggle('close');
      navigation.value.classList.toggle('show');
    };

    return {
      burger,
      navigation,
      showNavigation,
    };
  },
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
  box-shadow: 0 10px 10px rgba($color: #000000, $alpha: 0.3);

  h1 {
    text-transform: uppercase;
    font-weight: 200;
    letter-spacing: 2px;
  }

  .routing {
    display: flex;

    p:nth-child(2) {
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
p {
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

  &.close {
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

  .line {
    transition: background 150ms ease-out, transform 150ms ease-in-out;
    width: 100%;
    height: 3px;
    border-radius: 0.25rem;
  }
}
.navigation {
  transform: translateY(-15rem);
  background: #18181e;
  display: none;
  justify-content: flex-start;
  width: 100%;
  flex-direction: column;
  color: white;
  padding: 0.75rem;
  transition: transform 500ms ease-in-out;

  &:hover {
    color: #9b9b9b;
  }

  &.show {
    transform: translateY(0);
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

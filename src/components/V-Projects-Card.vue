<template>
  <div class="card" data-nosnippet>
    <img :src="project.img" loading="lazy" :alt="`Logo-Image for '${project.name}' project`" />
    <div class="card__content">
      <h3>{{ project.name }}</h3>
      <p>{{ project.desc }}</p>
      <ul class="table">
        <th>Thech i Used:</th>
        <li v-for="item in project.techUsed" :key="item.id">{{ item.content }}</li>
      </ul>
    </div>
    <div class="card__actions">
      <VButton dark @click="openURL(project.source)">Source</VButton>
      <VButton @click="openURL(project.live)">Live</VButton>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';

import VButton from '@/components/V-Button.vue';

export default {
  name: 'Projects-Card',
  setup() {
    const hovering = inject('hovering');
    const openURL = inject('openURL');

    return {
      hovering,
      openURL,
    };
  },
  props: {
    project: {
      type: Object,
      requried: true,
      default: () => ({}),
    },
  },
  components: {
    VButton,
  },
};
</script>

<style lang="scss" scoped>
.card {
  max-width: 350px;
  word-wrap: break-word;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px rgba($color: #000000, $alpha: 0.2);
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: white;

  img {
    width: 100%;
    height: auto;
  }

  &__content {
    padding: 0.75rem;
    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
    }
    p {
      margin-bottom: 1.5rem;
      color: rgb(63, 63, 63);
      line-height: 1.8;
    }
    .table {
      list-style-type: none;
      background-color: #f3f4f6;
      padding: 0.5rem;
      border-radius: 0.25rem;
      box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.2);
      th {
        font-weight: normal;
        position: relative;
        display: block;
        text-align: left;
        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          bottom: 0;
          left: 0;
          background: rgba($color: #000000, $alpha: 0.2);
        }
      }
      li {
        padding: 0.5rem;
        font-size: 0.9rem;

        &:not(:last-child)::after {
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          bottom: 0;
          left: 0;
          background: rgba($color: #000000, $alpha: 0.1);
        }
      }
    }
  }
  &__actions {
    margin-top: auto;
    padding: 1rem;
    text-align: right;

    button {
      position: relative;
      text-transform: uppercase;
      font-size: 1rem;
      font-family: inherit;
      letter-spacing: 2px;
      margin: 0 0.5rem;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.25rem;
      transition: background-color 150ms ease-out;
      outline: none;

      &:first-child {
        color: white;
        background-color: #18181e;
        box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.25);

        &:hover,
        &:focus {
          background-color: lighten($color: #18181e, $amount: 10);
        }
      }
      &:last-child {
        background-color: #f3f4f6;
        border: 1px solid #bbbbbb;
        box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.15);
        &:hover,
        &:focus {
          background-color: darken($color: #f3f4f6, $amount: 10);
        }
      }
    }
  }
}
</style>

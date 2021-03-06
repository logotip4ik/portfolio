<template>
  <section class="contact">
    <h2>Contact</h2>
    <h3>I will answer as soon as posible</h3>
    <form @submit.prevent="submit">
      <div class="form-item">
        <div class="input-wrapper">
          <label>Name</label>
          <input
            v-model="v.nameForm.$model"
            @mouseover="hovering = true"
            @mouseleave="hovering = false"
            @focus="toggleFocus"
            @blur="toggleFocus"
            @keypress.enter.prevent="$refs.input2.focus()"
            name="name"
            maxlength="50"
          />
        </div>
        <div class="details">
          <transition mode="out-in" name="fade">
            <small class="error" v-if="v.nameForm.$error">{{ v.nameForm.required.$message }}</small>
          </transition>
          <small class="counter">{{ nameCounter }}/50</small>
        </div>
      </div>
      <div class="form-item">
        <div class="input-wrapper">
          <label>Email</label>
          <input
            v-model="v.emailForm.$model"
            @mouseover="hovering = true"
            @mouseleave="hovering = false"
            @focus="toggleFocus"
            @blur="toggleFocus"
            @keypress.enter.prevent="$refs.input3.focus()"
            ref="input2"
            name="email"
            maxlength="100"
          />
        </div>
        <div class="details">
          <transition mode="out-in" name="fade">
            <small class="error" v-if="v.emailForm.email.$invalid">{{
              v.emailForm.email.$message
            }}</small>
            <small class="error" v-else-if="v.emailForm.required.$invalid">{{
              v.emailForm.required.$message
            }}</small>
          </transition>
          <small class="counter">{{ emailCounter }}/100</small>
        </div>
      </div>
      <div class="form-item">
        <div :class="{ 'input-wrapper': true, 'bottom-5': isIOS || isOpera }">
          <label>Message</label>
          <textarea
            v-model="v.messageForm.$model"
            @mouseover="hovering = true"
            @mouseleave="hovering = false"
            @focus="toggleFocus"
            @blur="toggleFocus"
            ref="input3"
            name="message"
            maxlength="300"
          />
        </div>
        <div class="details">
          <transition mode="out-in" name="fade">
            <small class="error" v-if="v.messageForm.$error">{{
              v.nameForm.required.$message
            }}</small>
          </transition>
          <small class="counter">{{ messageCounter }}/300</small>
        </div>
      </div>
      <div class="buttons">
        <VButton type="submit" dark @click="submit">Submit</VButton>
        <VButton type="reset" @click="resetForm">Reset</VButton>
      </div>
    </form>
  </section>
</template>

<script>
import { computed, inject, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

import VButton from '@/components/V-Button.vue';

export default {
  name: 'Contact',
  setup(_, { emit }) {
    const nameForm = ref('');
    const emailForm = ref('');
    const messageForm = ref('');

    const nameCounter = computed(() => nameForm.value.length);
    const emailCounter = computed(() => emailForm.value.length);
    const messageCounter = computed(() => messageForm.value.length);

    const hovering = inject('hovering');
    const loading = inject('loading');

    const rules = {
      nameForm: {
        required,
      },
      emailForm: {
        email,
        required,
      },
      messageForm: {
        required,
      },
    };

    const v = useVuelidate(rules, { nameForm, emailForm, messageForm });

    function toggleFocus({ target }) {
      target.offsetParent.classList.toggle('focus');
    }

    function resetForm() {
      nameForm.value = '';
      emailForm.value = '';
      messageForm.value = '';
      v.value.$reset();
    }

    async function submit() {
      const data = {
        name: nameForm.value.trim(),
        email: emailForm.value.trim(),
        message: messageForm.value.trim(),
      };
      if (!data.name || !data.email || !data.message || !(await v.value.$validate())) return;
      loading.value = true;
      resetForm();
      emit('scroll-to', 'top');
      fetch('https://send.pageclip.co/aWxaZHtPDs5VsaMfEkKV9DSIcULrKSM7', {
        method: 'POST',
        body: JSON.stringify(data),
        redirect: 'manual',
      })
        .then(() => {
          loading.value = false;
          emit('success', true);
        })
        .catch((err) => {
          loading.value = false;
          emit('success', false);
          console.warn(err);
        });
    }

    function checkIfIOS() {
      // prettier-ignore
      return (
        ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
          navigator.platform,
        ) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
      );
    }
    function checkIfOpera() {
      return navigator.userAgent.includes('Opera');
    }

    const isIOS = computed(() => checkIfIOS());
    const isOpera = computed(() => checkIfOpera());

    return {
      hovering,
      nameForm,
      emailForm,
      messageForm,
      nameCounter,
      emailCounter,
      messageCounter,
      toggleFocus,
      resetForm,
      submit,
      isIOS,
      isOpera,
      v,
    };
  },
  emits: ['scroll-to', 'success'],
  components: { VButton },
};
</script>

<style lang="scss" scoped>
.contact {
  min-height: 100vh;
  padding: 0.75rem 1rem;
  text-align: center;

  h2,
  h3 {
    line-height: 1.3;
  }

  h2 {
    font-size: 2rem;
  }
  h3 {
    color: rgb(90, 90, 90);
    font-size: 1.4rem;
    font-weight: 200;
    margin-bottom: 4rem;
  }

  form {
    background-color: #f3f4f6;
    padding: 1rem;
    text-align: left;
    max-width: 600px;
    margin: 0 auto;
    border-radius: 0.25rem;
    box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;

    .form-item {
      margin-bottom: 1.2rem;
      position: relative;

      label {
        color: rgb(54, 54, 54);
        display: block;
        font-size: 1.2rem;
        transition: color 200ms ease-out;
      }

      .input-wrapper {
        width: 100%;
        position: relative;

        input,
        textarea {
          width: 100%;
          appearance: none;
          border: none;
          background: transparent;
          font: inherit;
          outline: none;
          border-radius: 0;
          border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
          transition: border-bottom-color 200ms ease-in;
          resize: vertical;
          padding: 0.25rem 0;

          &:hover {
            border-bottom-color: black;
          }
        }
        &.focus label {
          color: #000;
        }
        &.focus::after {
          clip-path: circle(100% at 50% 0%);
        }
        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          left: 0;
          background: #363636;
          border-radius: 0.25rem;
          bottom: 0;
          clip-path: circle(0% at 50% 0%);
          transition: clip-path 300ms ease-in-out;
        }
        &.bottom-5::after {
          bottom: 6px;
        }
      }
      .details {
        display: flex;
        justify-content: space-between;
        .error {
          font-size: 0.8rem;
          color: rgb(190, 0, 0);
        }
        .counter {
          margin-left: auto;
          color: rgb(61, 61, 61);
        }
      }
    }
    .buttons {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>

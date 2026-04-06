<template>
  <section class="home-view-component section">
    <article class="box" v-if="!$store.getters.userinfo">
      <BaseForm
        class="mb-4"
        :formvalue="formName === 'login' ? loginForm : registerForm"
        @onSubmit="onSubmit(formName, $event)"
      />

      <div class="error">
        <BaseFlashnote :formName="formName" />
      </div>

      <BaseCallToAction
        :item="{
          type: 'button',
          content:
            formName === 'login'
              ? 'Don\'t have an account? Create one now.'
              : 'Got an account? Go to login.',
          isfull: false,
          isprimary: false,
          action: formName === 'login' ? 'register' : 'login'
        }"
        :formvalue="formName === 'login' ? loginForm : registerForm"
        @onClick="resetError(); formName = $event"
      />
    </article>
  </section>
</template>

<script>
import BaseForm from '../components/base/BaseForm.vue';
import BaseFlashnote from '../components/base/BaseFlashnote.vue';
import BaseCallToAction from '../components/base/BaseCallToAction.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      formName: 'login',
      loginForm: {
        title: 'Connect to your account',
        submit: 'Login',
        fieldsets: [
          { label: 'Email', type: 'email', name: 'email', required: true, min: 5, value: null },
          { label: 'Password', type: 'password', name: 'password', required: true, min: 5, value: null },
        ],
      },

      registerForm: {
        title: 'Create your account',
        submit: 'Register',
        fieldsets: [
          { label: 'Name', type: 'text', name: 'name', required: true, min: 2, value: null },
          { label: 'Email', type: 'email', name: 'email', required: true, min: 5, value: null },
          { label: 'Password', type: 'password', name: 'password', required: true, min: 5, value: null },
          { label: 'Repeat password', type: 'password', name: 'password-repeate', required: true, min: 5, value: null },
        ],
      },
    };
  },

  methods: {
    resetError() {
      this.$store.dispatch('resetErrorOperation');
    },

    onSubmit(formName, event) {
      if (formName === 'register') {
        if (event.password === event['password-repeate']) {
          delete event['password-repeate'];
          this.$store.dispatch('registerOperation', event);
        } else {
          alert('Password mismatch');
        }
      } else {
        this.$store.dispatch('loginOperation', event);
      }
    },
  },

  components: {
    BaseForm,
    BaseCallToAction,
    BaseFlashnote,
  },
};
</script>

<style scoped>
.home-view-component {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 1rem;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}

.box {
  width: 100%;
  max-width: 480px;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.error {
  margin-bottom: 1rem;
  color: #b00020;
  font-weight: 500;
}

.mb-4 {
  margin-bottom: 1rem;
}
</style>
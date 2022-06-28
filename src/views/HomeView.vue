<template>
  <section class="home-view-component section">
    <article 
      class="box"
      v-if="!$store.getters.userinfo">
      <!-- Inject value to child compoenent has a HTML property -->
      <BaseForm 
        class="mb-4"
        :formvalue="formName === 'login' ? loginForm : registerForm"
        @onSubmit="onSubmit(formName, $event)"/>

      <div class="error">
        <BaseFlashnote/>
      </div>
      
      <!-- Bind DOM event: @Event -->
      <BaseCallToAction 
        :item="{
          type: `button`,
          content: 
            formName === 'login'
            ? `Don't have an account? Create one now.`
            : `Got an account? Go to login.`,
          isfull: false,
          isprimary: false,
          action: formName === 'login' ? 'register' : 'login'
        }"
        @onClick="formName = $event"/>
    </article>
  </section>
</template>

<script>
/* 
  [IMPORT] Modules/components
*/
  import BaseForm from '../components/base/BaseForm.vue';
  import BaseFlashnote from '../components/base/BaseFlashnote.vue';
  import BaseCallToAction from '../components/base/BaseCallToAction.vue';

/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'HomeView',

    // Used to define properties class
    data(){
      return {
        // Basic values
        formName: 'login',

        // Form values
        loginForm: {
          title: `Connect to your account`,
          submit: `Login`,
          fieldsets: [
            {
              label: `Email`,
              type: `email`,
              name: `email`,
              required: true,
              min: 5,
              value: 'mateo.dubernet@gmail.com'
            },
            {
              label: `Password`,
              type: `password`,
              name: `password`,
              required: true,
              min: 5,
              value: 'test'
            }
          ]
        },
        registerForm: {
          title: `Create your account`,
          submit: `Register`,
          fieldsets: [
            {
              label: `Name`,
              type: `text`,
              name: `name`,
              required: true,
              min: 2,
              value: 'Mateo'
            },
            {
              label: `Email`,
              type: `email`,
              name: `email`,
              required: true,
              min: 5,
              value: 'mateo.dubernet@gmail.com'
            },
            {
              label: `Password`,
              type: `password`,
              name: `password`,
              required: true,
              min: 5,
              value: 'test'
            },
            {
              label: `Repeate password`,
              type: `password`,
              name: `password-repeate`,
              required: true,
              min: 5,
              value: 'test'
            }
          ]
        }
      }
    },

    /* 
      [VUE] Methods
      Used to add functionnalies
    */
      methods: {

        onSubmit: function(formName, event){
          // Check register form

          if( formName === 'register' ){
            if( event.password === event['password-repeate'] ){
              // Delete unused property
              delete event['password-repeate'];

              // Use store action
              this.$store.dispatch('registerOperation', event)
            }
            else{ alert(`Password missmatch`) }
          }
          else{
            this.$store.dispatch('loginOperation', event)
          }
        },
      },
    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {
        BaseForm, 
        BaseCallToAction,
        BaseFlashnote
      }
  }
</script>

<style>
.error{
  margin-bottom: 15px;
  color: red;
}
</style>
  <!-- 
    TODO: Create 'BaseFlashnote.vue'
    A flashnote is a modal that display success and error messages
    - Find a way to automaticaly display error message if:
      - User login error
      - User registration error: email MUST be unique
    - Find a way to automaticaly display success message if:
      - User is correctly connected
      - Album is created
  -->
<template>
    <section v-if="this.$store.getters.loginError && formName === 'login'">
        {{ this.$store.getters.loginError }}
    </section>

    <section v-if="this.$store.getters.registerError && formName === 'register'">
        {{ this.$store.getters.registerError }}
    </section>
</template>

<script>
export default {
    name: 'BaseFlashnote',

    props: {
      formName: {
        type: String,
        required: true,
        default: () => {}
      }
    },
}
</script>
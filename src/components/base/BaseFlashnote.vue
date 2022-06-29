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
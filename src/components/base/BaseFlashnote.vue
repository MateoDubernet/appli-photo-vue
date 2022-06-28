<template>
    <section v-if="this.$store.state.loginError">
        {{ this.$store.state.loginError }}
    </section>
</template>

<script>
export default {
    name: 'BaseFlashnote',

    props: {
      item: {
        type: String,
        required: true,
        default: () => {}
      }
    },
}
</script>
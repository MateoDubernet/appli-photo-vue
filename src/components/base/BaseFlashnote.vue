<template>
  <section v-if="$store.getters.loginError && formName === 'login'">
    {{ $store.getters.loginError }}
  </section>

  <section v-if="$store.getters.registerError && formName === 'register'">
    {{ $store.getters.registerError }}
  </section>
</template>

<script>
export default {
  name: 'BaseFlashnote',

  props: {
    formName: {
      type: String,
      required: true,
      default: () => '',
    },
  },
};
</script>

<style scoped>
section {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-weight: 500;
}

section[v-if] {
  background-color: #ffe2e2;
  color: #b00020;
  border: 1px solid #f5c6cb;
}
</style>

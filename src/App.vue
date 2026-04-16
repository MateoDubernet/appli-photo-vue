<template>
  <div class="app-main-component">
    <HeaderApp
      :userinfo="$store.getters.userinfo"
      :snapshootlist="$store.getters.snapshootlist"
      @onLogout="onLogout"
    />

    <main>
      <router-view v-slot="{ Component }" :key="$route.name">
        <component :is="Component" />
      </router-view>
    </main>

    <FooterApp />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { dexieDb } from './services/dexie.service';
import HeaderApp from './components/main/HeaderApp.vue';
import FooterApp from './components/main/FooterApp.vue';

export default {
  name: 'App',
  components: {
    HeaderApp,
    FooterApp,
  },
  data() {
    return {};
  },
  methods: {
    onLogout(event) {
      // Save value in the store
      this.$store.dispatch('logoutOperation', event);
    },
  },

  created() {
    this.$store.subscribe((mutations) => {
      switch (mutations.type) {
        case 'userinfo':
          if (!mutations.payload.data) {
            this.$router.push({ name: 'HomeView' });
          }
          break;
        default:
          break;
      }
    });
  },
};
</script>

<style src="@/assets/css/main.css"></style>
<style src="@/assets/css/transition.css"></style>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

#appli-photo-vue, .app-main-component {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>

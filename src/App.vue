<template>
  <div class="app-main-component">
    <!-- Header -->
    <HeaderApp
      :userinfo="$store.getters.userinfo"
      :snapshootlist="$store.getters.snapshootlist"
      @onLogout="onLogout"
    />

    <!-- Main -->
    <main>
      <!-- User router-view directive -->
      <router-view v-slot="{ Component }" :key="$route.name">
        <!-- Inject path component in a "component" directive -->
        <component :is="Component" />
      </router-view>
    </main>

    <!-- Footer -->
    <FooterApp />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

/*
  [IMPORT] Modules/components
*/
import { dexieDb } from './services/dexie.service';
import HeaderApp from './components/main/HeaderApp.vue';
import FooterApp from './components/main/FooterApp.vue';

/*
  [CTRL] App.vue
  Define component controller
*/
export default {
  name: 'App',

  /*
    [VUE] Components
    Used to inject child components
  */
  components: {
    HeaderApp,
    FooterApp,
  },

  /*
    [VUE] Data
    Local component state
  */
  data() {
    return {};
  },

  /*
    [VUE] Methods
    Add functionalities
  */
  methods: {
    onLogout(event) {
      // Save value in the store
      this.$store.dispatch('logoutOperation', event);
    },
  },

  /*
    [VUE] Lifecycle Hooks
    Subscribe to store mutations
  */
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

<!-- Import CSS -->
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
  flex: 1;           /* prend l'espace restant entre header et footer */
  display: flex;
  flex-direction: column;
}
</style>

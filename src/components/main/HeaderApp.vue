<template>
  <header class="header-app-component">
    <h1 class="appli-title-header">
      Application Photo
    </h1>

    <div v-if="!cmpUserinfo">
      User not connected
    </div>

    <div v-else class="logout">
      <button
        class="button"
        v-text="'Logout'"
        @click.prevent="$emit('onLogout', true)"
      />

      <div>
        Utilisateur : {{ $store.getters.userinfo.name }}
      </div>

      <div v-if="cmpSnapshootlist.length">
        Nombre de photos : <b>{{ cmpSnapshootlist.length }}</b>
      </div>
    </div>

    <!-- [LINK] Never use <a>. Use <router-link> directive as below -->
    <div class="links" v-if="$store.getters.userinfo">
      <router-link
        :to="{ name: 'DashboardView' }"
        active-class="active-link"
        class="router-link"
      >
        Dashboard
      </router-link>
      <router-link
        :to="{ name: 'CreateAlbum' }"
        active-class="active-link"
        class="router-link"
      >
        Create Album
      </router-link>
    </div>
  </header>
</template>

<script>
/*
  [CTRL] App.vue
  Define component controller
*/
export default {
  name: 'HeaderApp',

  /*
    [VUE] Props
    Data binding from parent component
  */
  props: {
    userinfo: {
      type: Object,
      required: false,
      default: () => null,
    },
    snapshootlist: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  /*
    [VUE] Computed
    Used to have version of property value
  */
  computed: {
    cmpUserinfo() {
      return this.userinfo;
    },
    cmpSnapshootlist() {
      return this.snapshootlist;
    },
  },
};
</script>

<style scoped>
.header-app-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  position: relative;
}

.appli-title-header {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.links {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.router-link {
  color: #3273dc;
  text-decoration: none;
  font-weight: 500;
}

.router-link:hover {
  text-decoration: underline;
}

.logout {
  position: absolute;
  top: 1rem;
  right: 1rem;
  text-align: right;
  font-size: 0.875rem;
  color: #555;
}
</style>

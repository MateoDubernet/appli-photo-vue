<template>
  <div class="app-main-component">
    <!-- Header -->
    <HeaderApp 
      :userinfo="$store.getters.userinfo"
      :snapshootlist="$store.getters.snapshootlist"
      @onLogout="onLogout"/>

    <!-- Main -->
    <main>
      <!-- User router-view directive -->
      <router-view
        v-slot="{ Component }"
        :key="$route.name">
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
//

/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'App',

    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {
        HeaderApp, 
        FooterApp
      },

      // Used to define properties class
      data(){
        return {}
      },

      methods: {
        onLogout: function(event){
          // Save value in the store
          this.$store.dispatch('logoutOperation', event)
        },
      },

      created: function(){
        // Subscribe to store mutations
        this.$store.subscribe( mutations => {

          // Switch mutation
          switch( mutations.type ){
            
            case 'userinfo': 
              if( !mutations.payload.data ) this.$router.push({ name: 'HomeView' })
              break;
            
            default: break;
          }
        })
      },
  }
  
</script>

<!-- Import CSS -->
<style src="@/assets/css/main.css"></style>
<style src="@/assets/css/transition.css"></style>
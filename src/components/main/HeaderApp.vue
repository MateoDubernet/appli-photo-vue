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
          v-text="`Logout`"
          @click.prevent="$emit('onLogout', true)"/>
        <div v-if="cmpSnapshootlist.length">
          Nombre de photos <b>{{cmpSnapshootlist.length}}</b>
        </div>
      </div>

      <!-- [LINK] Never use <a> To define a basic link use the <router-link> directive has below -->

      <div class="links">
          <router-link :to="{ name: 'HomeView' }" active-class="active-link" class="router-link">Home</router-link>
          <router-link :to="{ name: 'DashboardView' }" active-class="active-link" class="router-link">Dashboard</router-link>
          <router-link :to="{ name: 'CreateView' }" :itemtype="$route.params.type = 'album'" active-class="active-link" class="router-link">CreateView</router-link>
          <!-- <router-link :to="{ name: 'SingleView' }" $route.params.type = 'snapshoot' active-class="active-link" class="router-link">SingleView</router-link> -->
      </div>
  </header>
</template>

<script>
/* 
  [CTRL] App.vue
  Define compoenent controller
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
          default: () => null
        },
        snapshootlist: {
          type: Array,
          required: false,
          default: () => []
        }
      },

    /* 
      [VUE] Computed
      Used to have version of property value
    */
      computed: {
        cmpUserinfo: function(){ return this.userinfo },
        cmpSnapshootlist: function(){ return this.snapshootlist },
      },
  }
</script>

<style>
.header-app-component{
  background: bisque;
  text-align: center;
  border-bottom: 1px solid black;
}

.appli-title-header{
  font-size: 35px;
  padding: 35px;
}

.links{
  display: flex;
  background-color: rgb(169, 223, 245);
  justify-content: space-evenly;
  padding: 7px;
}

.router-link{
  color: rgb(0, 0, 0);
}

.router-link:hover{
 text-decoration: underline;
 color: rgb(114, 107, 107);
}

.logout{
  position: absolute;
  top: 0;
  right: 0;
}

.active-link{
  color: rgb(114, 107, 107);
  text-decoration: underline;
}
</style>
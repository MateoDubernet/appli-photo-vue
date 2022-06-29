<template>
  <section class="dashboard-view-component section">
    <article class="box">
      <h1 class="component-title">Albums</h1>
          <BasePushAlbum/>
    </article>

      <!-- 
        TODO: Display list of albums
        - Get album list from the store
        - Generate a loop 'v-for' on album list
        - Display a child compoenent 'BasePushAlbum.vue':
          - title
          - nombers of snapshoots
          - link to display album
      -->
  </section>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
/* 
  [CTRL] App.vue
  Define compoenent controller
*/

  import BasePushAlbum from '../components/base/BasePushAlbum.vue';

  export default {
    name: 'DashboardView',

    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {
        BasePushAlbum,
      },
  }
</script>
<style>
 .component-title{
    font-size: 30px;
    border-bottom: 1px solid black;
    padding-bottom: 25px;
 }
</style>
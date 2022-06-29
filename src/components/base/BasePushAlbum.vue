<!-- 
    TODO: Create 'BasePushAlbum'
    A "Push" component is used to display general item iformation.
    Add HTML tag to:
    - display album title
    - display snapshoot quentity

    Add functionality to:
    - open one single snapshoot in 'SingleView.vue'
 -->
<template>
    <section class="basePushAlbum-view-component section">
        <div class="album-list" v-for="albums in $store.getters.albumlist" :key="albums.id">
        <h1 class="is-size-4">{{albums.title}} N° {{albums.id}}</h1>
        <p>Author : {{$store.getters.userinfo.name}}</p>  
        <p>Snapshoot : {{albums.snapshoot}}</p>
        <div class="snapshoots-link">
          <router-link :to="{ name: 'SingleView', params: {type: 'album', id: albums.id } }">View Album >></router-link> <!--open one single albums in 'SingleView.vue'-->
        </div>
      </div>
    </section>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'BasePushAlbum',

      data(){
        return {
          album: Object,
          snapshoot: Object,
          albumSnapshootList: [],
        }
      },

    /* 
      [VUE] Component
      Used to inject child components
    */

    // get number of snapshoot in albums
    mounted: async function(){
      this.$store.getters.albumlist.forEach(album => {
        this.albumSnapshootList = [];
          this.$store.getters.snapshootlist.forEach(snapshoot => {
            if (album.id === snapshoot.albumID) {
                this.albumSnapshootList.push(snapshoot)
            }
          })
        album.snapshoot = this.albumSnapshootList.length
      });
    },

      components: {}
  }
</script>
<style>
.album-list{
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  padding-bottom: 25px;
}

.snapshoots-link{
  align-self: flex-end;
}
</style>
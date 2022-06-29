<template>
  <section class="single-view-component section">

      <article class="box" v-if="$route.params.type === 'album'">
          <router-link :to="{ name: 'CreateSnapshoot', params: { id: `${album.id}` } }"  active-class="active-link" class="router-link snapshoot-link">+ Add Snapshoot</router-link>
          Snapshoot number : {{albumSnapshootList.length}}
          <h1 class="is-size-3 album-title">Album : {{album.title}}</h1>
          <div v-for="snapshoot in albumSnapshootList" :key="snapshoot.id">
          <div class="snapshoot-list">
      <router-link @click="getSnapshoot(snapshoot)" :to="{ name: 'SingleView', params: {type: 'snapshoot', id: `${snapshoot.id}` } }">
          <div class="snapshoot-header">
            <h3 class="is-size-5 snapshoot-title">Title : {{ snapshoot.title }}</h3>
            <p class="snapshoot-id">ID : {{ snapshoot.id }}</p>
          </div>
      </router-link>
          </div>
        </div>
      </article>


      <article class="box" v-if="$route.params.type === 'snapshoot'">
        <!-- 
          TODO: Display list of album snapshoots
          - Get all album snapshoots
          - Generate a loop 'v-for' on snapshoot list
          - Display 'BaseImage' for each snapshoot
          - Link to display single snapshoot
        -->
        <div class="snapshoot-header">
          <h1 class="is-size-3 snapshoot-title">Snapshoot : {{snapshoot.title}}</h1>
          <p>ID : {{snapshoot.id}}</p>
        </div>

        <div class="snapshoot-main"></div>

        <div class="snapshoot-footer">
          <p>Caption : {{snapshoot.caption}}</p>
          <p>Base64 : {{snapshoot.base64}}</p>
          <p>Author : {{snapshoot.author}}</p>
          <p>AlbumID : {{snapshoot.albumID}}</p>
        </div>
      </article>
  </section>
</template>

<script>
import { dexieDb } from '@/services/dexie.service'
/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'SingleView',

    // Used to define properties class
    data(){
      return {
        album: Object,
        snapshoot: Object,
        albumSnapshootList: [],
      }
    },

    /* 
      [VUE] Methods
      Used to add functionnalies
    */
      methods: {

        getSnapshoot: function(snapshoot){
          this.snapshoot = snapshoot;
        },
      },

    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {},

    mounted: async function(){
      /* 
        [DEXIE] Save
        Save API response in Dexie
      */

       // Get single album or snapshoot
        if (this.$route.params.type === 'album') {
          this.album = await dexieDb.albums.get( +this.$route.params.id );
        } else if (this.$route.params.type === 'snapshoot') {
          this.album = await dexieDb.snapshoots.get( +this.$route.params.id );
        }

        // Save snapshoot in albumSnapshootList
        this.$store.getters.snapshootlist.forEach(snapshoot => {
          if (snapshoot.albumID == this.$route.params.id) {
            this.albumSnapshootList.push(snapshoot)
          }
        });
    }
  }
</script>
<style>
.album-title{
  border-bottom: 1px solid black;
  padding-bottom: 20px;
}

.snapshoot-list{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border-bottom: 1px solid black;
  padding: 15px;
}

.snapshoot-header{
  display: flex;
}

.snapshoot-title{
  flex-grow: 1;
}

.snapshoot-id{
  justify-self: flex-end;
}

.snapshoot-footer{
  display: flex;
  flex-direction: column;
}


.snapshoot-link{
  position: absolute;
  right: 80px;

  padding: 5px;
  border-radius: 5px;
  background-color: aliceblue;
  box-shadow: 0px 0px 2px;
}

</style>
<template>
  <section class="single-view-component section">

    <article class="box" v-if="$route.params.type === 'album'">
      <div class="album-header" style="display: flex; justify-content: space-between; align-items: center;">
        <h1 class="is-size-3 album-title">Album : {{album.title}}</h1>
        <router-link class="router-link snapshoot-link" active-class="active-link" :to="{ name: 'CreateSnapshoot', params: { id: `${album.id}` } }">
          + Add Snapshoot
        </router-link>
      </div>

      <p>Snapshoot number : {{ albumSnapshootList.length }}</p>

      <div v-for="snapshoot in albumSnapshootList" :key="snapshoot.id">
        <div class="snapshoot-list">
          <router-link
            @click="getSnapshoot(snapshoot)"
            :to="{ name: 'SingleView', params: { type: 'snapshoot', id: `${snapshoot.id}` } }"
          >
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
        <h1 class="is-size-3 snapshoot-title">Snapshoot : {{ snapshoot.title }}</h1>
        <p>ID : {{ snapshoot.id }}</p>
      </div>

      <div class="snapshoot-main"></div>

      <div class="snapshoot-footer">
        <p>Caption : {{ snapshoot.caption }}</p>
        <p>Base64 : {{ snapshoot.base64 }}</p>
        <p>Author : {{ snapshoot.author }}</p>
        <p>AlbumID : {{ snapshoot.albumID }}</p>
      </div>
    </article>

  </section>
</template>

<script>
import { dexieDb } from '@/services/dexie.service';

/*
  [CTRL] App.vue
  Define component controller
*/
export default {
  name: 'SingleView',

  /*
    [VUE] Data
    Local component state
  */
  data() {
    return {
      album: Object,
      snapshoot: Object,
      albumSnapshootList: [],
    };
  },

  /*
    [VUE] Methods
    Used to add functionalities
  */
  methods: {
    getSnapshoot(snapshoot) {
      this.snapshoot = snapshoot;
    },
  },

  /*
    [VUE] Components
    Inject child components
  */
  components: {},

  /*
    [VUE] Mounted
    Fetch data after component mounts
  */
  async mounted() {
    // Get single album or snapshoot
    if (this.$route.params.type === 'album') {
      this.album = await dexieDb.albums.get(+this.$route.params.id);
    } else if (this.$route.params.type === 'snapshoot') {
      this.snapshoot = await dexieDb.snapshoots.get(+this.$route.params.id);
    }

    // Save snapshoots in albumSnapshootList
    this.$store.getters.snapshootlist.forEach((snapshoot) => {
      if (snapshoot.albumID == this.$route.params.id) {
        this.albumSnapshootList.push(snapshoot);
      }
    });
  },
};
</script>

<style scoped>
.single-view-component {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  flex: 1;
}

.box {
  width: 100%;
  max-width: 700px;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.album-title {
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  margin-bottom: 1rem;
}

.snapshoot-list {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  padding: 10px 0;
}

.snapshoot-header {
  display: flex;
  justify-content: space-between;
}

.snapshoot-title {
  font-weight: 600;
}

.snapshoot-footer {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.snapshoot-link {
  padding: 5px 10px;
  border-radius: 5px;
  background-color: aliceblue;
  box-shadow: 0px 0px 2px rgba(0,0,0,0.2);
  text-decoration: none;
  color: black;
}

.snapshoot-link:hover {
  background-color: #90caf9;
  text-decoration: underline;
}
</style>

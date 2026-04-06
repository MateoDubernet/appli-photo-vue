<template>
  <section class="basePushAlbum-view-component section">
    <div
      class="album-list"
      v-for="album in $store.getters.albumlist"
      :key="album.id"
    >
      <h1 class="is-size-4">{{ album.title }} N° {{ album.id }}</h1>
      <p>Author: {{ $store.getters.userinfo.name }}</p>
      <p>Snapshoot: {{ album.snapshoot }}</p>

      <div class="snapshoots-link">
        <router-link
          :to="{ name: 'SingleView', params: { type: 'album', id: album.id } }"
        >
          View Album >>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BasePushAlbum',

  data() {
    return {
      album: Object,
      snapshoot: Object,
      albumSnapshootList: [],
    };
  },

  components: {},

  mounted() {
    this.$store.getters.albumlist.forEach((album) => {
      this.albumSnapshootList = [];

      this.$store.getters.snapshootlist.forEach((snapshoot) => {
        if (album.id === snapshoot.albumID) {
          this.albumSnapshootList.push(snapshoot);
        }
      });

      album.snapshoot = this.albumSnapshootList.length;
    });
  },
};
</script>

<style scoped>
.basePushAlbum-view-component {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.album-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  background-color: rgb(245, 245, 245);
  margin-bottom: 1rem;
}

.snapshoots-link {
  align-self: flex-end;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #3273dc;
}

.snapshoots-link a:hover {
  text-decoration: underline;
}
</style>

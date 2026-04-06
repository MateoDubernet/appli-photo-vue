import { dexieDb } from '@/services/dexie.service';

export default {
  state: {
    albums: JSON.parse(localStorage.getItem('albums')) || null,
    albumlist: [],

    snapshoot: null,
    snapshootlist: [],
  },

  getters: {
    album: (state) => state.album,
    albumlist: (state) => state.albumlist,

    snapshoot: (state) => state.snapshoot,
    snapshootlist: (state) => state.snapshootlist,
  },

  mutations: {
    album(state, payload) {
      state.album = payload.data;
    },
    albumlist(state, payload) {
      state.albumlist.push(payload.data);
    },

    snapshoot(state, payload) {
      state.snapshoot = payload.data;
    },
    snapshootlist(state, payload) {
      state.snapshootlist.push(payload.data);
    },
  },

  actions: {
    async saveAlbumOperation({ commit, dispatch, state }, data) {
      const newAlbumId = await dexieDb.albums.add(data);
      const newAlbum = await dexieDb.albums.get(newAlbumId);

      commit('albumlist', { data: newAlbum });
    },

    async pushSnapshootOperation({ commit, dispatch, state }, data) {
      const newSnapshootId = await dexieDb.snapshoots.add(data);
      const newSnapshoot = await dexieDb.snapshoots.get(newSnapshootId);

      commit('snapshootlist', { data: newSnapshoot });
    },
  },
};

/* eslint-disable no-unused-vars */
import { dexieDb } from '@/services/dexie.service';

export default {
  // Define state
  state: {
    // Album state
    albums: JSON.parse(localStorage.getItem('albums')) || null,
    albumlist: [],

    // Snapshoot state
    snapshoot: null,
    snapshootlist: [],
  },

  // Define getters
  getters: {
    // Album getters
    album: (state) => state.album,
    albumlist: (state) => state.albumlist,

    // Snapshoot getters
    snapshoot: (state) => state.snapshoot,
    snapshootlist: (state) => state.snapshootlist,
  },

  // Define mutations (eq. setters)
  mutations: {
    // Album mutations
    album(state, payload) {
      state.album = payload.data;
    },
    albumlist(state, payload) {
      state.albumlist.push(payload.data);
    },

    // Snapshoot mutations
    snapshoot(state, payload) {
      state.snapshoot = payload.data;
    },
    snapshootlist(state, payload) {
      state.snapshootlist.push(payload.data);
    },
  },

  // Define actions
  actions: {
    // Action to save album
    async saveAlbumOperation({ commit, dispatch, state }, data) {
      /*
        [DEXIE] Save
        Save API response in Dexie
      */
      const newAlbumId = await dexieDb.albums.add(data);

      // Get new created album
      const newAlbum = await dexieDb.albums.get(newAlbumId);

      /*
        [STORE] Update
        Commit new state with indexed object
      */
      commit('albumlist', { data: newAlbum });
    },

    // Action to add new snapshoot in list
    async pushSnapshootOperation({ commit, dispatch, state }, data) {
      /*
        [DEXIE] Save
        Save API response in Dexie
      */
      const newSnapshootId = await dexieDb.snapshoots.add(data);

      // Get new created snapshoot
      const newSnapshoot = await dexieDb.snapshoots.get(newSnapshootId);

      /*
        [STORE] Update
        Commit new state with indexed object
      */
      commit('snapshootlist', { data: newSnapshoot });
    },
  },
};

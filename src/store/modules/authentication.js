/* eslint-disable no-unused-vars */
/* eslint-disable no-async-promise-executor */

import { dexieDb } from '@/services/dexie.service';
import AppRouter from '@/router';

export default {
  // Define state
  state: {
    userinfo: JSON.parse(localStorage.getItem('userinfo')) || null,
    loginError: null,
    registerError: null,
  },

  // Define getters
  getters: {
    userinfo: (state) => state.userinfo,
    loginError: (state) => state.loginError,
    registerError: (state) => state.registerError,
  },

  // Define mutations (eq. setters)
  mutations: {
    userinfo(state, payload) {
      state.userinfo = payload.data;
    },
  },

  // Define actions
  actions: {
    // Action to register user
    async registerOperation({ commit, dispatch, state }, data) {
      /*
        [DEXIE] Save
        Save API response in Dexie
      */
      let users = null;
      let uniqueEmail = true;
      let i = 1;

      if (data.email && data.name && data.password) {
        while (users !== undefined) {
          i++;
          users = await dexieDb['users'].get(i);
          if (users && users.email === data.email) {
            users = undefined;
            uniqueEmail = false;
            state.registerError = 'Email already used';
          }
        }

        if (uniqueEmail) {
          const newUserId = await dexieDb['users'].add(data);
          const newUser = await dexieDb['users'].get(newUserId);
        } else {
          console.log(state.registerError);
        }
      } else {
        state.registerError = 'All Fields required';
      }
    },

    // Action to login user
    async loginOperation({ commit, dispatch, state }, data) {
      /*
        [DEXIE] Save
        Save API response in Dexie
      */
      if (data.email && data.password) {
        const connectedUser = await dexieDb['users'].get(data);
        if (connectedUser) {
          // Save user info in localStorage
          localStorage.setItem('userinfo', JSON.stringify(connectedUser));

          /*
            [STORE] Update
            Commit new state with indexed object
          */
          commit('userinfo', { data: connectedUser });

          if (this.getters.userinfo) {
            /*
              TODO: Connected/not connected
              If a user is connected, 'HomeView' is not useful, the dashboard must be the home.
            */
            AppRouter.push({ name: 'DashboardView' });
            dispatch('resetErrorOperation');
          }
        } else {
          state.loginError = 'Wrong email or password';
        }
      } else {
        state.loginError = 'All Fields required';
      }
    },

    // Action to check user token
    pkceOperation({ commit, dispatch, state }, data) {
      return new Promise(async (resolve) => {
        /*
          [DEXIE] Save
          Save API response in Dexie
        */
        const connectedUser = await dexieDb['users'].get(data);
        if (connectedUser) {
          // Save user info in localStorage
          localStorage.setItem('userinfo', JSON.stringify(connectedUser));

          /*
            [STORE] Update
            Commit new state with indexed object
          */
          commit('userinfo', { data: connectedUser });

          // Resolve user access
          resolve({ status: 200, value: connectedUser });
        } else {
          // Reject user access
          resolve({ status: 400, value: null });
        }
      });
    },

    // Reset login/register errors
    resetErrorOperation({ commit, dispatch, state }) {
      state.loginError = null;
      state.registerError = null;
    },

    // Action to logout user
    logoutOperation({ commit, dispatch, state }) {
      // Delete localStorage to disable auto-connection
      localStorage.removeItem('userinfo');

      /*
        [STORE] Update
        Delete 'userinfo' stored value to update DOM
      */
      commit('userinfo', { data: null });
    },
  },
};

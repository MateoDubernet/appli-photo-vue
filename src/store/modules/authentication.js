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

  getters: {
    userinfo: (state) => state.userinfo,
    loginError: (state) => state.loginError,
    registerError: (state) => state.registerError,
  },

  mutations: {
    userinfo(state, payload) {
      state.userinfo = payload.data;
    },
  },

  actions: {
    async registerOperation({ commit, dispatch, state }, data) {
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

    async loginOperation({ commit, dispatch, state }, data) {
      if (data.email && data.password) {
        const connectedUser = await dexieDb['users'].get(data);
        if (connectedUser) {
          localStorage.setItem('userinfo', JSON.stringify(connectedUser));

          commit('userinfo', { data: connectedUser });

          if (this.getters.userinfo) {
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

    pkceOperation({ commit, dispatch, state }, data) {
      return new Promise(async (resolve) => {
        const connectedUser = await dexieDb['users'].get(data);
        if (connectedUser) {
          localStorage.setItem('userinfo', JSON.stringify(connectedUser));

          commit('userinfo', { data: connectedUser });

          resolve({ status: 200, value: connectedUser });
        } else {
          resolve({ status: 400, value: null });
        }
      });
    },

    resetErrorOperation({ commit, dispatch, state }) {
      state.loginError = null;
      state.registerError = null;
    },

    logoutOperation({ commit, dispatch, state }) {
      localStorage.removeItem('userinfo');
      commit('userinfo', { data: null });
    },
  },
};

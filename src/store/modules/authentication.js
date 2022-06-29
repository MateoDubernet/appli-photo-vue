/* eslint-disable no-unused-vars */
/* eslint-disable no-async-promise-executor */

import { dexieDb } from "@/services/dexie.service"
import AppRouter from "@/router";

export default{
    // Define state
    state: {
        userinfo: JSON.parse( localStorage.getItem('userinfo') ) || null,
        loginError: null,
        registerError: null,
    },

    // Define getters
    getters: {
        userinfo: (state) => state.userinfo,
        loginError: (state) => state.loginError,
        registerError: (state) => state.registerError,
    },

    // Define mutation (eq. setters)
    mutations: {
        userinfo( state, payload){ state.userinfo = payload.data },
    },

    // Define actions
    actions: {
        // Action to register user
        async registerOperation( { commit, dispatch, state }, data, ){
            /* 
                [DEXIE] Save
                Save API response in Dexie
            */
                // Save new snapshot in IndexDB with Dexie.js
                let users = null;
                let uniqueEmail = true;
                let i = 1;

                if (data.email !== null && data.name !== null && data.password !== null) {
                    console.log('test');
                while (users !== undefined) {
                    i = i++;
                    users = await dexieDb['users'].get(i)
                    if (users.email === data.email) {
                        users = undefined;
                        uniqueEmail = false;
                        state.registerError = "Email already used"
                    }
                }

                
                if (uniqueEmail === true) {
                    const newUserId = await dexieDb['users'].add(data);

                    // Get new created snapshoot
                    const newUser = await dexieDb['users'].get(newUserId);
                }else{
                    console.log(this.getters.registerError);
                }
            }else{
                state.registerError = "All Fields required"
            }                 
            },
        
        // Action to login user
        async loginOperation( { commit, dispatch, state }, data ){
            /* 
                [DEXIE] Save
                Save API response in Dexie
            */
           
                // Get new created snapshoot
                if (data.email !== null && data.password !== null) {
                const connectedUser = await dexieDb['users'].get(data);
                
                if(connectedUser){
                    // Save user info in localStorage
                    localStorage.setItem('userinfo', JSON.stringify(connectedUser));
                    
                    /* 
                        [STORE] Update
                        Commit new state with indexed object
                    */
                   
                        commit( 'userinfo', { data: connectedUser } )
                        if (this.getters.userinfo) {

                    /* 
                        TODO: Connected/not connected
                        If a user is connected, the 'HomeView' is not usefull, the dashboard must be the home for a connected user
                        - Find a way to display 'DashboardView' if the user is connected
                    */
                        AppRouter.push({ name: 'DashboardView' })
                        dispatch('resetErrorOperation')
                    }

                } else {
                    state.loginError = "Wrong email or password"
                }
            }else{
                state.loginError = "All Fields required"
            }
        },

        // Action to check user token
        pkceOperation( { commit, dispatch, state }, data ){
            return new Promise( async (resolve, reject) => {
                /* 
                    [DEXIE] Save
                    Save API response in Dexie
                */
                    // Get new created snapshoot
                    const connectedUser = await dexieDb['users'].get(data);
                    if(connectedUser){
                        // Save user info in localStorage
                        localStorage.setItem('userinfo', JSON.stringify(connectedUser));

                        /* 
                            [STORE] Update
                            Commit new state with indexed object
                        */
                            commit( 'userinfo', { data: connectedUser } )

                        // Resolve user access
                        return resolve({ status: 200, value: connectedUser });
                    }
                    else{
                        // Reject user access
                        return resolve({ status: 400, value: null });
                    }
            })
        },

        
        resetErrorOperation: function({ commit, dispatch, state }){
            state.loginError = null;
            state.registerError = null;
        },

        // Action to logout user
        logoutOperation( { commit, dispatch, state }, data ){
            // Delete localStorage to disable auto-connection
            localStorage.removeItem('userinfo');

            /* 
                [STORE] Update
                Delete 'userinfo' stored value to update DOM
            */
                commit( 'userinfo', { data: null } )
        }
    },
}
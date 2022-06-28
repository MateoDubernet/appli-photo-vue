/* eslint-disable no-unused-vars */
/* eslint-disable no-async-promise-executor */

import { dexieDb } from "@/services/dexie.service"
import AppRouter from "@/router";

export default{
    // Define state
    state: {
        userinfo: JSON.parse( localStorage.getItem('userinfo') ) || null,
        loginError: null,
    },

    // Define getters
    getters: {
        userinfo: (state) => state.userinfo,
        loginError: (state) => state.loginError,
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
                const newUserId = await dexieDb['users'].add( data );
                
                // Get new created snapshoot
                const newUser = await dexieDb['users'].get(newUserId);
        },

        // Action to login user
        async loginOperation( { commit, dispatch, state }, data ){
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
                        if (this.getters.userinfo) {
                            AppRouter.push({ name: 'DashboardView' })
                          }
                          console.log(this.getters.userinfo);
                } else {
                    this.state.loginError = "Login Error"
                    console.log(this.state.loginError);
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
    }
}
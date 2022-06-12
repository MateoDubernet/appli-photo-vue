/* 
    [IMPORTS] Module
    Define main module to create store
*/
    // NPM modules
    import { createStore } from "vuex";

    // Store modules
    import authentication from "./modules/authentication";
    import snapshoot from "./modules/snapshoot";

/* 
    [EXPORT] Store
    Define and export store to use it in 'main.js'
*/
    export default createStore({
        modules: {
            authentication: authentication,
            snapshoot: snapshoot
        }
    })
# appli-photo-vue

appli-photo-vue est une application web construite avec Vue.js qui permet de créer des albums et d’y ajouter des photos avec titre et légende. Les albums et photos sont stockés localement via Dexie.js et gérés globalement avec Vuex. Les fonctionnalités de séparation des photos par utilisateur ainsi que la prise de photos n’ont pas pu être implémentées.

## Project Setup
```bash
npm install
```

## Compiles and hot-reloads for development
```bash
npm run serve
```

## Compiles and minifies for production
```bash
npm run build
```

## Lints and fixes files
```bash
npm run lint
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---

## TODOs
1. Display Albums
- File: components/base/BasePushAlbum.vue
    - Sections: template, script → mounted

2. Add Author ID in Snapshoot Value
- File: views/CreateView.vue
    - Sections: script → methods → onSubmit

3. Display Album Snapshoot
- File: views/SingleView.vue
    - Sections: template, script → mounted

4. Create BaseFlashnote
- File: components/base/BaseFlashnote.vue
- Related Store Module: store/modules/authentication.js
    - state
    - getters
    - actions → registerOperation, loginOperation, resetErrorOperation
- Related View: views/HomeView.vue
    - script → methods → resetError

5. Clear Form at Success
- File: components/base/BaseCallToAction.vue
    - script → methods → resetForm

6. Handle Connected / Not Connected User
- File: store/modules/authentication.js
    - actions → loginOperation
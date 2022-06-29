# appli-photo-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## - Add TODO: display albums
See components/base/BasePushAlbum.vue
-> template
-> script -> mounted

## - Add TODO: add author ID in snapshoot value
See views/CreateView.vue
-> script -> methods -> onSubmit

## - Add TODO: display album snapshoot
See views/SingleView.vue
-> template
-> script -> mounted

## - Add TODO: create BaseFlashnote
See components/base/BaseFlashnote.vue

See store/modules/authentication.js
-> state
-> getters
-> actions -> registerOperation
-> actions -> loginOperation
-> actions -> resetErrorOperation

See views/HomeView.vue
-> script -> methods -> resetError

## - Add TODO: clear form at success
See components/base/BaseCallToAction.vue
-> script -> methods -> resetForm

## - Add TODO: Connected/not connected
See store/modules/authentication.js
-> actions -> loginOperation
# appli-photo-vue

## Contexte
appli-photo-vue est une application web construite avec Vue.js qui permet de créer des albums et d’y ajouter des photos avec titre et légende. Les albums et photos sont stockés localement via Dexie.js et gérés globalement avec Vuex. Les fonctionnalités de séparation des photos par utilisateur ainsi que la prise de photos n’ont pas pu être implémentées.

---

## Installation & Lancement
### 1. Cloner le projet
```bash
    git clone <url-du-repo>
    cd <nom-du-dossier>
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer l’application
```bash
npm run serve
```

---

## TODOs
Cela représentes les différentes tâches que j'ai eu à réaliser pour mon devoir.

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

---

## Fonctionnalités

### 1. Accueil et authentification
- Les utilisateurs peuvent se connecter ou créer un compte via le formulaire de la page d’accueil.
- Les erreurs de connexion ou d’inscription sont affichées via des flashnotes.

### 2. Création d’albums et de photos
- Les utilisateurs peuvent créer de nouveaux albums.
- Pour chaque album, il est possible d’ajouter des snapshoots (photos) avec un titre et une légende, l'image n'a pas pu être implémenter.
- Les photos ne sont actuellement pas liées à un utilisateur spécifique, donc tous les albums et photos sont partagés globalement.

### 3. Affichage des albums
- La page Dashboard liste tous les albums créés.
- Chaque album affiche son titre, le nombre de snapshoots qu’il contient et un lien pour voir son contenu.

### 4. Affichage des snapshoots
- La page SingleView permet de visualiser le contenu d’un album et les détails de chaque snapshoot.
- Chaque snapshoot affiche son titre, sa légende, son ID, l’ID de l’album et un champ base64 (pour le stockage éventuel de l’image).

### 5. Navigation
- Le Header contient les liens pour naviguer vers le Dashboard et la création d’albums, ainsi que les informations sur le nombre de photos.
- Le Footer reste toujours visible en bas de la page, quelle que soit la taille du contenu.

### Stockage des données
- Tous les albums, snapshoots et utilisateurs sont sauvegardés localement dans IndexedDB grâce à Dexie.js.
- Le state global est géré avec Vuex, permettant de centraliser les informations des albums, snapshoots et utilisateurs.

---

## Auteur
Projet réalisé dans le cadre de mon alternance.
Développé avec Electron, Node.js et TypeScript.

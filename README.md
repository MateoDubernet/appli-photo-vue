# appli-photo-vue

## Présentation
Projet réalisé durant mon alternance dans le cadre d'un devoir maison.Il s'agit d'une application web construite qui permet de créer des albums et d’y ajouter des photos avec titre et légende.
Les fonctionnalités de séparation des photos par utilisateur ainsi que la prise de photos n’ont pas pu être implémentées par manque de temps.

### Stack Technique
- **Vuejs**.
- **Dexiejs**.
- **Docker**.

---

## Installation & Lancement
### 1. Clonage du dépôt
```bash
    git clone https://github.com/MateoDubernet/appli-photo-vue.git
```

### 2. Lancement (Docker)
**Prérequis :** [Docker Desktop](https://www.docker.com/products/docker-desktop) installé et lancé.

[!IMPORTANT]
Assurez-vous que le port 80 n'est pas déjà utilisé par une autre application sur votre machine avant de lancer le conteneur.

```bash
    cd ./appli-photo-vue
    docker-compose up --build
```

### 3. Accès
Ouvrir un navigateur web et aller à l'adresse: http://localhost

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

import Dexie from 'dexie';

export const dexieDb = new Dexie('appli-photo-vue');

dexieDb.version(1).stores({
  users: '++id, name, email, password',
  snapshoots: '++id, title, caption, base64, author, albumID',
  albums: '++id, title, snapshoots, author',
});

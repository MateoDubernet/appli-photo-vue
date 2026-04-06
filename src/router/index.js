import { createRouter, createWebHistory } from 'vue-router';
import StoreModule from '../store/index';

const routerPaths = [
  {
    path: '/',
    name: 'HomeView',
    meta: { authguard: false },
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/dashboard',
    name: 'DashboardView',
    meta: { authguard: true },
    component: () => import('../views/DashboardView.vue'),
  },
  {
    path: '/add/album',
    name: 'CreateAlbum',
    meta: { authguard: true },
    component: () => import('../views/CreateView.vue'),
  },
  {
    path: '/add/snapshoot/album/:id',
    name: 'CreateSnapshoot',
    meta: { authguard: true },
    component: () => import('../views/CreateView.vue'),
  },
  {
    path: '/single/:type/:id',
    name: 'SingleView',
    meta: { authguard: false },
    component: () => import('../views/SingleView.vue'),
  },
];

const AppRouter = createRouter({
  routes: routerPaths,
  history: createWebHistory(),
});

AppRouter.beforeEach(async (to, from, next) => {
  if (to.meta.authguard) {
    if (StoreModule.getters.userinfo) {
      const connectedUser = await StoreModule.dispatch('pkceOperation', {
        email: StoreModule.getters.userinfo.email,
        password: StoreModule.getters.userinfo.password,
      });

      if (connectedUser.status === 200) {
        next();
      } else {
        next({ name: 'HomeView' });
      }
    } else {
      next({ name: 'HomeView' });
    }
  } else {
    next();
  }
});

export default AppRouter;
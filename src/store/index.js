import { createStore } from 'vuex';

import authentication from './modules/authentication';
import snapshoot from './modules/snapshoot';

export default createStore({
  modules: {
    authentication,
    snapshoot,
  },
});

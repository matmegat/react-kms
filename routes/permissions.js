import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';

export const requireLogin = (store, nextState, replace, cb) => {
  function checkAuth() {
    const { auth } = store.getState();
    if (!auth.get('user')) {
      // oops, not logged in, so can't be here!
      let continueTo = nextState.location.pathname + nextState.location.search;
      continueTo = encodeURIComponent(continueTo);
      replace('/login?continueTo=' + continueTo);
    }
    cb();
  }

  if (!isAuthLoaded(store.getState())) {
    store.dispatch(loadAuth())
      .then(checkAuth)
      .catch(checkAuth);
  } else {
    checkAuth();
  }
};

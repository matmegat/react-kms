import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as formReducer } from 'redux-form';

import wishList from './wishList';
import userVerify from './user/verify';
import auth from './auth';
import portalCurrent from './portal/current';
import courseLoaded from './course/loaded';
import categoriesLoaded from './categories/loaded';
import cart from './cart';
import coursesByAuthor from './course/byAuthor';
import coursesByPortal from './course/byPortal';
import myCourses from './myCourses';

export default combineReducers({
  wishList,
  userVerify,
  courseLoaded,
  auth,
  portalCurrent,
  routing: routerReducer,
  form: formReducer,
  reduxAsyncConnect,
  categoriesLoaded,
  cart,
  coursesByAuthor,
  coursesByPortal,
  myCourses,
});

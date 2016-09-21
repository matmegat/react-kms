import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import config from '../../../config';
import { isLoaded as isPortalLoaded, load as portalLoaded } from 'redux/modules/portal/current';
import { isLoaded as isWishListLoaded, load as wishListLoaded } from 'redux/modules/wishList';
import { isLoaded as isCartLoaded, load as cartLoaded } from 'redux/modules/cart';
import { isLoaded as isMyCoursesLoaded, load as myCoursesLoad } from 'redux/modules/myCourses';
import { isAuthenticated } from 'redux/modules/auth';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!isPortalLoaded(state)) {
      promises.push(dispatch(portalLoaded(state.portalCurrent.get('reqSubdomain'))));
    }
    if (isAuthenticated(state)) {
      if (!isWishListLoaded(state)) {
        promises.push(dispatch(wishListLoaded()));
      }
      if (!isCartLoaded(state)) {
        promises.push(dispatch(cartLoaded()));
      }
      if (!isMyCoursesLoaded(state)) {
        promises.push(dispatch(myCoursesLoad()));
      }
    }
    return Promise.all(promises);
  }
}])
export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <Helmet {...config.app.head}/>
        {this.props.children}
      </div>
    );
  }
}

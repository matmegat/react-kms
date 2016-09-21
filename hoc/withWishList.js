import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import { addToWishList as add, removeFromWishList as remove } from 'redux/modules/wishList';

@connect(
  ({wishList}) => ({
    wishListEntities: wishList.get('entities'),
    wishListOrder: wishList.get('order'),
  }),
  { addToWishList: add, removeFromWishList: remove }
)
export default function withWishList(WrappedComponent) {
  class WithWishList extends Component {
    static propTypes = {
      wishListEntities: PropTypes.object,
      wishListOrder: PropTypes.object,
      addToWishList: PropTypes.func,
      removeFromWishList: PropTypes.func,
    }

    render() {
      const {wishListEntities, wishListOrder, addToWishList, removeFromWishList, ...otherProps} = this.props;
      return (<WrappedComponent { ...otherProps }
        wishList={{entities: wishListEntities, order: wishListOrder, addToWishList, removeFromWishList}}/>);
    }
  }
  return hoistStatics(WithWishList, WrappedComponent);
}

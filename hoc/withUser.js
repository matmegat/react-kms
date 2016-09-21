import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';

@connect(
  ({auth}) => ({
    user: auth.get('user'),
  })
)
export default function withUser(WrappedComponent) {
  class WithUser extends Component {
    static propTypes = {
      user: PropTypes.object,
    }

    render() {
      const props = this.props;
      return (<WrappedComponent { ...props }/>);
    }
  }
  return hoistStatics(WithUser, WrappedComponent);
}

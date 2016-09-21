import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';

@connect(
  ({auth}) => ({
    userId: auth.getIn(['user', 'userId']),
  })
)
export default function withUserId(WrappedComponent) {
  class WithUserId extends Component {
    static propTypes = {
      userId: PropTypes.string,
    }

    render() {
      const props = this.props;
      return (<WrappedComponent { ...props }/>);
    }
  }
  return hoistStatics(WithUserId, WrappedComponent);
}

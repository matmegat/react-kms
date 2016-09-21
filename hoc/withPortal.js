import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';

@connect(
  ({portalCurrent}) => ({
    meta: portalCurrent.get('meta'),
    subDomain: portalCurrent.get('reqSubdomain'),

  }))
export default function withPortalCurrent(WrappedComponent) {
  class WithPortalCurrent extends Component {
    static propTypes = {
      meta: PropTypes.object,
      subDomain: PropTypes.string,
    }

    render() {
      const {meta, subDomain, ...otherProps} = this.props;
      return (<WrappedComponent { ...otherProps }
        portal={{meta, subDomain}}/>);
    }
  }
  return hoistStatics(WithPortalCurrent, WrappedComponent);
}

import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';

@connect(({courseLoaded})=> ({
  courses: courseLoaded.get('entities')
}))

export default function withCourses(WrappedComponent) {
  class WithCourses extends Component {
    static propTypes = {
      courses: PropTypes.object,
    }

    render() {
      const props = this.props;
      return (<WrappedComponent { ...props }/>);
    }
  }
  return hoistStatics(WithCourses, WrappedComponent);
}

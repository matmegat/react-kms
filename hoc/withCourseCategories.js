import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {connect} from 'react-redux';

@connect(
  ({categoriesLoaded}) => ({
    categoryOrders: categoriesLoaded.get('order'),
    categoryEntities: categoriesLoaded.get('entities')
  })
)
export default function withCourseCategories(WrappedComponent) {
  class WithCourseCategories extends Component {
    static propTypes = {
      categoryOrders: PropTypes.object,
      categoryEntities: PropTypes.object,
    }

    render() {
      const {categoryOrders, categoryEntities, ...otherProps} = this.props;
      return (<WrappedComponent { ...otherProps }
        categories={{ entities: categoryEntities, order: categoryOrders }}/>);
    }
  }
  return hoistStatics(WithCourseCategories, WrappedComponent);
}

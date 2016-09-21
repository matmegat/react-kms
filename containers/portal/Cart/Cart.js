import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import {
  PortalLayout,
} from '../index';

import {
  CourseList,
} from 'components';

import {withCourses} from 'hoc';

@connect(
  ({cart}) => ({
    order: cart.get('order'),
  })
)
@withCourses
export default class Cart extends Component {

  static propTypes = {
    courses: PropTypes.object,
    order: PropTypes.object,
  };

  render() {
    const {courses, order} = this.props;
    const breadcrumbs = [
      { url: '/cart', name: 'Cart' },
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="Cart">
          <div className="content-wrapper">
            <Helmet title="Cart"/>
            <div className="content-group">
              <h6 className="text-semibold">My Cart</h6>
            </div>
            <CourseList entities={courses} order={order}/>
          </div>
        </PortalLayout>
      </div>
    );
  }
}

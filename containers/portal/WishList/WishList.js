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
  ({wishList}) => ({
    order: wishList.get('order'),
  })
)
@withCourses
export default class WishList extends Component {

  static propTypes = {
    courses: PropTypes.object,
    order: PropTypes.object,
  };

  render() {
    const {courses, order} = this.props;
    const breadcrumbs = [
      { url: '/wish-list', name: 'Wish list' },
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle={'nour'} title=" - Browse Courses">
          <div className="content-wrapper">
            <Helmet title="My Wish List"/>
            <div className="content-group">
              <h6 className="text-semibold">My wish list </h6>
            </div>
            <CourseList entities={courses} order={order}/>
          </div>
        </PortalLayout>
      </div>
    );
  }
}

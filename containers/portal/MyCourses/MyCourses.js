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
  ({myCourses}) => ({
    order: myCourses.get('order'),
  })
)
@withCourses
export default class MyCourses extends Component {

  static propTypes = {
    courses: PropTypes.object,
    order: PropTypes.object,
  };

  render() {
    const {courses, order} = this.props;
    const breadcrumbs = [
      { url: '/my-courses', name: 'My Courses' },
    ];
    return (
      <div>
        <Helmet title="My Courses"/>
        <PortalLayout breadcrumbs={breadcrumbs} title="My Courses">
          <div className="content-wrapper">
            <div className="content-group">
              <h6 className="text-semibold">My Courses</h6>
            </div>
            <CourseList entities={courses} order={order} myCourses/>
          </div>
        </PortalLayout>
      </div>
    );
  }
}

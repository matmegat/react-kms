import React, { PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { load as loadCourse, isLoaded as isCourseLoaded } from 'redux/modules/course/loaded';
import { isLoaded as isLessonsLoaded, load as loadLessons } from 'redux/modules/lesson/loaded';
import {withCourse} from 'hoc';
@asyncConnect([{
  promise: ({params, store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    if (!isCourseLoaded(state, params.courseName)) {
      promises.push(dispatch(loadCourse(params.courseName)));
    }
    if (!isLessonsLoaded(getState(), params.courseName)) {
      promises.push(dispatch(loadLessons(params.courseName)));
    }
    return Promise.all(promises);
  }
}])

@withCourse

export default class Course extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    course: PropTypes.object,
  }


  render() {
    const {course} = this.props;
    return course ? this.props.children : <span>Course not found</span>;
  }
}

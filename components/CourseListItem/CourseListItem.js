import React, {PropTypes} from 'react';
import {
  Guest, Owner, User
} from './types/index';

const CourseListItem = (props, context) => {
  const {course} = props;
  if (context.user && course.get('authorId') === context.user.get('userId')) {
    return <Owner {...props}/>;
  } else if (context.user && context.user.get('userId')) {
    return <User {...props}/>;
  }
  return <Guest {...props}/>;
};

CourseListItem.contextTypes = {
  user: PropTypes.object,
};

CourseListItem.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseListItem;

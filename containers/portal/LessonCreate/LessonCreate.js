import React, { Component, PropTypes } from 'react';
import { LessonForm } from 'components';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {
  PortalLayout,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../index';
import { add as addLesson } from 'redux/modules/lesson/create';

@connect(
  ({courseLoaded}, ownProps) => ({ course: courseLoaded.getIn(['entities', ownProps.params.courseName]) }),
  { addLesson }
)
export default class LessonAdd extends Component {
  static propTypes = {
    course: PropTypes.object,
    addLesson: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  state = {
    saved: false
  }

  render() {
    const {courseName} = this.props.params;
    const {course} = this.props;

    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Course Mgr' },
      { url: `/author/course/${courseName}`, name: course.get('name') },
      { url: `/author/course/${courseName}/lesson/list`, name: 'Lessons' },
    ];
    return (
      <div>
        <Helmet title="Create Lesson"/>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle="Course Mgr" title={` - ${course.get('name')}`}>
          <PortalAuthorLayout>
            <PortalAuthorCourseLayout params={this.props.params}>
              <LessonForm
                onSubmit={ model => this.props.addLesson(model, course.get('id'), courseName).then(()=> this.setState({saved: true}))}
                submitStatus={this.state.saved}/>
            </PortalAuthorCourseLayout>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}

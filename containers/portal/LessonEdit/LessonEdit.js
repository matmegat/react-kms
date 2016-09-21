import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { LessonForm } from 'components';
import {
  PortalLayout,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../index';
import { editLesson } from 'redux/modules/lesson/edit';
import { load as loadLesson, isLoaded as isLessonLoaded } from 'redux/modules/lesson/edit';

@asyncConnect([{
  promise: ({store: {getState, dispatch}, params}) => {
    const promises = [];
    if (!isLessonLoaded(getState(), params.courseName, params.lessonName)) {
      promises.push(dispatch(loadLesson(params.courseName, params.lessonName)));
    }
    return Promise.all(promises);
  }
}])
@connect(
  ({courseLoaded}, ownProps) => ({
    lessonEdit: courseLoaded.getIn(['entities', ownProps.params.courseName, 'lessons', 'entities', ownProps.params.lessonName]),
    course: courseLoaded.getIn(['entities', ownProps.params.courseName]),
  }),
  { editLesson }
)
export default class LessonEdit extends Component {
  static propTypes = {
    lessonEdit: PropTypes.object,
    course: PropTypes.object,
    editLesson: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  state = {
    saved: false
  }

  render() {
    const {params: { courseName, lessonName }, lessonEdit, course} = this.props;
    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Course Mgr' },
      { url: '/author/course/' + courseName, name: course.get('name') },
      { url: '/author/course/' + courseName + '/lesson/list', name: 'Lessons' },
    ];
    return (
      <div>
        <Helmet title={`Edit Lesson: ${lessonEdit.get('title')}`}/>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle="Course Mgr" title={' - ' + course.get('name')}>
          <PortalAuthorLayout>
            <PortalAuthorCourseLayout params={this.props.params}>
              <LessonForm initialValues={lessonEdit.toJS()}
                          onSubmit={ model => this.props.editLesson(model, lessonEdit.get('courseId'), courseName, lessonName).then(()=>this.setState({saved: true}))}
                          submitStatus={this.state.saved}/>
            </PortalAuthorCourseLayout>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}

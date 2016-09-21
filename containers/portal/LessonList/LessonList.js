import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import Helmet from 'react-helmet';
import { LessonListItem } from 'components';
import {
  PortalLayout,
  PortalAuthorLayout,
  PortalAuthorCourseLayout,
} from '../index';
import { isLoaded, load as loadLessons } from 'redux/modules/lesson/loaded';
import { remove as removeLesson } from 'redux/modules/lesson/remove';

@asyncConnect([{
  promise: ({store: {dispatch, getState}, params}) => {
    const promises = [];
    if (!isLoaded(getState(), params.courseName)) {
      promises.push(dispatch(loadLessons(params.courseName)));
    }
    return Promise.all(promises);
  }
}])

@connect(
  ({lessonLoaded, courseLoaded}, ownProps) => ({
    lessons: courseLoaded.getIn(['entities', ownProps.params.courseName, 'lessons', 'entities']),
    order: courseLoaded.getIn(['entities', ownProps.params.courseName, 'lessons', 'order']),
    course: courseLoaded.getIn(['entities', ownProps.params.courseName])
  }),
  { removeLesson }
)
export default class LessonList extends Component {

  static propTypes = {
    lessons: PropTypes.object,
    order: PropTypes.object,
    course: PropTypes.object,
    params: PropTypes.object.isRequired,
    removeLesson: PropTypes.func.isRequired,
  };

  render() {
    const {params: { courseName }, lessons, course, params, order} = this.props;
    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Course Mgr' },
      { url: `/author/course/${courseName}`, name: course.get('name') },
      { url: `/author/course/${courseName}/lesson/list`, name: 'Lessons' },
    ];
    return (
      <div>
        <Helmet title={`${course.get('name')} lessons`}/>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle="Course Mgr" title={' - ' + course.get('name')}>
          <PortalAuthorLayout>
            <PortalAuthorCourseLayout params={params}>
              <div className="panel panel-flat">
                <div className="panel-heading">
                  <h6 className="panel-title">Lessons</h6>
                  <div className="heading-elements">
                    <Link to={'/author/course/' + courseName + '/lesson/add'} className="btn btn-warning btn-xs">Add
                      Lesson <i className="icon-pen-plus position-right"></i></Link>
                  </div>
                </div>
                <div className="panel-body">
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover table-lg">
                    <thead>
                    <tr className="bg-blue">
                      <th className="col-md-6 col-sm-6">Lesson Title</th>
                      <th className="col-md-3 col-sm-3">Last Modified</th>
                      <th className="col-md-3 col-sm-3"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.map(lesson => {
                      return (<LessonListItem key={lessons.getIn([lesson, 'id'])} lesson={lessons.get(lesson)}
                                              onRemove={this.props.removeLesson}
                                              courseName={courseName}/>);
                    })}
                    </tbody>
                  </table>
                </div>
              </div>
            </PortalAuthorCourseLayout>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}

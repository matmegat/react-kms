import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import {
  PortalLayout,
  CategoriesList,
} from '../index';
import {
  CourseList,
} from 'components';
import { load, isLoaded as isPublicListLoaded } from 'redux/modules/course/byPortal';
import { load as loadCategories, isLoaded as isCategoriesLoaded } from 'redux/modules/categories/loaded';
import {withCourses, withPortal} from 'hoc';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    const portalCurrent = state.portalCurrent;
    const portalMeta = portalCurrent.get('meta');
    // Load categories
    if (!isCategoriesLoaded(state)) {
      promises.push(dispatch(loadCategories(portalMeta.get('slug'))));
    }
    // Load all courses
    if (!isPublicListLoaded(state)) {
      promises.push(dispatch(load(portalMeta.get('slug'))));
    }
    return Promise.all(promises);
  }
}])
@connect(
  ({coursesByPortal, categoriesLoaded}, ownProps) => ({
    order: coursesByPortal.get('order'),
    activeCategory: categoriesLoaded.getIn(['entities', ownProps.params.categoryName]),
  })
)
@withCourses
@withPortal

export default class CourseListPublic extends Component {

  static propTypes = {
    courses: PropTypes.object,
    order: PropTypes.object,
    portal: PropTypes.object,
    activeCategory: PropTypes.object,
  };

  render() {
    const {courses, order, portal, activeCategory} = this.props;
    const portalName = portal.meta.get('name');
    const breadcrumbs = [
      { url: `/courses/${activeCategory.get('slug')}`, name: activeCategory.get('category') },
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} boldTitle={portalName} title=" - Browse Courses">
          <Helmet title={portalName}/>
          <div className="sidebar sidebar-main sidebar-default">
            <div className="sidebar-content">
              <CategoriesList activeCategory={activeCategory}/>
            </div>
          </div>
          <div className="content-wrapper">
            <div className="content-group">
              <h6 className="text-semibold">Course List </h6>
            </div>
            <CourseList
              entities={courses}
              order={order}
              activeCategory={activeCategory}/>
          </div>
        </PortalLayout>
      </div>
    );
  }
}

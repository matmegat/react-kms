import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {CourseForm} from 'components';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import {
  PortalLayout,
  PortalAuthorLayout
} from '../index';
import { create as courseCreate } from 'redux/modules/course/create';
import { load as loadCategories, isLoaded as isCategoriesLoaded } from 'redux/modules/categories/loaded';
import { withPortal, withUser } from 'hoc';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    const state = getState();
    const portalMeta = state.portalCurrent.get('meta');
    // Load categories
    if (!isCategoriesLoaded(state)) {
      promises.push(dispatch(loadCategories(portalMeta.get('slug'))));
    }
    return Promise.all(promises);
  }
}])
@connect(
  null,
  { courseCreate }
)
@withPortal
@withUser
export default class CourseCreate extends Component {

  static propTypes = {
    user: PropTypes.object,
    portal: PropTypes.object,
    courseCreate: PropTypes.func,
  };

  state = {
    saved: false
  }

  render() {
    const breadcrumbs = [
      { url: '/author', name: 'Author' },
      { url: '/author/course/list', name: 'Create a Course' }
    ];
    const {portal, user} = this.props;
    const initialFormValues = {
      level: 'all',
      language: 'English',
      category: 'General',
      duration: 500,
      thumbnail: '',
      authorId: user.get('userId'),
      author: user.toJS()
    };
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="Create a Course">
          <PortalAuthorLayout>
            <Helmet title="Create Course"/>
            <CourseForm initialValues={initialFormValues}
                        onSubmit={ model => this.props.courseCreate(portal.meta.get('id'), model).then(()=> this.setState({saved: true})) }
                        submitStatus={this.state.saved}/>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}

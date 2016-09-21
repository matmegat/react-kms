import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {SET_REQ_SUBDOMAIN} from 'redux/modules/portal/current';

import {
  App,
  PortalLogin,
  Dashboard,
  LessonList,
  LessonAdd,
  LessonEdit,
  CourseCreate,
  CourseList,
  CourseEdit,
  CourseAccounting,
  AuthorContainer,
  CoursesByCategory,
  WishList,
  Cart,
  CourseView,
  MyCourses,
  Home,
} from '../containers/portal';
import {
  Root,
  NotFound,
  Course,
  CheckOut,
} from '../containers/shared';

export default (params) => {
  const {store, subdomain} = params;
  store.dispatch({
    type: SET_REQ_SUBDOMAIN,
    subdomain: subdomain
  });
  return (
    <Route component={Root}>
      <Route path="/" component={App}>
        { /* Sub routes */ }
        <IndexRoute component={Home}/>
        <Route path="login" component={PortalLogin}/>
        <Route path="wish-list" component={WishList}/>
        <Route path="cart" component={Cart}/>
        <Route path="my-courses" component={MyCourses}/>

        <Route path="courses">
          <IndexRoute component={Home}/>
          <Route path=":categoryName" component={CoursesByCategory}/>
        </Route>
        <Route path="check-out" component={CheckOut}/>

        <Route path="course">
          <Route path=":courseName" component={Course}>
            <IndexRoute component={CourseView}/>
          </Route>
        </Route>

        <Route path="author" component={AuthorContainer}>
          <IndexRoute component={Dashboard}/>
          <Route path="course">
            <IndexRoute component={CourseList}/>
            <Route path="create" component={CourseCreate}/>
            <Route path="list" component={CourseList}/>
            <Route path=":courseName" component={Course}>
              <IndexRoute component={CourseEdit}/>
              <Route path="goals" component={CourseEdit}/>
              <Route path="accounting" component={CourseAccounting}/>
              <Route path="lesson/list" component={LessonList}/>
              <Route path="lesson/add" component={LessonAdd}/>
              <Route path="lesson/:lessonName/edit" component={LessonEdit}/>
            </Route>
          </Route>
        </Route>
        { /* Catch all route */ }
        <Route path="*" component={NotFound}/>
      </Route>
    </Route>
  );
};

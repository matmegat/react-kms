import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {CourseView} from 'components';
import { connect } from 'react-redux';
import {withWishList, withCart, withCourse} from 'hoc';

import {
  PortalLayout,
} from '../index';

import { rate } from 'redux/modules/course/rate';
import { signup } from 'redux/modules/user/create';

@connect(
  null,
  { rate, signup }
)
@withCart
@withWishList
@withCourse
export default class CourseViewContainer extends Component {

  static propTypes = {
    auth: PropTypes.object,
    course: PropTypes.object,
    rate: PropTypes.func,
    params: PropTypes.object,
    wishList: PropTypes.object,
    cart: PropTypes.object,
  };

  render() {
    const {params: {courseName}, course, wishList, cart} = this.props;
    const breadcrumbs = [
      { url: `/course/${course.get('slug')}`, name: course.get('name') }
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="View Course">
          <Helmet title={course.get('name')}/>
          <CourseView course={course}
                      isWishListItem={!!wishList.entities.get(courseName)}
                      isCartItem={!!cart.entities.get(courseName)}
                      addToWishList={wishList.addToWishList}
                      removeFromWishList={wishList.removeFromWishList}
                      addToCart={cart.addToCart}
                      removeFromCart={cart.removeFromCart}
                      onRate={(rateValue)=> this.props.rate({rate: rateValue, courseId: course.get('id')})}/>
        </PortalLayout>
      </div>
    );
  }
}

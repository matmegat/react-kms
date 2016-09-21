import React, { Component, PropTypes } from 'react';
import {
  CourseListItem,
  SignupModal,
} from 'components';
import { connect } from 'react-redux';
import {withWishList, withCart, withUser} from 'hoc';

import { signup } from 'redux/modules/user/create';

@connect(
  null,
  { signup }
)

@withWishList
@withCart
@withUser

export default class CourseList extends Component {
  static propTypes = {
    entities: PropTypes.object,
    order: PropTypes.object,
    wishList: PropTypes.object,
    user: PropTypes.object,
    cart: PropTypes.object,
    activeCategory: PropTypes.object,
    signup: PropTypes.func,
    myCourses: PropTypes.bool,
  };

  state = {
    signUpModalOpen: false,
    signUpSubmitting: false,
  }

  onCloseSignupModal = () => {
    this.setState({ signUpModalOpen: false, signUpSubmitting: this.state.signUpSubmitting });
  }

  onClickLoginRequiredLink = (ev) => {
    const {user} = this.props;
    if (!user || !user.get('sessionToken')) {
      ev.preventDefault();
      ev.stopPropagation();
      this.setState({ signUpModalOpen: true, signUpSubmitting: this.state.signUpSubmitting });
    }
  }

  onSignupFormSubmit = (model) => {
    this.setState({ signUpModalOpen: true, signUpSubmitting: true });
    return this.props.signup(model)
      .then(() => this.setState({ signUpModalOpen: false, signUpSubmitting: false }));
  }

  render() {
    const { wishList, entities, order, activeCategory, cart, myCourses } = this.props;
    const { signUpModalOpen, signUpSubmitting } = this.state;
    return (
      <div>
        <div className="row">
          {
            order.map(courseName => {
              const course = entities.get(courseName);
              if (!activeCategory || course.get('category').indexOf(activeCategory.get('category')) > -1) {
                return (
                  <CourseListItem addToWishList={wishList.addToWishList}
                                  removeFromWishList={wishList.removeFromWishList}
                                  isWishListItem={!!wishList.entities.get(courseName)}
                                  addToCart={cart.addToCart}
                                  removeFromCart={cart.removeFromCart}
                                  isCartItem={!!cart.entities.get(courseName)}
                                  key={course.get('id')}
                                  course={course}
                                  onClickLoginRequiredLink={this.onClickLoginRequiredLink}
                                  myCourses={myCourses}/>
                );
              }
              return '';
            })
          }
        </div>
        <SignupModal
          show={signUpModalOpen}
          onHide={this.onCloseSignupModal}
          onSubmit={this.onSignupFormSubmit}
          submitting={signUpSubmitting}/>
      </div>
    );
  }
}

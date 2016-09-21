import React from 'react';
import {Link} from 'react-router';
import PriceDisplay from '../../PriceDisplay/PriceDisplay';

const User = ({course, addToWishList, isWishListItem, removeFromWishList, addToCart, isCartItem, removeFromCart, myCourses}) => {
  let courseImage = course.get('thumbnail');
  if (!courseImage) {
    courseImage = '/assets/images/placeholder.jpg';
  }
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="thumbnail">
        <div className="thumb"
             style={{ backgroundImage: 'url(' + courseImage + ')', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '100%' }}>
          <img src={courseImage} alt="Course Thumbnail" style={{ display: 'none' }}/>
          <div className="caption-overflow">
            <span>
              {myCourses ?
                <Link to={`/course/${course.get('slug')}`}
                  className="btn border-white text-white btn-flat btn-icon btn-rounded"><i
                  className="icon-arrow-right7"></i></Link>
                :
                ''
              }
              {!myCourses ?   // eslint-disable-line no-nested-ternary
                (!isCartItem ?
                  <a href="javascript:void(0)" onClick={()=> addToCart(course)}
                    className="btn border-white text-white btn-flat btn-icon btn-rounded"><i
                    className="icon-plus3"></i></a>
                  :
                  <a href="javascript:void(0)" onClick={()=> removeFromCart(course)}
                    className="btn border-white text-white btn-flat btn-icon btn-rounded"><i
                    className="icon-minus3"></i></a>)
                :
                ''
              }
              {!myCourses ?   // eslint-disable-line no-nested-ternary
                (!isWishListItem ?
                  <a href="javascript:void(0)" onClick={()=> addToWishList(course)}
                     className="btn border-white text-white btn-flat btn-icon btn-rounded ml-5"><i
                    className="icon-heart6"></i></a>
                  :
                  <a href="javascript:void(0)" onClick={()=> removeFromWishList(course)}
                     className="btn border-white text-white btn-flat btn-icon btn-rounded ml-5"><i
                    className="icon-heart5"></i></a>)
                :
                ''
              }
            </span>
          </div>
        </div>
        <div className="caption">
          <Link to={`/course/${course.get('slug')}`} className="text-default">
            <h6 className="no-margin-top text-semibold">{course.get('name')}</h6>
          </Link>
          <hr className="no-margin-top mb-10"/>
          <div className="clearfix">
            <div className="pull-left">
              Price <strong className="btn-block clearfix"><PriceDisplay
              coursePrice={course.get('coursePrice')}/></strong>
            </div>
          </div>
          <hr className="no-margin-top mb-10 mt-10"/>
          <div className="media no-margin-top">
            <div className="media-left media-middle">
              <a href="#">
                <img src="/assets/images/placeholder.jpg" className="img-responsive" alt=""/>
              </a>
            </div>
            <div className="media-body">
              <div className="media-heading text-semibold">{`${course.getIn(['author', 'firstName'])} ${course.getIn(['author', 'lastName'])}`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;

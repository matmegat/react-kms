import React, {PropTypes} from 'react';

import Rating from 'react-rating';

const CourseRate = ({avgRate, onChange}) => {
  return (
    <Rating empty={<i className="fa fa-star-o"/>}
            full={<i className="fa fa-star"/>}
            initialRate={avgRate}
            onChange={onChange}/>
  );
};

CourseRate.propTypes = {
  avgRate: PropTypes.number,
  onChange: PropTypes.func,
};

export default CourseRate;

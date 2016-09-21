import React from 'react';

/**
 * Created by noursammour on 16/05/16.
 */
const PriceDisplay = ({coursePrice}) => {
  let res = '';
  if (!coursePrice.get('paid')) {
    res = 'Free';
  } else {
    switch (coursePrice.get('currency').toLowerCase()) {
      case 'euro':
        res = '€';
        break;
      default:
        res = '$';
        break;
    }
    res += coursePrice.get('price');
  }
  return <span>{res}</span>;
};

export default PriceDisplay;

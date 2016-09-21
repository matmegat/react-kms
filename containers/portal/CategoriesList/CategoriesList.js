import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import {
  CourseListCategoryItem,
} from 'components';
import { withCourseCategories } from 'hoc';

@withCourseCategories
export default class CategoriesList extends Component {

  static propTypes = {
    categories: PropTypes.object,
    activeCategory: PropTypes.object,
  }

  render() {
    const {activeCategory, categories: {entities, order}} = this.props;
    return (
      <div className="category-content no-padding">
        {activeCategory ? <Helmet title={activeCategory.get('category')}/> : <span/>}
        <ul className="navigation navigation-main navigation-accordion">
          {order.map(categoryId => {
            const category = entities.get(categoryId);
            return (
              <CourseListCategoryItem category={category} key={category.get('slug')}
                                      isActiveCategory={activeCategory && category.get('slug') === activeCategory.get('slug')}/>
            );
          })}
        </ul>
      </div>
    );
  }
}

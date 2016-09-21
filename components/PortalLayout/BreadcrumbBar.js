import React, { Component, PropTypes } from 'react';
import Breadcrumb from './Breadcrumb';

export default class BreadcrumbBar extends Component {

  static propTypes = {
    breadcrumbs: PropTypes.array.isRequired
  }

  render() {
    const {breadcrumbs} = this.props;
    return (
      <div className="breadcrumb-line">
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </div>
    );
  }
}

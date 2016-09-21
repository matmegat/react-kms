import React, {Component, PropTypes} from 'react';

export default class PageHeader extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div className="page-header">
        {this.props.children}
      </div>
    );
  }
}

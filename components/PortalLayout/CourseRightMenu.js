import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class CourseRightMenu extends Component {
  static propTypes = {
    courseName: PropTypes.string,
  }
  render() {
    const {courseName} = this.props;
    return (
      <div className="panel panel-flat">
        <div className="panel-heading">
          <h6 className="panel-title">Navigation</h6>
        </div>
        <div className="list-group no-border no-padding-top">
          <Link activeClassName="active" to={'/author/course/' + courseName + '/goals'} className="list-group-item"><i className="icon-user"></i> Goals</Link>
          <Link activeClassName="active" to={'/author/course/' + courseName + '/accounting'} className="list-group-item"><i className="icon-cash3"></i> Accounting</Link>
          <Link activeClassName="active" to={'/author/course/' + courseName + '/lesson/list'} className="list-group-item"><i className="icon-tree7"></i> Curriculum <span className="badge bg-danger pull-right">2</span></Link>
        </div>
      </div>
    );
  }
}

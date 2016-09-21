import React, {Component} from 'react';
import activeComponent from 'react-router-active-component';
const NavLink = activeComponent('li');

export default class SideMenu extends Component {
  render() {
    return (
      <div className="category-content no-padding">
        <ul className="navigation navigation-main navigation-accordion">
          <li className="navigation-header"><span>Main</span> <i className="icon-menu" title="Main pages"></i></li>
          <NavLink to="/author" onlyActiveOnIndex><i className="icon-home4"></i> <span>Dashboard</span></NavLink>
          <NavLink to="/author/course"><i className="icon-home4"></i>
            <span>Course Mgr</span></NavLink>
        </ul>
      </div>
    );
  }
}

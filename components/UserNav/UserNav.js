import React from 'react';
import { Link } from 'react-router';

const UserNav = ({loggedIn = false, logout}) => {
  let res;
  if (loggedIn) {
    res = (<ul className="nav navbar-nav pull-right">
      <li className="nav-item">
        <a className="nav-link" onClick={()=>logout()} href="javascript:void(0)">Logout</a>
      </li>
    </ul>);
  } else {
    res = (<ul className="nav navbar-nav pull-right">
      <li className="nav-item dropdown">
        <Link className="nav-link active" to="/login">Login</Link>
      </li>
    </ul>);
  }
  return res;
};

UserNav.propTypes = {};

export default UserNav;

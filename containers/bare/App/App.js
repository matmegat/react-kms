import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import config from '../../../config';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import {UserNav} from 'components';
import {connect} from 'react-redux';

import {logout} from 'redux/modules/auth';

@asyncConnect([{
  promise: ({store: {}}) => {
    const promises = [];
    return Promise.all(promises);
  }
}])

@connect(null, { logout })

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    logout: PropTypes.func,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    user: PropTypes.object,
  };

  render() {
    const logoImage = require('./knexpert.png');
    const { user} = this.context;
    return (
      <div>
        <div className="navbar-bottom login-container">
          <Helmet {...config.app.head}/>
          <Navbar className="bg-blue" fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                  <img src={logoImage} alt="KNExpert"/>
                </IndexLink>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse eventKey={0}>
              <Nav navbar>
                {!this.context.user
                  ? <LinkContainer to="/account-portal-create">
                  <NavItem eventKey={2}>Create account & Portal</NavItem>
                </LinkContainer>
                  : null}
                {this.context.user ?
                  <LinkContainer to="/create-portal">
                    <NavItem eventKey={3}>Create Portal</NavItem>
                  </LinkContainer>
                  : null }
              </Nav>
              <UserNav logout={this.props.logout} user={user} loggedIn={!!user}/>
            </Navbar.Collapse>
          </Navbar>
          <div>
            {this.props.children}
          </div>
        </div>
      </div>

    );
  }
}

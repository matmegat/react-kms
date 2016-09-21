import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Login } from '../../shared';
import { PortalLayout } from '../index';
import { userLogin } from 'redux/modules/auth';

@connect(null, { userLogin })
export default class PortalLogin extends Component {

  static propTypes = {
    userLogin: PropTypes.func.isRequired,
    location: PropTypes.object,
  };

  render() {
    const {location} = this.props;
    const breadcrumbs = [
      { url: '/login', name: 'Login' }
    ];
    return (
      <div>
        <PortalLayout breadcrumbs={breadcrumbs} title="Login">
          <Helmet title="Login"/>
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-md-offset-4">
                <Login location={location} />
              </div>
            </div>
          </div>
        </PortalLayout>
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { LoginForm } from 'components';
import { userLogin } from 'redux/modules/auth';

@connect(null, { userLogin })
export default class Login extends Component {

  static propTypes = {
    userLogin: PropTypes.func.isRequired,
    location: PropTypes.object,
  };

  render() {
    const {continueTo} = this.props.location.query;
    return (
      <div>
        <Helmet title="Login"/>
        <div className="page-container">
          <div className="page-content">
            <div className="content-wrapper">
              <LoginForm onSubmit={ model => this.props.userLogin(model, continueTo)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

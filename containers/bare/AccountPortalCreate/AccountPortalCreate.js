import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {AccountPortalForm} from 'components';
import { connect } from 'react-redux';
import { createWithPortal as userCreateWithPortal } from 'redux/modules/user/create';
import config from '../../../config';

@connect(null, { userCreateWithPortal })
export default class AccountPortalCreate extends Component {

  static propTypes = {
    userCreateWithPortal: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <Helmet title="Home"/>
        <div className="page-container">
          <div className="page-content">
            <div className="content-wrapper">
              <AccountPortalForm
                onSubmit={ model => this.props
                .userCreateWithPortal(model)
                .then(()=>location.href = `${location.protocol}//${model.portalName}.${config.mainDomain}`)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

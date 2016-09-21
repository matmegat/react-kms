import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { PasswordForgetForm } from 'components';
import { sendResetToken } from 'redux/modules/password/forget';

@connect(null, { sendResetToken })
export default class PasswordForget extends Component {

  static propTypes = {
    sendResetToken: PropTypes.func.isRequired,
  };

  state = {
    saved: false
  };

  render() {
    const { saved } = this.state;
    return (
      <div>
        <Helmet title="Forget Password"/>
        <div className="page-container">
          <div className="page-content">
            <div className="content-wrapper">
              <PasswordForgetForm saved={saved}
                                  onSubmit={ model => this.props.sendResetToken(model.email).then(()=> this.setState({saved: true}))}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

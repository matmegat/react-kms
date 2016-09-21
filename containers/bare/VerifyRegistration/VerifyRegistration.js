import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {verifyEmail, resend} from 'redux/modules/user/verify';

@connect(({userVerify})=>({
  loading: userVerify.get('loading'),
  loaded: userVerify.get('loaded'),
  verified: userVerify.get('verified'),
  sentAgain: userVerify.get('sentAgain'),

}), { verifyEmail, resend })
export default class VerifyRegistration extends Component {

  static propTypes = {
    verifyEmail: PropTypes.func,
    resend: PropTypes.func,
    location: PropTypes.object,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    verified: PropTypes.bool,
    sentAgain: PropTypes.bool,

  }

  componentDidMount() {
    const {loading, loaded} = this.props;
    if (!loading && !loaded) {
      this.props.verifyEmail(this.props.location.query.token);
    }
  }

  render() {
    const {loaded, verified, sentAgain} = this.props;
    let res = null;

    if (!loaded) {
      res = (<div className="panel panel-flat">
        <div className="panel-heading">
          <h6 className="panel-title"><span>Loading</span></h6>
        </div>
      </div>);
    } else if (verified) {
      res = (<div className="panel panel-flat">
        <div className="panel-heading">
          <h6 className="panel-title"><span className="text-success">Verified successfully</span></h6>
        </div>
      </div>);
    } else {
      res = (<div className="panel panel-flat">
        <div className="panel-heading">
          <h6 className="panel-title"><span className="text-danger">Something went wrong</span></h6>
        </div>
        <div className="panel-body">
          {!sentAgain
            ? <a href="javascript:void(0)" onClick={()=> this.props.resend(this.props.location.query.email)}> send again </a>
            : <span>Check your inbox</span>
          }
        </div>
      </div>);
    }
    return (
      <div>
        <Helmet title="Home"/>
        <div className="page-container">
          <div className="page-content">
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                {res}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

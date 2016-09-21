import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router';
import validate from './validate';

@reduxForm({
  form: 'PasswordResetForm',
  validate,
})
export default class PasswordForgetForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    saved: PropTypes.bool,
    error: PropTypes.string
  }

  serverError(error) {
    let res = <span/>;
    if (error) {
      res = (<div className="alert bg-danger alert-styled-left" role="alert">
        <strong>{error}</strong>
      </div> );
    }
    return res;
  }

  savedSuccess() {
    return (<div className="panel panel-flat login-form">
      <div className="panel-heading">
        <h6 className="panel-title text-success">Password reset successfully</h6>
      </div>

      <div className="panel-body">
        You can use your new password to <Link to="/login">login</Link>
      </div>
    </div>);
  }

  render() {
    const {
      handleSubmit,
      submitting,
      saved,
      error
      } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit} autoComplete="off">
          {!saved
            ? <div className="panel panel-body login-form">
            <div className="text-center">
              <div className="icon-object border-warning text-warning"><i className="icon-spinner11"></i></div>
              <h5 className="content-group">Password recovery
                <small className="display-block">We'll send you instructions in email</small>
              </h5>
            </div>
            {this.serverError(error)}
            <div className="form-group has-feedback">
              <Field name="password" component={password =>
                          <div>
                            <input type="password" className="form-control" {...password} placeholder="Create password"/>
                            {password.touched && password.error && <label className="validation-error-label">{password.error}</label>}
                          </div>
                        }/>
              <div className="form-control-feedback">
                <i className="icon-user-lock text-muted"></i>
              </div>
            </div>
            <div className="form-group has-feedback">
              <Field name="confirmPassword" component={confirmPassword =>
                          <div>
                            <input type="password" className="form-control" {...confirmPassword} placeholder="Repeat password"/>
                            {confirmPassword.touched && confirmPassword.error && <label className="validation-error-label">{confirmPassword.error}</label>}
                          </div>
                        }/>
              <div className="form-control-feedback">
                <i className="icon-user-lock text-muted"></i>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" disabled={submitting} className="btn bg-blue btn-block">Reset password<i
                className="icon-arrow-right14 position-right"></i></button>
            </div>
          </div>
            : this.savedSuccess()}
        </form>
      </div>
    );
  }
}

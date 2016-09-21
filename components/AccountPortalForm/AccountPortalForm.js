import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import asyncValidate from './asyncValidate';
import {Link} from 'react-router';
import validate from './validate';

@reduxForm({
  form: 'AccountPortalForm',
  validate,
  asyncValidate,
  asyncBlurFields: ['username', 'portalName']
})

export default class AccountPortalForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    error: PropTypes.string
  }

  errorRender(error) {
    let res = <span/>;
    if (error) {
      res = (<div className="alert bg-danger alert-styled-left" role="alert">
        <strong>Oh snap!</strong> {error}
      </div> );
    }
    return res;
  }

  render() {
    const {
      handleSubmit,
      error
      } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-lg-offset-3">
              <div className="panel registration-form">
                <div className="panel-body">
                  <div className="text-center">
                    <div className="icon-object border-success text-success"><i className="icon-plus3"></i></div>
                    <h5 className="content-group-lg">Create account &amp; Portal
                      <small className="display-block">All fields are required</small>
                    </h5>
                  </div>
                  {this.errorRender(error)}
                  <div className="form-group has-feedback">
                    <Field name="username"
                           component={username =>
                      <div>
                        <input type="text" className="form-control" {...username} onChange={event=>username.onBlur(event)} placeholder="Choose username"/>
                        {username.touched && username.error && <label className="validation-error-label">{username.error}</label>}
                      </div>
                      }/>
                    <div className="form-control-feedback">
                      <i className="icon-user-plus text-muted"></i>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group has-feedback">
                        <Field name="firstName" component={firstName =>
                          <div>
                            <input type="text" className="form-control" {...firstName} placeholder="First name"/>
                            {firstName.touched && firstName.error && <label className="validation-error-label">{firstName.error}</label>}
                          </div>
                        }/>
                        <div className="form-control-feedback">
                          <i className="icon-user-check text-muted"></i>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group has-feedback">
                        <Field name="lastName" component={lastName =>
                          <div>
                            <input type="text" className="form-control" {...lastName} placeholder="Last name"/>
                            {lastName.touched && lastName.error && <label className="validation-error-label">{lastName.error}</label>}
                          </div>
                        }/>
                        <div className="form-control-feedback">
                          <i className="icon-user-check text-muted"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
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
                    </div>
                    <div className="col-md-6">
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
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group has-feedback">
                        <Field name="email" component={email =>
                          <div>
                            <input type="text" className="form-control" {...email} placeholder="Email"/>
                            {email.touched && email.error && <label className="validation-error-label">{email.error}</label>}
                          </div>
                        }/>
                        <div className="form-control-feedback">
                          <i className="icon-mention text-muted"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group has-feedback">
                    <Field name="portalName" component={portalName =>
                          <div>
                            <input type="text" className="form-control" {...portalName} onChange={event=>portalName.onBlur(event)} placeholder="Choose Portal name"/>
                            {portalName.touched && portalName.error && <span className="validation-error-label">{portalName.error}</span>}
                          </div>
                        }/>
                    <div className="form-control-feedback">
                      <i className="icon-user-plus text-muted"></i>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="checkbox">
                      <label>
                        <Field name="isPersonal" component={isPersonal =>
                          <div>
                            <input type="checkbox" className="styled" {...isPersonal} placeholder="Personal Portal"/>
                            <a href="#">Personal Portal</a>
                          </div>
                        }/>
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <Field name="isPublic" component={isPublic =>
                          <div>
                            <input type="checkbox" className="styled" {...isPublic} placeholder="Last name"/>
                            Publically available
                          </div>
                        }/>
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <Field name="isAccepted" component={isAccepted =>
                          <div>
                            <input type="checkbox" className="styled" {...isAccepted} placeholder="terms of service"/>
                               Accept <a href="#">terms of service</a>
                               {isAccepted.touched && isAccepted.error && <span className="validation-error-label">{isAccepted.error}</span>}
                          </div>
                        }/>
                      </label>
                    </div>
                  </div>
                  <div>
                    <Link to="/login" className="btn btn-link"><i className="icon-arrow-left13 position-left"></i>
                      Already a Knexpert? click to login
                    </Link>
                    <button type="submit" className="btn bg-teal-400 btn-labeled btn-labeled-right ml-10 pull-right">
                      <b><i className="icon-plus3"></i></b> Create account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

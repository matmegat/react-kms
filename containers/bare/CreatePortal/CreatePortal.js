import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { CreatePortalForm } from 'components';
import { connect } from 'react-redux';
import { createPortal } from 'redux/modules/portal/create';
import {withUserId} from 'hoc';

@connect(
  null,
  { createPortal }
)
@withUserId
export default class CreatePortal extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired,
    createPortal: PropTypes.func.isRequired,
  };

  render() {
    const {userId} = this.props;
    return (
      <div>
        <Helmet title="Create Portal"/>
        <div className="page-container">
          <div className="page-content">
            <div className="content-wrapper">
              <CreatePortalForm onSubmit={ model => this.props.createPortal(model, userId) }/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

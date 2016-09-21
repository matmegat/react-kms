import React, {Component, PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import {SignupForm} from 'components';

export default class SignupModal extends Component {

  static propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    error: PropTypes.string
  }

  render() {
    const {show, onHide, onSubmit, submitting, error} = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Body>
          <SignupForm onSubmit={onSubmit} submitting={submitting} error={error}/>
        </Modal.Body>
      </Modal>
    );
  }
}

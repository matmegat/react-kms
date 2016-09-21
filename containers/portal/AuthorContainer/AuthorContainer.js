import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import { replace } from 'react-router-redux';
import { withUserId, withPortal} from 'hoc';

@connect(null, { replace })
@withUserId
@withPortal
export default class AuthorContainer extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    userId: PropTypes.string,
    location: PropTypes.object.isRequired,
    portal: PropTypes.object,
    replace: PropTypes.func
  }

  componentWillMount() {
    const { userId, portal } = this.props;
    if (userId !== portal.meta.get('ownerId')) {
      let continueTo = this.props.location.pathname + this.props.location.search;
      continueTo = encodeURIComponent(continueTo);
      this.props.replace('/login?continueTo=' + continueTo);
    }
  }

  render() {
    return this.props.children;
  }
}

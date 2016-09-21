import React, { Component, PropTypes } from 'react';

import {connect} from 'react-redux';
import {updateCoverImage} from 'redux/modules/portal/edit';
import {withPortal, withUser} from 'hoc';

import {
  ProfileCover,
  ProfileToolbar,
  CourseRightMenu
} from 'components';

@connect(null, { updateCoverImage })

@withPortal
@withUser
export default class PortalAuthorCourseLayout extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    params: PropTypes.object,
    portal: PropTypes.object,
    user: PropTypes.object,
    updateCoverImage: PropTypes.func.isRequired,
  };

  render() {
    const { portal, user } = this.props;
    const {courseName} = this.props.params;
    return (
      <div>
        <ProfileCover portal={portal.meta} user={user} updateCoverImage={this.props.updateCoverImage}/>
        <ProfileToolbar />
        <div className="row">
          <div className="col-lg-9">
            <div className="tabbable">
              <div className="tab-content">
                <div className="tab-pane fade in active">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <CourseRightMenu courseName={courseName}/>
          </div>
        </div>
      </div>
    );
  }
}

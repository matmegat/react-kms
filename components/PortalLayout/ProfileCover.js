import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';

export default class ProfileCover extends Component {
  static propTypes = {
    updateCoverImage: PropTypes.func.isRequired,
    portal: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  onDrop = (files)=> {
    const { portal } = this.props;
    const req = superagent.post('/upload');
    files.forEach((file)=> {
      req.attach('thumbnail', file);
    });
    req.end((err, { body } = {})=> {
      if (err) {
        alert(JSON.stringify(err));
      } else {
        this.props.updateCoverImage(portal.toJS(), body.url);
      }
    });
  }

  render() {
    const { portal, user } = this.props;
    return (
      <div className="profile-cover">
        <div className="profile-cover-img"
             style={{backgroundImage: `url('${portal.get('coverImage')}')`}}></div>
        <div className="media">
          <div className="media-left">
            <a href="#" className="profile-thumb">
              <img src={user.get('image')} className="img-circle" alt=""/>
            </a>
          </div>
          <div className="media-body">
            <h1>{`${user.get('firstName')} ${user.get('lastName')}`}
              <small className="display-block">{user.get('email')}</small>
            </h1>
          </div>
          <div className="media-right media-middle">
            <ul className="list-inline list-inline-condensed no-margin-bottom text-nowrap">
              <li>
                <Dropzone
                  accept="image/*" className="action"
                  style={{height: 40}}
                  multiple={false} onDrop={this.onDrop}>
                  <a href="javascript:void(0)" className="btn btn-default"><i
                    className="icon-file-picture position-left"></i> Cover image</a>
                </Dropzone>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

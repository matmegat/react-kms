import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';

export default class SideProfile extends Component {

  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func,
    updateImage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onMenuToggle = this.onMenuToggle.bind(this);
  }

  state = {
    opened: false,
  };

  onDrop = (files)=> {
    const { user } = this.props;
    const req = superagent.post('/upload');
    files.forEach((file)=> {
      req.attach('thumbnail', file);
    });
    req.end((err, { body } = {})=> {
      if (err) {
        alert(JSON.stringify(err));
      } else {
        this.props.updateImage(user.toJS(), body.url);
      }
    });
  }

  onMenuToggle(ev) {
    ev.preventDefault();
    this.setState({ opened: !this.state.opened });
  }

  render() {
    const {logout, user} = this.props;
    const {opened} = this.state;
    return (
      user ? <div className="sidebar-category sidebar-category-visible">
        <div className="sidebar-user-material">
          <div className="category-content">

            <Dropzone
              accept="image/*" className="action"
              style={{height: 110}}
              multiple={false} onDrop={this.onDrop}>
              <div className="sidebar-user-material-content">
                <a href="javascript:void(0)">
                  <img src={user.get('image')}
                       className="img-circle img-responsive" alt=""/></a>
                <h6>{`${user.get('firstName')} ${user.get('lastName')}`}</h6>
              </div>
            </Dropzone>
            <div className="sidebar-user-material-menu">
              <a href="#" data-toggle="collapse" onClick={this.onMenuToggle}><span>My account</span> <i
                className="caret"></i></a>
            </div>
          </div>
          <div className={'navigation-wrapper collapse' + (opened ? ' in' : '')} id="user-nav">
            <ul className="navigation">
              <li><a onClick={()=>logout()} href="javascript:void(0)"><i className="icon-switch2"></i>
                <span>Logout</span></a></li>
            </ul>
          </div>
        </div>
      </div>
        : <span/>
    );
  }
}

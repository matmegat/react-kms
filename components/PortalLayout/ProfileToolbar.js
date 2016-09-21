import React, {Component} from 'react';

export default class ProfileToolbar extends Component {
  render() {
    return (
      <div className="navbar navbar-default navbar-xs navbar-component no-border-radius-top">
        <ul className="nav navbar-nav visible-xs-block">
          <li className="full-width text-center"><a data-toggle="collapse" data-target="#navbar-filter"><i className="icon-menu7"></i></a></li>
        </ul>
        <div className="navbar-collapse collapse" id="navbar-filter">
          <ul className="nav navbar-nav">
            <li className="active"><a href="#activity" data-toggle="tab"><i className="icon-menu7 position-left"></i> Activity</a></li>
          </ul>
          <div className="navbar-right">
            <ul className="nav navbar-nav">
              <li><a href="#"><i className="icon-collaboration position-left"></i> Share URL</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

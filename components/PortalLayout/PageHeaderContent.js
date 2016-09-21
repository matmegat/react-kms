import React, {Component, PropTypes} from 'react';
import { goBack } from 'react-router-redux';
import {connect} from 'react-redux';

@connect(null, { goBack })
export default class PageHeaderContent extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    boldTitle: PropTypes.string,
    goBack: PropTypes.func,
  }

  render() {
    const {title, boldTitle} = this.props;
    return (
      <div className="page-header-content">
        <div className="page-title">
          <h4>
            <a href="javascript:void(0)" onClick={()=>this.props.goBack()}> <i
              className="icon-arrow-left52 position-left"></i>
            </a>&nbsp;
            {
              boldTitle ? <span className="text-semibold">{boldTitle}</span> : <span></span>
            }
            {title}
          </h4>
        </div>
      </div>
    );
  }
}

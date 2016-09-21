import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {
  PortalLayout,
  PortalAuthorLayout,
} from '../index';

export default class Dashboard extends Component {

  render() {
    const breadcrumbs = [
      { url: '/author', name: 'Author' }
    ];
    return (
      <div>
        <Helmet title="Dashboard"/>
        <PortalLayout breadcrumbs={breadcrumbs} title="Author Dashboard">
          <PortalAuthorLayout>
            <span>Dashboard here</span>
          </PortalAuthorLayout>
        </PortalLayout>
      </div>
    );
  }
}

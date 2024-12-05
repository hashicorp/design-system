/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import EmberRouter from '@ember/routing/router';
import config from 'website/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('about');
  this.route('foundations');
  this.route('components');
  this.route('patterns');
  this.route('content');

  this.route('error');

  // this will be removed later
  this.route('testing');
  // this is a fake route that we use for the "how to use" and "showcase" sections
  this.route('my.page.route', { path: 'my/*path' });
  // this is a catch-all route that points any path not matched above to the "show" route
  this.route('show', { path: '*path' });
});

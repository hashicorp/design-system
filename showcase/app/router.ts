/**
 * Minimal router for bundle size benchmarking
 */

import EmberRouter from '@ember/routing/router';
import config from 'showcase/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('page-layouts', { path: 'layouts' }, function () {
    this.route('app-frame', function () {
      this.route('frameless', function () {
        this.route('demo-full-app-frame-with-app-header-and-app-side-nav');
      });
    });
  });
});

import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('foundations', function () {
    this.route('tokens');
    this.route('typography');
    this.route('elevation');
  });
  this.route('components', function () {
    this.route('badge');
    this.route('button');
    this.route('card');
    this.route('icon-tile');
    this.route('link', function () {
      this.route('standalone', { path: '/' });
    });
    this.route('link-to', function () {
      this.route('standalone', { path: '/' });
    });
  });
  this.route('content', function () {
    this.route('writing-guidelines');
  });
});

import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('components', function () {
    this.route('badge');
    this.route('button');
    this.route('card');
    this.route('icon-tile');
  });
});

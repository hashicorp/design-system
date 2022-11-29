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
  // this is a catch-all route that points any path not matched above to the "show" route
  this.route('show', { path: '*path' });
});

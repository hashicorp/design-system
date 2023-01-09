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

  // we don't have to add an error route, Ember automatically looks for it
  // see https://guides.emberjs.com/release/routing/loading-and-error-substates/#toc_error-substates
  // this.route('error');

  // this will be removed later
  this.route('testing');
  // this is a fake route that we use for the "how to use" and "showcase" sections
  this.route('my.page.route', { path: 'my/*path' });
  // this is a catch-all route that points any path not matched above to the "show" route
  this.route('show', { path: '*path' });
});

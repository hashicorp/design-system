import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('foundations', function () {
    this.route('tokens');
    this.route('colors');
    this.route('typography');
    this.route('elevation');
    this.route('focus-ring');
  });
  this.route('components', function () {
    this.route('alert');
    this.route('badge');
    this.route('breadcrumb');
    this.route('button');
    this.route('button-set');
    this.route('card');
    this.route('dropdown');
    this.route('form', function () {
      this.route('base-elements');
      this.route('checkbox');
      this.route('radio');
      this.route('select');
      this.route('text-input');
      this.route('textarea');
      this.route('toggle');
    });
    this.route('icon-tile');
    this.route('link', function () {
      this.route('inline');
      this.route('standalone');
    });
    this.route('stepper');
    this.route('tag');
    this.route('toast');
    this.route('gutters');
  });
  this.route('content', function () {
    this.route('writing-guidelines');
  });
  this.route('utilities', function () {
    this.route('disclosure');
    this.route('interactive');
  });
  this.route('helpers', function () {
    this.route('gutters');
  });
});

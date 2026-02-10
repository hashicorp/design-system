/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import EmberRouter from '@ember/routing/router';
import config from 'showcase/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('page-foundations', { path: 'foundations' }, function () {
    this.route('typography');
    this.route('elevation');
    this.route('focus-ring');
    this.route('breakpoints', function () {
      this.route('frameless', function () {
        this.route('demo-viewport-breakpoints-visualization');
        this.route('demo-viewport-breakpoints-visualization-with-ui-shell');
        this.route('demo-viewport-breakpoints-page-padding');
      });
    });
    this.route('theming', function () {
      this.route('frameless', function () {
        this.route('demo-application-with-theme-switcher');
      });
    });
  });
  this.route('page-components', { path: 'components' }, function () {
    this.route('accordion');
    this.route('advanced-table', function () {
      this.route('frameless', function () {
        this.route('demo-filtering');
      });
    });
    this.route('alert');
    this.route('app-footer');
    this.route('app-header', function () {
      this.route('frameless', function () {
        this.route('demo-responsiveness');
      });
    });
    this.route('app-side-nav', function () {
      this.route('frameless', function () {
        this.route('demo-responsiveness');
        this.route('demo-remove-from-dom');
      });
    });
    this.route('application-state');
    this.route('badge');
    this.route('badge-count');
    this.route('breadcrumb');
    this.route('button');
    this.route('button-set');
    this.route('card');
    this.route('code-block');
    this.route('code-editor');
    this.route('dropdown');
    this.route('filter-bar');
    this.route('flyout');
    this.route('form', function (): void {
      this.route('frameless', function (): void {
        this.route('demo-form-basic');
        this.route('demo-form-complex');
      });
      this.route('layout');
      this.route('base-elements');
      this.route('checkbox');
      this.route('file-input');
      this.route('key-value-inputs', function () {
        this.route('frameless', function () {
          this.route('demo-responsiveness');
          this.route('demo-responsiveness-custom-widths');
          this.route('demo-in-form');
          this.route('demo-flows');
        });
      });
      this.route('masked-input');
      this.route('radio');
      this.route('select');
      this.route('super-select');
      this.route('text-input');
      this.route('textarea');
      this.route('toggle');
      this.route('radio-card');
    });
    this.route('icon');
    this.route('icon-tile');
    this.route('link', function () {
      this.route('inline');
      this.route('standalone');
    });
    this.route('modal');
    this.route('page-header');
    this.route('pagination', function () {
      this.route('frameless', function () {
        this.route('demo-responsiveness');
      });
    });
    this.route('reveal');
    this.route('rich-tooltip');
    this.route('segmented-group');
    this.route('separator');
    this.route('stepper', function () {
      this.route('indicator');
      this.route('list');
      this.route('nav');
      this.route('frameless', function () {
        this.route('demo-responsiveness');
      });
    });
    this.route('table');
    this.route('tag', function () {
      this.route('frameless', function () {
        this.route('demo-observer-performance');
      });
    });
    this.route('text');
    this.route('time');
    this.route('toast');
    this.route('tabs');
    this.route('tooltip');
    this.route('copy', function () {
      this.route('button');
      this.route('snippet');
    });
  });
  this.route('page-layouts', { path: 'layouts' }, function () {
    this.route('app-frame', function () {
      this.route('frameless', function () {
        this.route('demo-full-app-frame');
        this.route('demo-full-app-frame-with-modal');
        this.route('demo-full-app-frame-with-app-header');
        this.route('demo-full-app-frame-with-app-header-and-app-side-nav');
        this.route('demo-full-app-frame-with-advanced-table');
        this.route('demo-full-app-frame-with-advanced-table-filtering');
      });
    });
    this.route('flex');
    this.route('grid', function (): void {
      this.route('frameless', function (): void {
        this.route('demo-full-app-frame-with-grid-responsive');
      });
    });
  });
  this.route('page-utilities', { path: 'utilities' }, function () {
    this.route('dialog-primitive');
    this.route('disclosure-primitive');
    this.route('dismiss-button');
    this.route('interactive');
    this.route('popover-primitive');
  });
  this.route('page-overrides', { path: 'overrides' }, function () {
    this.route('power-select');
  });
  this.route(
    'page-internationalization',
    { path: 'internationalization' },
    function () {
      this.route('translation');
    },
  );
  this.route('page-carbonization', { path: 'carbonization' }, function () {
    this.route('foundations', function () {
      this.route('color');
      this.route('typography');
      this.route('focus-ring');
    });
    this.route('components', function () {
      this.route('badge');
      this.route('badge-count');
      this.route('button');
      this.route('form', function (): void {
        this.route('text-input');
        this.route('radio-card');
      });
      this.route('icon-tile');
      this.route('modal');
      this.route('segmented-group');
    });
  });
});

/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import EmberApp from 'ember-strict-application-resolver';
import EmberRouter from '@ember/routing/router';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start as qunitStart, setupEmberOnerrorValidation } from 'ember-qunit';
import { setTesting } from '@embroider/macros';
import {
  DEFAULT_A11Y_TEST_HELPER_NAMES,
  setEnableA11yAudit,
  setRunOptions,
  setupGlobalA11yHooks,
  shouldForceAudit,
} from 'ember-a11y-testing/test-support';
import IntlService from 'ember-intl/services/intl';
import PortalService from 'ember-stargate/services/-portal';

import HdsIconRegistryService from '#src/services/hds-icon-registry.ts';
import HdsIntlService from '#src/services/hds-intl.ts';
import HdsThemingService from '#src/services/hds-theming.ts';
import HdsTimeService from '#src/services/hds-time.ts';
import loadSpriteEmpty from '#src/instance-initializers/load-sprite-empty.ts';

// compiled from source, so rendered components look like they do in apps
import '#src/styles/@hashicorp/design-system-components.scss';
import '#src/styles/@hashicorp/design-system-power-select-overrides.scss';
import './styles.css';

// TEMPORARY: loose-mode power-select / basic-dropdown registration. Remove this
// import (and tests/power-select-modules.ts) once we move to power-select@9 /
// basic-dropdown@9 (strict-mode). See that file for details.
import { powerSelectTestModules } from './power-select-modules.ts';

class Router extends EmberRouter {
  location = 'none';
  rootURL = '/';
}

class TestApp extends EmberApp {
  modules = {
    './router': Router,
    // ember-basic-dropdown reads `config:environment` at render time
    './config/environment': { default: { APP: {} } },
    './services/intl': IntlService,
    './services/hds-icon-registry': HdsIconRegistryService,
    './services/hds-intl': HdsIntlService,
    './services/hds-theming': HdsThemingService,
    './services/hds-time': HdsTimeService,
    // backs `Hds::AppSideNav::Portal`
    './services/-portal': PortalService,
    ...powerSelectTestModules,
  };
}

// the strict resolver doesn't pick up the addon's instance initializers
TestApp.instanceInitializer({ name: 'load-sprite-empty', ...loadSpriteEmpty });

// the showcase routes that the link tests point at
Router.map(function () {
  this.route('page-components', { path: 'components' }, function () {
    this.route('dropdown');
    this.route('pagination');
  });
  this.route('page-utilities', { path: 'utilities' }, function () {
    this.route('interactive');
  });
});

export function start() {
  setTesting(true);
  setApplication(
    TestApp.create({
      autoboot: false,
      rootElement: '#ember-testing',
    })
  );

  setupGlobalA11yHooks(() => true, {
    helpers: [
      ...DEFAULT_A11Y_TEST_HELPER_NAMES,
      'render',
      'tab',
      'focus',
      'select',
    ],
  });

  setRunOptions({
    runOnly: {
      type: 'tag',
      values: [
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
        'wcag22aa',
        'best-practice',
      ],
    },
    // @ts-expect-error: This is a valid option
    include: [['#ember-testing-container']],
    exclude: [['.flight-sprite-container']],
  });

  // run the audits with the `enableA11yAudit` query param
  if (shouldForceAudit()) {
    setEnableA11yAudit(true);
  }

  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();
}

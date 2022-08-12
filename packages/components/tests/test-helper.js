import Application from 'dummy/app';
import config from 'dummy/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import {
  DEFAULT_A11Y_TEST_HELPER_NAMES,
  setRunOptions,
  setupGlobalA11yHooks,
} from 'ember-a11y-testing/test-support';

setApplication(Application.create(config.APP));

setupGlobalA11yHooks(() => true, {
  helpers: [...DEFAULT_A11Y_TEST_HELPER_NAMES, 'render', 'tab'],
});

setRunOptions({
  runOnly: {
    type: 'tag',
    values: [
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
      'best-practice',
      'ACT',
    ],
  },
});

setup(QUnit.assert);

start();

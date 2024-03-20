/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Application from 'website/app';
import config from 'website/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import { setRunOptions } from 'ember-a11y-testing/test-support';

setApplication(Application.create(config.APP));

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
      'EN-301-549',
      'ACT',
    ],
  },
  include: [['#ember-testing-container']],
});

setup(QUnit.assert);

start();

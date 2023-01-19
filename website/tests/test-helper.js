import Application from 'website/app';
import config from 'website/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import { setRunOptions } from 'ember-a11y-testing/test-support';

setApplication(Application.create(config.APP));

setRunOptions({
  rules: {
    'color-contrast': { enabled: false },
    list: { enabled: false },
  },
});

setup(QUnit.assert);

start();

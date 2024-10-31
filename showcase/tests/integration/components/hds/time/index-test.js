/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/time/index', function (hooks) {
  setupRenderingTest(hooks);

  // let service;

  // hooks.beforeEach(function () {
  //   service = this.owner.lookup('service:intl');
  //   service.setLocale('en-us');
  // });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <Hds::Time @date="05 September 2018 14:48" id="test-time" />
    `);
    assert.dom('#test-time').hasClass('hds-time');
  });

  // OPTIONS

  // hasTooltip
  test('it should render the component with a tooltip by default', async function (assert) {
    await render(hbs`
      <Hds::Time @date="05 September 2018 14:48" />
    `);
    assert.dom('.hds-tooltip-button').exists();
  });

  test('it should render the component without a tooltip', async function (assert) {
    await render(hbs`
      <Hds::Time @date="05 September 2018 14:48" @hasTooltip={{false}} />
    `);
    assert.dom('.hds-tooltip-button').doesNotExist();
  });

  // display
  // TODO: Add tests for the different display options
});

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/charts/meter/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    this.data = [
      { group: 'Test group 1', value: 30 },
      { group: 'Test group 2', value: 70 },
    ];

    await render(
      hbs`<Hds::Charts::Meter @data={{this.data}} @title="Test meter" id="test-charts-meter" />`,
    );
    assert.dom('#test-charts-meter').hasClass('hds-charts-meter');
  });
});

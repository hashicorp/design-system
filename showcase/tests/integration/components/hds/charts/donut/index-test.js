/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/charts/donut/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    this.data = [
      { group: 'group 1', value: 2 },
      { group: 'group 2', value: 4 },
    ];

    await render(
      hbs`<Hds::Charts::Donut @data={{this.data}} @title="Test donut" id="test-charts-donut" />`,
    );
    assert.dom('#test-charts-donut').hasClass('hds-charts-donut');
  });
});

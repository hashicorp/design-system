/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/charts/bar/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    this.data = [
      { date: '2025-01', value: 1000 },
      { date: '2025-02', value: 1500 },
    ];

    await render(
      hbs`<Hds::Charts::Bar @data={{this.data}} @title="Test bar" id="test-charts-bar" />`,
    );
    assert.dom('#test-charts-bar').hasClass('hds-charts-bar');
  });
});

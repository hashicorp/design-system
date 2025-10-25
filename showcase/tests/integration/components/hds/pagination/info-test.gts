/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Info from "@hashicorp/design-system-components/components/hds/pagination/info/index";

module('Integration | Component | hds/pagination/info', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template>
      <Info @itemsRangeStart={{1}} @itemsRangeEnd={{10}} @totalItems={{100}} id="test-pagination-info" />
    </template>);
    assert.dom('#test-pagination-info').hasClass('hds-pagination-info');
  });

  // CONTENT

  test('it should show the passed in itemsRangeStart and itemsRangeEnd values', async function (assert) {
    await render(<template>
      <Info @itemsRangeStart={{1}} @itemsRangeEnd={{10}} @totalItems={{103}} />
    </template>);
    assert.dom('.hds-pagination-info').hasText('1–10 of 103');
  });

  test('it should not display the totalItems when showTotalItems is set to false', async function (assert) {
    await render(<template>
    <Info @itemsRangeStart={{1}} @itemsRangeEnd={{10}} @totalItems={{100}} @showTotalItems={{false}} />
    </template>);
    assert.dom('.hds-pagination-info').doesNotIncludeText('of 100');
  });
});

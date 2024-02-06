/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/button-set/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::ButtonSet id="test-button-set" />`);
    assert.dom('#test-button-set').hasClass('hds-button-set');
  });

  test('it should render a child button component', async function (assert) {
    await render(
      hbs`
        <Hds::ButtonSet id="test-button-set">
          <Hds::Button @text="test button" />
        </Hds::ButtonSet>
      `
    );
    assert.dom('#test-button-set .hds-button').exists();
  });
});

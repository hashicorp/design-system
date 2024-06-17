/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/app-header/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::AppHeader id="test-app-header" />`);
    assert.dom('#test-app-header').hasClass('hds-app-header');
  });

  // CONTENT

  test('it renders content passed into the globalItems and utilityItems named blocks', async function (assert) {
    await render(hbs`
      <Hds::AppHeader>
        <:globalItems><span id="test-global-item">Global Item</span></:globalItems>
        <:utilityItems><span id="test-utility-item">Utility Item</span></:utilityItems>
      </Hds::AppHeader>
    `);
    assert.dom('#test-global-item').hasText('Global Item');
    assert.dom('#test-utility-item').hasText('Utility Item');
  });
});

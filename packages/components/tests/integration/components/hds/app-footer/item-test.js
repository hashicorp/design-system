/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/app-footer/item', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<ul><Hds::AppFooter::Item id="test-item" /></ul>`);
    assert.dom('#test-item').hasClass('hds-app-footer__list-item');
  });

  // CONTENT

  test('it renders text content yielded within the Item', async function (assert) {
    await render(
      hbs`<ul><Hds::AppFooter::Item id="test-item">Custom item</Hds::AppFooter::Item></ul>`
    );
    assert.dom('#test-item').hasText('Custom item');
  });
});

/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsAppFooterItem } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/app-footer/item', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <ul><HdsAppFooterItem id="test-item" /></ul>
      </template>,
    );
    assert.dom('#test-item').hasClass('hds-app-footer__list-item');
  });

  // CONTENT

  test('it renders text content yielded within the Item', async function (assert) {
    await render(
      <template>
        <ul><HdsAppFooterItem id="test-item">Custom item</HdsAppFooterItem></ul>
      </template>,
    );
    assert.dom('#test-item').hasText('Custom item');
  });
});

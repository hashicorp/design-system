/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { click, render } from '@ember/test-helpers';

import { HdsFormToggleBase } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/toggle/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsFormToggleBase id="test-form-toggle" /></template>,
    );
    // Notice: the "toggle" component has a slightly different DOM structure than the other form controls
    assert.dom('.hds-form-toggle').exists();
    assert.dom('.hds-form-toggle > #test-form-toggle').exists();
    assert.dom('#test-form-toggle').hasClass('hds-form-toggle__control');
  });

  // ACCESSIBILITY

  test('it should render with the correct role', async function (assert) {
    await render(
      <template><HdsFormToggleBase id="test-form-toggle" /></template>,
    );
    assert.dom('#test-form-toggle').hasAttribute('role', 'switch');
  });

  test('it should render aria-checked="false" by default', async function (assert) {
    await render(
      <template><HdsFormToggleBase id="test-form-toggle" /></template>,
    );
    assert.dom('#test-form-toggle').hasAttribute('aria-checked', 'false');
  });

  test('it should render aria-checked="true" when checked', async function (assert) {
    await render(
      <template>
        <HdsFormToggleBase id="test-form-toggle" checked="checked" />
      </template>,
    );
    assert.dom('#test-form-toggle').hasAttribute('aria-checked', 'true');
  });

  test('it should render aria-checked="false" when checked="mixed"', async function (assert) {
    await render(
      <template>
        <HdsFormToggleBase id="test-form-toggle" checked="mixed" />
      </template>,
    );

    assert.dom('#test-form-toggle').hasAttribute('checked', 'mixed');
    assert.dom('#test-form-toggle').hasAttribute('aria-checked', 'false');
  });

  test('it should keep aria-checked in sync with checked when toggled', async function (assert) {
    await render(
      <template><HdsFormToggleBase id="test-form-toggle" /></template>,
    );

    assert.dom('#test-form-toggle').isNotChecked();
    assert.dom('#test-form-toggle').hasAttribute('aria-checked', 'false');

    await click('#test-form-toggle');

    assert.dom('#test-form-toggle').isChecked();
    assert.dom('#test-form-toggle').hasAttribute('aria-checked', 'true');

    await click('#test-form-toggle');

    assert.dom('#test-form-toggle').isNotChecked();
    assert.dom('#test-form-toggle').hasAttribute('aria-checked', 'false');
  });
  // role="switch"
});

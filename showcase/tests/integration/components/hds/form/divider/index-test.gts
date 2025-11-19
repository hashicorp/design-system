/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsFormSeparator } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/separator/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsFormSeparator id="test-form-separator" /></template>,
    );
    assert.dom('#test-form-separator').hasClass('hds-form__separator');
  });

  // OPTIONS

  // isFullWidth
  test(`it should have the default max-width if no @isFullWidth prop is declared`, async function (assert) {
    await render(
      <template><HdsFormSeparator id="test-form-separator" /></template>,
    );
    assert
      .dom('#test-form-separator')
      .doesNotHaveClass('hds-form-content--is-full-width');
  });

  test(`if @isFullWidth is true, it should not have a max-width set`, async function (assert) {
    await render(
      <template>
        <HdsFormSeparator id="test-form-separator" @isFullWidth={{true}} />
      </template>,
    );
    assert
      .dom('#test-form-separator')
      .hasClass('hds-form-content--is-full-width');
  });
});

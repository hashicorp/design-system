/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Base from "@hashicorp/design-system-components/components/hds/form/textarea/base";

module('Integration | Component | hds/form/textarea/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><Base id="test-form-textarea" /></template>);
    assert.dom('#test-form-textarea').hasClass('hds-form-textarea');
  });

  test('it should set aria-describedby and id arguments if pass @id or @ariaDescribedBy', async function (assert) {
    await render(
      <template><Base @id="custom-id" @ariaDescribedBy="custom-description-id" /></template>,
    );
    assert
      .dom('#custom-id')
      .exists()
      .hasAria('describedby', 'custom-description-id');
  });

  // VALUE

  test('it should render the input with the value provided via @value argument', async function (assert) {
    await render(
      <template><Base @value="abc123" id="test-form-textarea" /></template>,
    );
    assert.dom('#test-form-textarea').hasValue('abc123');
  });

  // ROWS

  test('it should render the textarea with the default number of rows', async function (assert) {
    await render(<template><Base /></template>);
    assert.dom('textarea').hasAttribute('rows', '4');
  });
  test('it should render the textarea with a custom number of rows', async function (assert) {
    await render(<template><Base rows="2" /></template>);
    assert.dom('textarea').hasAttribute('rows', '2');
  });

  // INVALID

  test('it should render the correct CSS class if the @isInvalid prop is declared', async function (assert) {
    await render(
      <template><Base id="test-form-textarea" @isInvalid={{true}} /></template>,
    );
    assert.dom('#test-form-textarea').hasClass('hds-form-textarea--is-invalid');
  });
});

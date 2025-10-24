/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import Base from "@hashicorp/design-system-components/components/hds/form/text-input/base";

module('Integration | Component | hds/form/text-input/base', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><Base id="test-form-text-input" /></template>);
    assert.dom('#test-form-text-input').hasClass('hds-form-text-input');
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

  // TYPE

  test('it should render the "text" type if no type is declared', async function (assert) {
    await render(<template><Base id="test-form-text-input" /></template>);
    assert.dom('#test-form-text-input').hasAttribute('type', 'text');
  });
  test('it should render the correct type depending on the @type prop', async function (assert) {
    this.set('type', 'email');
    await render(
      <template><Base @type={{this.type}} id="test-form-text-input" /></template>,
    );
    assert.dom('#test-form-text-input').hasAttribute('type', 'email');
    this.set('type', 'datetime-local');
    assert.dom('#test-form-text-input').hasAttribute('type', 'datetime-local');
  });

  // VALUE

  test('it should render the input with the value provided via @value argument', async function (assert) {
    await render(
      <template><Base @value="abc123" id="test-form-text-input" /></template>,
    );
    assert.dom('#test-form-text-input').hasValue('abc123');
  });

  // INVALID

  test('it should render the correct CSS class if the @isInvalid prop is declared', async function (assert) {
    await render(
      <template><Base id="test-form-text-input" @isInvalid={{true}} /></template>,
    );
    assert
      .dom('#test-form-text-input')
      .hasClass('hds-form-text-input--is-invalid');
  });

  // IS LOADING

  test('it should render the correct CSS class if the @isLoading prop is declared', async function (assert) {
    await render(
      <template><Base id="test-form-text-input" @type="search" @isLoading={{true}} /></template>,
    );
    assert
      .dom('#test-form-text-input')
      .hasClass('hds-form-text-input--is-loading');
  });

  // WIDTH

  test('it should render the input with a fixed width if a @width value is passed', async function (assert) {
    await render(
      <template><Base @width="248px" id="test-form-text-input" /></template>,
    );
    assert.dom('#test-form-text-input').hasStyle({ width: '248px' });
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @type is provided', async function (assert) {
    const errorMessage =
      '@type for "Hds::Form::TextInput" must be one of the following: text, email, password, url, date, time, datetime-local, search, month, week, tel; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(<template><Base @type="foo" /></template>);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});

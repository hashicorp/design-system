/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import {
  render,
  resetOnerror,
  setupOnerror,
  settled,
} from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsFormTextInputBase } from '@hashicorp/design-system-components/components';
import type { HdsFormTextInputTypes } from '@hashicorp/design-system-components/components/hds/form/text-input/types';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/text-input/base', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsFormTextInputBase id="test-form-text-input" /></template>,
    );
    assert.dom('#test-form-text-input').hasClass('hds-form-text-input');
  });

  test('it should set aria-describedby and id arguments if pass @id or @ariaDescribedBy', async function (assert) {
    await render(
      <template>
        <HdsFormTextInputBase
          @id="custom-id"
          @ariaDescribedBy="custom-description-id"
        />
      </template>,
    );
    assert
      .dom('#custom-id')
      .exists()
      .hasAria('describedby', 'custom-description-id');
  });

  // TYPE

  test('it should render the "text" type if no type is declared', async function (assert) {
    await render(
      <template><HdsFormTextInputBase id="test-form-text-input" /></template>,
    );
    assert.dom('#test-form-text-input').hasAttribute('type', 'text');
  });
  test('it should render the correct type depending on the @type prop', async function (assert) {
    const context = new TrackedObject<Record<'type', HdsFormTextInputTypes>>({
      type: 'email',
    });

    await render(
      <template>
        <HdsFormTextInputBase
          @type={{context.type}}
          id="test-form-text-input"
        />
      </template>,
    );
    assert.dom('#test-form-text-input').hasAttribute('type', 'email');

    context.type = 'datetime-local';
    await settled();
    assert.dom('#test-form-text-input').hasAttribute('type', 'datetime-local');
  });

  // VALUE

  test('it should render the input with the value provided via @value argument', async function (assert) {
    await render(
      <template>
        <HdsFormTextInputBase @value="abc123" id="test-form-text-input" />
      </template>,
    );
    assert.dom('#test-form-text-input').hasValue('abc123');
  });

  // INVALID

  test('it should render the correct CSS class if the @isInvalid prop is declared', async function (assert) {
    await render(
      <template>
        <HdsFormTextInputBase id="test-form-text-input" @isInvalid={{true}} />
      </template>,
    );
    assert
      .dom('#test-form-text-input')
      .hasClass('hds-form-text-input--is-invalid');
  });

  // IS LOADING

  test('it should render the correct CSS class if the @isLoading prop is declared', async function (assert) {
    await render(
      <template>
        <HdsFormTextInputBase
          id="test-form-text-input"
          @type="search"
          @isLoading={{true}}
        />
      </template>,
    );
    assert
      .dom('#test-form-text-input')
      .hasClass('hds-form-text-input--is-loading');
  });

  // WIDTH

  test('it should render the input with a fixed width if a @width value is passed', async function (assert) {
    await render(
      <template>
        <HdsFormTextInputBase @width="248px" id="test-form-text-input" />
      </template>,
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
    await render(
      <template>
        {{! @glint-expect-error - testing invalid component usage }}
        <HdsFormTextInputBase @type="foo" />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});

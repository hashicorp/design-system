/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, click } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsFormKeyValueInputsAddRowButton } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/form/key-value-inputs/add-row-button',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFormKeyValueInputsAddRowButton
            id="test-form-key-value-add-row-button"
          />
        </template>,
      );
      assert
        .dom('#test-form-key-value-add-row-button')
        .hasClass('hds-form-key-value-inputs__add-row-button');
    });

    // TEXT

    test('it should render with default text', async function (assert) {
      await render(
        <template>
          <HdsFormKeyValueInputsAddRowButton
            id="test-form-key-value-add-row-button"
          />
        </template>,
      );
      assert.dom('#test-form-key-value-add-row-button').hasText('Add row');
    });

    test('it should render text from `@text` argument', async function (assert) {
      await render(
        <template>
          <HdsFormKeyValueInputsAddRowButton
            @text="Custom text"
            id="test-form-key-value-add-row-button"
          />
        </template>,
      );
      assert.dom('#test-form-key-value-add-row-button').hasText('Custom text');
    });

    // CALLBACKS

    test('it should call `@onClick` action when clicked', async function (assert) {
      const context = new TrackedObject({
        isClicked: false,
      });

      const onClick = () => {
        context.isClicked = true;
      };

      await render(
        <template>
          <HdsFormKeyValueInputsAddRowButton
            @onClick={{onClick}}
            id="test-form-key-value-add-row-button"
          />
        </template>,
      );

      await click('#test-form-key-value-add-row-button');
      assert.ok(context.isClicked);
    });

    // ACCESSIBILITY

    test('it should provide an `aria-description` attribute', async function (assert) {
      await render(
        <template>
          <HdsFormKeyValueInputsAddRowButton
            id="test-form-key-value-add-row-button"
          />
        </template>,
      );
      assert
        .dom('#test-form-key-value-add-row-button')
        .hasAttribute(
          'aria-description',
          /.+/,
          'aria-description should not be empty',
        );
    });
  },
);

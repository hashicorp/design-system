/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/key-value-inputs/add-row-button',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Form::KeyValueInputs::AddRowButton id="test-form-key-value-add-row-button" />`,
      );
      assert
        .dom('#test-form-key-value-add-row-button')
        .hasClass('hds-form-key-value-inputs__add-row-button');
    });

    test('it should render with default text', async function (assert) {
      await render(
        hbs`<Hds::Form::KeyValueInputs::AddRowButton id="test-form-key-value-add-row-button" />`,
      );
      assert.dom('#test-form-key-value-add-row-button').hasText('Add row');
    });

    test('it should render text from `@text` argument', async function (assert) {
      await render(
        hbs`<Hds::Form::KeyValueInputs::AddRowButton @text="Custom text" id="test-form-key-value-add-row-button" />`,
      );
      assert.dom('#test-form-key-value-add-row-button').hasText('Custom text');
    });

    test('it should call `@onClick` action when clicked', async function (assert) {
      let clicked = false;
      this.set('onClick', () => {
        clicked = true;
      });

      await render(
        hbs`<Hds::Form::KeyValueInputs::AddRowButton @onClick={{this.onClick}} id="test-form-key-value-add-row-button" />`,
      );

      await click('#test-form-key-value-add-row-button');
      assert.ok(clicked);
    });
  },
);

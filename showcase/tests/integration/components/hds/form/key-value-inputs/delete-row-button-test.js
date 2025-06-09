/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/key-value-inputs/delete-row-button',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Form::KeyValueInputs::DeleteRowButton id="test-form-key-value-delete-row-button" @canDeleteRow={{true}} @rowIndex={{0}} />`,
      );
      assert
        .dom('#test-form-key-value-delete-row-button')
        .hasClass('hds-form-key-value-inputs__delete-row-button');
    });

    test('it should not render if `@canDeleteRow` is false', async function (assert) {
      await render(
        hbs`<Hds::Form::KeyValueInputs::DeleteRowButton id="test-form-key-value-delete-row-button" @canDeleteRow={{false}} @rowIndex={{0}} />`,
      );
      assert.dom('#test-form-key-value-delete-row-button').doesNotExist();
    });

    test('it should render with default text', async function (assert) {
      await render(
        hbs`<Hds::Form::KeyValueInputs::DeleteRowButton id="test-form-key-value-delete-row-button" @canDeleteRow={{true}} @rowIndex={{0}} />`,
      );
      assert
        .dom('#test-form-key-value-delete-row-button')
        .hasAria('label', 'Delete row 1');
    });

    test('it should render text from `@text` argument', async function (assert) {
      await render(
        hbs`<Hds::Form::KeyValueInputs::DeleteRowButton @text="Custom text" id="test-form-key-value-delete-row-button" @canDeleteRow={{true}} @rowIndex={{0}} />`,
      );
      assert
        .dom('#test-form-key-value-delete-row-button')
        .hasAria('label', 'Custom text');
    });

    test('it should call `@onClick` action when clicked', async function (assert) {
      let clicked = false;
      this.set('onClick', () => {
        clicked = true;
      });

      await render(
        hbs`<Hds::Form::KeyValueInputs::DeleteRowButton @onClick={{this.onClick}} id="test-form-key-value-delete-row-button" @canDeleteRow={{true}} @rowIndex={{0}} />`,
      );

      await click('#test-form-key-value-delete-row-button');
      assert.ok(clicked);
    });
  },
);

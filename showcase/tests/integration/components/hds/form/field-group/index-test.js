/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/field-group/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(hbs`<Hds::Form::FieldGroup id="test-form-field-group" />`);
      assert.dom('#test-form-field-group').hasClass('hds-form__field-group');
    });

    // Options

    // wrap
    test('it should have the default wrap if no @wrap prop is declared', async function (assert) {
      await render(hbs`<Hds::Form::FieldGroup id="test-form-field-group" />`);
      assert
        .dom('#test-form-field-group')
        .doesNotHaveClass('hds-layout-flex--has-wrappinge');
    });

    test('it should have the class "hds-layout-flex--has-wrapping" if @wrap is true', async function (assert) {
      await render(
        hbs`<Hds::Form::FieldGroup id="test-form-field-group" @wrap={{true}} />`,
      );
      assert
        .dom('#test-form-field-group')
        .hasClass('hds-layout-flex--has-wrapping');
    });
  },
);

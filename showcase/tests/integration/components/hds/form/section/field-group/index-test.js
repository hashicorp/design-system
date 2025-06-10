/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/section/field-group/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Form::Section::FieldGroup id="test-form-section-field-group" />`,
      );
      assert
        .dom('#test-form-section-field-group')
        .hasClass('hds-form__section-field-group');
    });

    // OPTIONS

    // direction
    test('it should render the component with the default direction', async function (assert) {
      await render(
        hbs`<Hds::Form::Section::FieldGroup id="test-form-section-field-group" />`,
      );
      assert
        .dom('#test-form-section-field-group')
        .hasClass('hds-layout-flex--direction-row');
    });

    test('it should render the component with a specified direction', async function (assert) {
      await render(
        hbs`<Hds::Form::Section::FieldGroup id="test-form-section-field-group" @direction="column" />`,
      );
      assert
        .dom('#test-form-section-field-group')
        .hasClass('hds-layout-flex--direction-column');
    });
  },
);

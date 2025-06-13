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

    // CONTENT

    test('it should render the yielded content', async function (assert) {
      await render(
        hbs`<Hds::Form::Section::FieldGroup id="test-form-section-field-group"><pre>test</pre></Hds::Form::Section::FieldGroup>`,
      );
      assert.dom('#test-form-section-field-group > pre').exists().hasText('test');
    });

    test('it should render the `Item` yielded contextual component', async function (assert) {
      await render(
        hbs`
          <Hds::Form::Section::FieldGroup id="test-form-section-field-group" as |FG|>
            <FG.Item><pre>test</pre></FG.Item>
          </Hds::Form::Section::FieldGroup>
        `,
      );
      assert
        .dom('#test-form-section-field-group > .hds-layout-flex-item > pre')
        .exists()
        .hasText('test');
    });
  },
);

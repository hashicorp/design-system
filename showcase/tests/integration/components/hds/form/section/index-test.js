/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/section/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Form::Section id="test-form-section" />`);
    assert.dom('#test-form-section').hasClass('hds-form__section');
  });

  // Options

  // hasMaxWidth
  test(`it should have the default max-width if no @hasMaxWidth prop is declared`, async function (assert) {
    await render(hbs`<Hds::Form::Section id="test-form-section" />`);
    assert
      .dom('#test-form-section')
      .hasClass('hds-form__section--has-max-width');
  });

  test(`if @hasMaxWidth is false, it should not have a max-width set`, async function (assert) {
    await render(
      hbs`<Hds::Form::Section id="test-form-section" @hasMaxWidth={{false}} />`,
    );
    assert
      .dom('#test-form-section')
      .doesNotHaveClass('hds-form__section--has-max-width');
  });
});

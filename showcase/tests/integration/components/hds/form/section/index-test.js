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

  // isFullWidth
  test(`it should have the default max-width if no @isFullWidth prop is declared`, async function (assert) {
    await render(hbs`<Hds::Form::Section id="test-form-section" />`);
    assert
      .dom('#test-form-section')
      .doesNotHaveClass('hds-form-content--is-full-width');
  });

  test(`if @isFullWidth is true, it should not have a max-width set`, async function (assert) {
    await render(
      hbs`<Hds::Form::Section id="test-form-section" @isFullWidth={{true}} />`,
    );
    assert
      .dom('#test-form-section')
      .hasClass('hds-form-content--is-full-width');
  });
});

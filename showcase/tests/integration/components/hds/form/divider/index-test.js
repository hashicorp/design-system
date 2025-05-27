/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/divider/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Form::Divider id="test-form-divider" />`);
    assert.dom('#test-form-divider').hasClass('hds-form__divider');
  });

  // Options

  // hasMaxWidth
  test(`it should have the default max-width if no @hasMaxWidth prop is declared`, async function (assert) {
    await render(hbs`<Hds::Form::Divider id="test-form-divider" />`);
    assert
      .dom('#test-form-divider')
      .doesNotHaveClass('hds-form__divider--has-max-width-false');
  });

  test(`if @hasMaWidth is false, it should have the class "hds-form__section--has-max-width-false"`, async function (assert) {
    await render(
      hbs`<Hds::Form::Divider id="test-form-divider" @hasMaxWidth={{false}} />`,
    );
    assert
      .dom('#test-form-divider')
      .hasClass('hds-form__divider--has-max-width-false');
  });
});

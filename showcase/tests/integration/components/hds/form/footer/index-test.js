/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/footer/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Form::Footer id="test-form-footer" />`);
    assert.dom('#test-form-footer').hasClass('hds-form__footer');
  });

  // CONTENT

  test('it should yield the Footer children', async function (assert) {
    await render(
      hbs`<Hds::Form::Footer id="test-form-footer" as |Footer|><pre>test</pre></Hds::Form::Footer>`,
    );
    assert
      .dom('#test-form-footer > pre')
      .exists('The content is yielded correctly')
      .hasText('test');
  });

  // OPTIONS

  // isFullWidth

  test(`it should have the default max-width if no @isFullWidth prop is declared`, async function (assert) {
    await render(hbs`<Hds::Form::Footer id="test-form-footer" />`);
    assert
      .dom('#test-form-footer')
      .doesNotHaveClass('hds-form-content--is-full-width');
  });

  test(`if @isFullWidth is true, it should not have a max-width set`, async function (assert) {
    await render(
      hbs`<Hds::Form::Footer id="test-form-footer" @isFullWidth={{true}} />`,
    );
    assert.dom('#test-form-footer').hasClass('hds-form-content--is-full-width');
  });
});

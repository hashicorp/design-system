/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/select/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Form::Select::Base id="test-form-select" />`);
    assert.dom('#test-form-select').hasClass('hds-form-select');
  });

  // OPTIONS

  test('it should render the options passed via contextual component', async function (assert) {
    await render(
      hbs`<Hds::Form::Select::Base id="test-form-select" as |C|><C.Options><option value="abc123">This is the option</option></C.Options></Hds::Form::Select::Base>`
    );
    assert.dom('#test-form-select option').exists();
    assert.dom('#test-form-select option').hasText('This is the option');
    assert.dom('#test-form-select option').hasValue('abc123');
  });

  // WIDTH

  test('it should render the select with a fixed width if a @width value is passed', async function (assert) {
    await render(
      hbs`<Hds::Form::Select::Base @width="248px" id="test-form-select" />`
    );
    assert.dom('#test-form-select').hasStyle({ width: '248px' });
  });

  // INVALID

  test('it should render the correct CSS class if the @isInvalid prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Form::Select::Base id="test-form-select" @isInvalid={{true}} />`
    );
    assert.dom('#test-form-select').hasClass('hds-form-select--is-invalid');
  });
});

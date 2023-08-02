/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/file-input/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Form::FileInput::Base id="test-form-file-input" />`);
    assert.dom('#test-form-file-input').hasClass('hds-form-file-input');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component', async function (assert) {
    await render(
      hbs`<Hds::Form::FileInput::Base id="test-form-file-input" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-form-file-input').hasClass('my-class');
    assert.dom('#test-form-file-input').hasAttribute('data-test1');
    assert.dom('#test-form-file-input').hasAttribute('data-test2', 'test');
  });
});

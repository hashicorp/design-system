/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/toggle/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Form::Toggle::Base id="test-form-toggle" />`);
    // Notice: the "toggle" component has a slightly different DOM structure than the other form controls
    assert.dom('.hds-form-toggle').exists();
    assert.dom('.hds-form-toggle > #test-form-toggle').exists();
    assert.dom('#test-form-toggle').hasClass('hds-form-toggle__control');
  });

  // ACCESSIBILITY

  test('it should render with the correct role', async function (assert) {
    await render(hbs`<Hds::Form::Toggle::Base id="test-form-toggle" />`);
    assert.dom('#test-form-toggle').hasAttribute('role', 'switch');
  });
  // role="switch"
});

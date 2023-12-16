/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/dismiss-button/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::DismissButton id="test-dismiss-button" />`);
    assert.dom('#test-dismiss-button').hasClass('hds-dismiss-button');
  });
  test('it should spread all the passed attributes', async function (assert) {
    await render(
      hbs`<Hds::DismissButton id="test-dismiss-button" class="dismiss-button-class" data-test-dismiss-button1 data-test-dismiss-button2="test" />`
    );
    assert.dom('#test-dismiss-button').hasClass('dismiss-button-class');
    assert
      .dom('#test-dismiss-button')
      .hasAttribute('data-test-dismiss-button1');
    assert
      .dom('#test-dismiss-button')
      .hasAttribute('data-test-dismiss-button2', 'test');
  });
});

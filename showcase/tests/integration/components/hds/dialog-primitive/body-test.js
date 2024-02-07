/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/dialog-primitive/body', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`
        <Hds::DialogPrimitive::Body id="test-body">
          Body
        </Hds::DialogPrimitive::Body>
      `
    );
    assert.dom('#test-body').hasClass('hds-dialog-primitive__body');
  });

  // CONTENT

  test('it renders the passed in content', async function (assert) {
    await render(
      hbs`
        <Hds::DialogPrimitive::Body id="test-body">
            Body
        </Hds::DialogPrimitive::Body>
      `
    );
    assert.dom('.hds-dialog-primitive__body').exists().hasText('Body');
  });
});

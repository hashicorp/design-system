/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/dialog-primitive/footer',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`
        <Hds::DialogPrimitive::Footer id="test-footer">
          Footer
        </Hds::DialogPrimitive::Footer>
      `
      );
      assert.dom('#test-footer').hasClass('hds-dialog-primitive__footer');
    });

    // CONTENT

    test('it renders the passed in content', async function (assert) {
      await render(
        hbs`
        <Hds::DialogPrimitive::Footer>
          <Hds::Button type="submit" @text="Primary" />
        </Hds::DialogPrimitive::Footer>
      `
      );
      assert.dom('.hds-dialog-primitive__footer').exists();
      assert.dom('.hds-dialog-primitive__footer .hds-button').exists();
    });
  }
);

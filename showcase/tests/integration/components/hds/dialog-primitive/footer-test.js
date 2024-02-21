/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, resetOnerror } from '@ember/test-helpers';
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
      assert.dom('.hds-dialog-primitive__footer .hds-button').exists();
    });

    // CALLBACK

    test('it should forwards the `onDismiss` callback function so it can be invoked as yielded function', async function (assert) {
      let dismissed = false;
      this.set('onDismiss', () => (dismissed = true));
      await render(
        hbs`
        <Hds::DialogPrimitive::Footer @onDismiss={{this.onDismiss}} as |F|>
          <Hds::Button type="submit" @text="Primary" {{on "click" F.close}} />
        </Hds::DialogPrimitive::Footer>
      `
      );
      await click('.hds-dialog-primitive__footer .hds-button');
      assert.ok(dismissed);
    });
  }
);

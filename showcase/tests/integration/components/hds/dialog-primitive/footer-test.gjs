/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { click, render, resetOnerror } from '@ember/test-helpers';
import Footer from "@hashicorp/design-system-components/components/hds/dialog-primitive/footer";
import Button from "@hashicorp/design-system-components/components/hds/button/index";
import { on } from "@ember/modifier";

module(
  'Integration | Component | hds/dialog-primitive/footer',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
        <Footer id="test-footer">
          Footer
        </Footer>
      </template>,
      );
      assert.dom('#test-footer').hasClass('hds-dialog-primitive__footer');
    });

    // CONTENT

    test('it renders the passed in content', async function (assert) {
      await render(
        <template>
        <Footer>
          <Button type="submit" @text="Primary" />
        </Footer>
      </template>,
      );
      assert.dom('.hds-dialog-primitive__footer .hds-button').exists();
    });

    // CALLBACK

    test('it should forwards the `onDismiss` callback function so it can be invoked as yielded function', async function (assert) {
      let dismissed = false;
      this.set('onDismiss', () => (dismissed = true));
      await render(
        <template>
        <Footer @onDismiss={{this.onDismiss}} as |F|>
          <Button type="submit" @text="Primary" {{on "click" F.close}} />
        </Footer>
      </template>,
      );
      await click('.hds-dialog-primitive__footer .hds-button');
      assert.ok(dismissed);
    });
  },
);

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { click, render, resetOnerror } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import { TrackedObject } from 'tracked-built-ins';

import {
  HdsDialogPrimitiveFooter,
  HdsButton,
} from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

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
          <HdsDialogPrimitiveFooter id="test-footer">
            Footer
          </HdsDialogPrimitiveFooter>
        </template>,
      );
      assert.dom('#test-footer').hasClass('hds-dialog-primitive__footer');
    });

    // CONTENT

    test('it renders the passed in content', async function (assert) {
      await render(
        <template>
          <HdsDialogPrimitiveFooter>
            <HdsButton type="submit" @text="Primary" />
          </HdsDialogPrimitiveFooter>
        </template>,
      );
      assert.dom('.hds-dialog-primitive__footer .hds-button').exists();
    });

    // CALLBACK

    test('it should forwards the `onDismiss` callback function so it can be invoked as yielded function', async function (assert) {
      const context = new TrackedObject({
        isDismissed: false,
      });

      const onDismiss = () => {
        context.isDismissed = true;
      };

      await render(
        <template>
          <HdsDialogPrimitiveFooter @onDismiss={{onDismiss}} as |F|>
            <HdsButton type="submit" @text="Primary" {{on "click" F.close}} />
          </HdsDialogPrimitiveFooter>
        </template>,
      );

      await click('.hds-dialog-primitive__footer .hds-button');
      assert.ok(context.isDismissed);
    });
  },
);

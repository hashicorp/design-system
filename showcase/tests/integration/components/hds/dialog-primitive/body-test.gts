/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, resetOnerror } from '@ember/test-helpers';

import { HdsDialogPrimitiveBody } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/dialog-primitive/body', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsDialogPrimitiveBody id="test-body">
          Body
        </HdsDialogPrimitiveBody>
      </template>,
    );
    assert.dom('#test-body').hasClass('hds-dialog-primitive__body');
  });

  // CONTENT

  test('it renders the passed in content', async function (assert) {
    await render(
      <template>
        <HdsDialogPrimitiveBody id="test-body">
          Body
        </HdsDialogPrimitiveBody>
      </template>,
    );
    assert.dom('.hds-dialog-primitive__body').hasText('Body');
  });
});

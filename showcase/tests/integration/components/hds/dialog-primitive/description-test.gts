/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, resetOnerror } from '@ember/test-helpers';

import { HdsDialogPrimitiveDescription } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/dialog-primitive/description',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsDialogPrimitiveDescription id="test-description">
            Description
          </HdsDialogPrimitiveDescription>
        </template>,
      );
      assert
        .dom('#test-description')
        .hasClass('hds-dialog-primitive__description');
    });

    // CONTENT

    test('it renders the passed in content', async function (assert) {
      await render(
        <template>
          <HdsDialogPrimitiveDescription>
            Description
          </HdsDialogPrimitiveDescription>
        </template>,
      );
      assert.dom('.hds-dialog-primitive__description').hasText('Description');
    });
  },
);

/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, resetOnerror } from '@ember/test-helpers';

import { HdsDialogPrimitiveOverlay } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/dialog-primitive/overlay',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(<template><HdsDialogPrimitiveOverlay /></template>);
      assert.dom('.hds-dialog-primitive__overlay').exists();
    });
  },
);

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, resetOnerror } from '@ember/test-helpers';
import Overlay from "@hashicorp/design-system-components/components/hds/dialog-primitive/overlay";

module(
  'Integration | Component | hds/dialog-primitive/overlay',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(<template><Overlay /></template>);
      assert.dom('.hds-dialog-primitive__overlay').exists();
    });
  },
);

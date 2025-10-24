/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Toast from "@hashicorp/design-system-components/components/hds/toast/index";

module('Integration | Component | hds/toast/index', function (hooks) {
  setupRenderingTest(hooks);

  // notice: "toast" is a wrapper around the "hds::alert" so we test only very specific things

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><Toast id="test-toast" /></template>);
    assert.dom('#test-toast').hasClass('hds-toast');
  });

  test('it should render the component with "role"="alert" and aria-live="polite" by default', async function (assert) {
    await render(<template><Toast id="test-toast" /></template>);
    assert.dom('#test-toast').hasAttribute('role', 'alert');
    assert.dom('#test-toast').hasAttribute('aria-live', 'polite');
  });
});

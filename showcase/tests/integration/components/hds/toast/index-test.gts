/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsToast } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/toast/index', function (hooks) {
  setupRenderingTest(hooks);

  // notice: "toast" is a wrapper around the "hds::alert" so we test only very specific things

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><HdsToast id="test-toast" /></template>);
    assert.dom('#test-toast').hasClass('hds-toast');
  });

  test('it should render the component with "role"="alert" and aria-live="polite" by default', async function (assert) {
    await render(<template><HdsToast id="test-toast" /></template>);
    assert.dom('#test-toast').hasAttribute('role', 'alert');
    assert.dom('#test-toast').hasAttribute('aria-live', 'polite');
  });
});

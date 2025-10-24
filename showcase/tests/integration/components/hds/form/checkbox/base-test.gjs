/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Base from "@hashicorp/design-system-components/components/hds/form/checkbox/base";

module('Integration | Component | hds/form/checkbox/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><Base id="test-form-checkbox" /></template>);
    assert.dom('#test-form-checkbox').hasClass('hds-form-checkbox');
  });
  test('it should convert the `indeterminate` attribute into a property', async function (assert) {
    await render(
      <template><Base id="test-form-checkbox" indeterminate={{true}} /></template>,
    );
    assert.dom('#test-form-checkbox').doesNotHaveAttribute('indeterminate');
    assert.dom('#test-form-checkbox').hasProperty('indeterminate', true);
  });
});

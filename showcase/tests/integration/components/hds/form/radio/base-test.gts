/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Base from "@hashicorp/design-system-components/components/hds/form/radio/base";

module('Integration | Component | hds/form/radio/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><Base id="test-form-radio" /></template>);
    assert.dom('#test-form-radio').hasClass('hds-form-radio');
  });
});

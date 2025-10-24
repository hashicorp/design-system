/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Item from "@hashicorp/design-system-components/components/hds/app-footer/item";

module('Integration | Component | hds/app-footer/item', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><ul><Item id="test-item" /></ul></template>);
    assert.dom('#test-item').hasClass('hds-app-footer__list-item');
  });

  // CONTENT

  test('it renders text content yielded within the Item', async function (assert) {
    await render(
      <template><ul><Item id="test-item">Custom item</Item></ul></template>,
    );
    assert.dom('#test-item').hasText('Custom item');
  });
});

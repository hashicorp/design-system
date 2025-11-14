/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsDismissButton } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/dismiss-button/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsDismissButton id="test-dismiss-button" /></template>,
    );
    assert.dom('#test-dismiss-button').hasClass('hds-dismiss-button');
  });
  test('it should spread all the passed attributes', async function (assert) {
    await render(
      <template>
        <HdsDismissButton
          id="test-dismiss-button"
          class="dismiss-button-class"
          data-test-dismiss-button1
          data-test-dismiss-button2="test"
        />
      </template>,
    );
    assert.dom('#test-dismiss-button').hasClass('dismiss-button-class');
    assert
      .dom('#test-dismiss-button')
      .hasAttribute('data-test-dismiss-button1');
    assert
      .dom('#test-dismiss-button')
      .hasAttribute('data-test-dismiss-button2', 'test');
  });
});

/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import {
  HdsButton,
  HdsButtonSet,
} from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/button-set/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><HdsButtonSet id="test-button-set" /></template>);
    assert.dom('#test-button-set').hasClass('hds-button-set');
  });

  test('it should render a child button component', async function (assert) {
    await render(
      <template>
        <HdsButtonSet id="test-button-set">
          <HdsButton @text="test button" />
        </HdsButtonSet>
      </template>,
    );
    assert.dom('#test-button-set .hds-button').exists();
  });
});

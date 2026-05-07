/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';

import { HdsCdsButton } from '@hashicorp/design-system-components/components';

module('Integration | Component | hds/cds-button/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsCdsButton id="test-cds-button">
          Text renders
        </HdsCdsButton>
      </template>,
    );
    assert.dom('#test-cds-button').hasText('Text renders');
  });
});

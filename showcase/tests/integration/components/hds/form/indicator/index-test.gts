/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsFormIndicator } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/indicator/index', function (hooks) {
  setupRenderingTest(hooks);

  // CONTENT

  test('it renders nothing when no arguments are provided', async function (assert) {
    await render(<template><HdsFormIndicator /></template>);
    assert.dom('.hds-form-indicator').doesNotExist();
  });

  // REQUIRED AND OPTIONAL

  test('it renders the optional indicator when @isOptional is true', async function (assert) {
    await render(
      <template><HdsFormIndicator @isOptional={{true}} /></template>,
    );
    assert.dom('.hds-form-indicator').exists();
    assert.dom('.hds-form-indicator').hasClass('hds-form-indicator--optional');
    assert.dom('.hds-form-indicator').hasText('(Optional)');
  });
  test('it renders the required indicator when @isRequired is true', async function (assert) {
    await render(
      <template><HdsFormIndicator @isRequired={{true}} /></template>,
    );
    assert.dom('.hds-form-indicator').exists();
    assert.dom('.hds-form-indicator').hasText('Required');
  });
});

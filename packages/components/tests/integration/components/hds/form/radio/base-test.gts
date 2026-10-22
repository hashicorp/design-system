/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsFormRadioBase } from '#src/components.ts';

import { setupRenderingTest } from '../../../../../helpers/index.ts';

module('Integration | Component | hds/form/radio/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsFormRadioBase id="test-form-radio" /></template>
    );
    assert.dom('#test-form-radio').hasClass('hds-form-radio');
  });
});

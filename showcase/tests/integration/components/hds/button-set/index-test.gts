/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import ButtonSet from "@hashicorp/design-system-components/components/hds/button-set/index";
import Button from "@hashicorp/design-system-components/components/hds/button/index";

module('Integration | Component | hds/button-set/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><ButtonSet id="test-button-set" /></template>);
    assert.dom('#test-button-set').hasClass('hds-button-set');
  });

  test('it should render a child button component', async function (assert) {
    await render(
      <template>
        <ButtonSet id="test-button-set">
          <Button @text="test button" />
        </ButtonSet>
      </template>,
    );
    assert.dom('#test-button-set .hds-button').exists();
  });
});

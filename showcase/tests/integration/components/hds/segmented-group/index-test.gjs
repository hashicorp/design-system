/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import SegmentedGroup from "@hashicorp/design-system-components/components/hds/segmented-group/index";

module('Integration | Component | hds/segmented-group/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><SegmentedGroup id="test-segmented-group" /></template>);
    assert.dom('#test-segmented-group').hasClass('hds-segmented-group');
  });

  // CONTEXTUAL COMPONENTS

  test('it renders the contextual components with CSS modifier classes', async function (assert) {
    await render(
      <template><SegmentedGroup as |SG|>
            <SG.Button id="segmented-button" @color="secondary" @text="Button" />
            <SG.Dropdown id="segmented-dropdown" as |DD|>
              <DD.ToggleButton @color="secondary" @text="Toggle" />
              <DD.Interactive @href="#" @text="Dropdown Item" />
            </SG.Dropdown>
            <SG.Select id="segmented-select" />
            <SG.TextInput id="segmented-input" />
            <SG.Generic><span id="segmented-generic"></span></SG.Generic>
          </SegmentedGroup></template>,
    );
    assert.dom('#segmented-button').hasClass('hds-button');
    assert.dom('#segmented-dropdown').hasClass('hds-dropdown');
    assert.dom('#segmented-select').hasClass('hds-form-select');
    assert.dom('#segmented-input').hasClass('hds-form-text-input');
    assert.dom('#segmented-generic').exists();
  });
});

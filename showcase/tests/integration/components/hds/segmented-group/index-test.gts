/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsSegmentedGroup } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';
import NOOP from 'showcase/utils/noop';

module('Integration | Component | hds/segmented-group/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsSegmentedGroup id="test-segmented-group" /></template>,
    );
    assert.dom('#test-segmented-group').hasClass('hds-segmented-group');
  });

  // ARGUMENTS

  test('it should not render the full-width CSS class by default', async function (assert) {
    await render(
      <template><HdsSegmentedGroup id="test-segmented-group" /></template>,
    );
    assert
      .dom('#test-segmented-group')
      .doesNotHaveClass('hds-segmented-group--is-full-width');
  });

  test('it renders the full-width CSS class when @isFullWidth is true', async function (assert) {
    await render(
      <template>
        <HdsSegmentedGroup id="test-segmented-group" @isFullWidth={{true}} />
      </template>,
    );
    assert
      .dom('#test-segmented-group')
      .hasClass('hds-segmented-group--is-full-width');
  });

  test('it sets the max-width CSS custom property when @maxWidth is provided', async function (assert) {
    await render(
      <template>
        <HdsSegmentedGroup id="test-segmented-group" @maxWidth="400px" />
      </template>,
    );
    assert
      .dom('#test-segmented-group')
      .hasStyle({ '--hds-segmented-group-max-width': '400px' });
  });

  test('it should not set the max-width CSS custom property by default', async function (assert) {
    await render(
      <template><HdsSegmentedGroup id="test-segmented-group" /></template>,
    );
    assert.dom('#test-segmented-group').doesNotHaveAttribute('style');
  });

  // CONTEXTUAL COMPONENTS

  test('it renders the contextual components with CSS modifier classes', async function (assert) {
    await render(
      <template>
        <HdsSegmentedGroup as |SG|>
          <SG.Button id="segmented-button" @color="secondary" @text="Button" />
          <SG.Dropdown id="segmented-dropdown" as |DD|>
            <DD.ToggleButton @color="secondary" @text="Toggle" />
            <DD.Interactive @href="#">
              Dropdown Item
            </DD.Interactive>
          </SG.Dropdown>
          <SG.Select id="segmented-select" />
          <SG.TextInput id="segmented-input" />
          <SG.SuperSelectSingle @onChange={{NOOP}} />
          <SG.SuperSelectMultiple @onChange={{NOOP}} />
          <SG.Generic><span id="segmented-generic"></span></SG.Generic>
        </HdsSegmentedGroup>
      </template>,
    );
    assert.dom('#segmented-button').hasClass('hds-button');
    assert.dom('#segmented-dropdown').hasClass('hds-dropdown');
    assert.dom('#segmented-select').hasClass('hds-form-select');
    assert.dom('#segmented-input').hasClass('hds-form-text-input');
    assert.dom('.hds-form-super-select-single').exists();
    assert.dom('.hds-form-super-select-multiple').exists();
    assert.dom('#segmented-generic').exists();
  });
});

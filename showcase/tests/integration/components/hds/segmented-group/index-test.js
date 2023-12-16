/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/segmented-group/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::SegmentedGroup id="test-segmented-group" />`);
    assert.dom('#test-segmented-group').hasClass('hds-segmented-group');
  });

  // CONTEXTUAL COMPONENTS

  test('it renders the contextual components with CSS modifier classes', async function (assert) {
    await render(
      hbs`<Hds::SegmentedGroup as |S|>
            <S.Button id="segmented-button" @color="secondary" @text="Button" />
            <S.Dropdown id="segmented-dropdown" as |DD|>
              <DD.ToggleButton @color="secondary" @text="Toggle" />
              <DD.Interactive @href="#" @text="Dropdown Item" />
            </S.Dropdown>
            <S.Select id="segmented-select"/>
            <S.TextInput id="segmented-input" />
            <S.Generic><span id="segmented-generic"></span></S.Generic/>
          </Hds::SegmentedGroup>`
    );
    assert.dom('#segmented-button').hasClass('hds-button');
    assert.dom('#segmented-dropdown').hasClass('hds-dropdown');
    assert.dom('#segmented-select').hasClass('hds-form-select');
    assert.dom('#segmented-input').hasClass('hds-form-text-input');
    assert.dom('#segmented-generic').exists();
  });
});

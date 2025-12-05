/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsFormSelectBase } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/select/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsFormSelectBase id="test-form-select" /></template>,
    );
    assert.dom('#test-form-select').hasClass('hds-form-select');
  });

  test('it should set aria-describedby and id arguments if pass @id or @ariaDescribedBy', async function (assert) {
    await render(
      <template>
        <HdsFormSelectBase
          @id="custom-id"
          @ariaDescribedBy="custom-description-id"
        />
      </template>,
    );
    assert
      .dom('#custom-id')
      .exists()
      .hasAria('describedby', 'custom-description-id');
  });

  // OPTIONS

  test('it should render the options passed via contextual component', async function (assert) {
    await render(
      <template>
        <HdsFormSelectBase id="test-form-select" as |C|>
          <C.Options>
            <option value="abc123">This is the option</option>
          </C.Options>
        </HdsFormSelectBase>
      </template>,
    );
    assert.dom('#test-form-select option').exists();
    assert.dom('#test-form-select option').hasText('This is the option');
    assert.dom('#test-form-select option').hasValue('abc123');
  });

  // WIDTH

  test('it should render the select with a fixed width if a @width value is passed', async function (assert) {
    await render(
      <template>
        <HdsFormSelectBase @width="248px" id="test-form-select" />
      </template>,
    );
    assert.dom('#test-form-select').hasStyle({ width: '248px' });
  });

  // INVALID

  test('it should render the correct CSS class if the @isInvalid prop is declared', async function (assert) {
    await render(
      <template>
        <HdsFormSelectBase id="test-form-select" @isInvalid={{true}} />
      </template>,
    );
    assert.dom('#test-form-select').hasClass('hds-form-select--is-invalid');
  });
});

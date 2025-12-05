/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsFormSectionMultiFieldGroup } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/form/section/multi-field-group/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFormSectionMultiFieldGroup
            id="test-form-section-multi-field-group"
          />
        </template>,
      );
      assert
        .dom('#test-form-section-multi-field-group')
        .hasClass('hds-form__section-multi-field-group');
    });

    // CONTENT

    test('it should render the yielded content', async function (assert) {
      await render(
        <template>
          <HdsFormSectionMultiFieldGroup
            id="test-form-section-multi-field-group"
          ><pre>test</pre></HdsFormSectionMultiFieldGroup>
        </template>,
      );
      assert
        .dom('#test-form-section-multi-field-group > pre')
        .exists()
        .hasText('test');
    });

    test('it should render the `Item` yielded contextual component', async function (assert) {
      await render(
        <template>
          <HdsFormSectionMultiFieldGroup
            id="test-form-section-multi-field-group"
            as |FG|
          >
            <FG.Item><pre>test</pre></FG.Item>
          </HdsFormSectionMultiFieldGroup>
        </template>,
      );
      assert
        .dom(
          '#test-form-section-multi-field-group > .hds-form__section-multi-field-group-item > pre',
        )
        .exists()
        .hasText('test');
    });
  },
);

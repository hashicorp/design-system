/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import MultiFieldGroup from "@hashicorp/design-system-components/components/hds/form/section/multi-field-group/index";

module(
  'Integration | Component | hds/form/section/multi-field-group/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template><MultiFieldGroup id="test-form-section-multi-field-group" /></template>,
      );
      assert
        .dom('#test-form-section-multi-field-group')
        .hasClass('hds-form__section-multi-field-group');
    });

    // CONTENT

    test('it should render the yielded content', async function (assert) {
      await render(
        <template><MultiFieldGroup id="test-form-section-multi-field-group"><pre>test</pre></MultiFieldGroup></template>,
      );
      assert
        .dom('#test-form-section-multi-field-group > pre')
        .exists()
        .hasText('test');
    });

    test('it should render the `Item` yielded contextual component', async function (assert) {
      await render(
        <template>
          <MultiFieldGroup id="test-form-section-multi-field-group" as |FG|>
            <FG.Item><pre>test</pre></FG.Item>
          </MultiFieldGroup>
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

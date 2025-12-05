/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsFormHeaderDescription } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/form/header/description/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFormHeaderDescription id="test-form-description" />
        </template>,
      );
      assert
        .dom('#test-form-description')
        .hasClass('hds-form__header-description');
    });

    // CONTENT

    test('it should render the yielded content', async function (assert) {
      await render(
        <template>
          <HdsFormHeaderDescription id="test-form-description"><pre
            >test</pre></HdsFormHeaderDescription>
        </template>,
      );
      assert.dom('#test-form-description > pre').exists().hasText('test');
    });
  },
);

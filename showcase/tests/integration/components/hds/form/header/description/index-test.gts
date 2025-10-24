/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Description from "@hashicorp/design-system-components/components/hds/form/header/description";

module(
  'Integration | Component | hds/form/header/description/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template><Description id="test-form-description" /></template>,
      );
      assert
        .dom('#test-form-description')
        .hasClass('hds-form__header-description');
    });

    // CONTENT

    test('it should render the yielded content', async function (assert) {
      await render(
        <template><Description id="test-form-description"><pre>test</pre></Description></template>,
      );
      assert.dom('#test-form-description > pre').exists().hasText('test');
    });
  },
);

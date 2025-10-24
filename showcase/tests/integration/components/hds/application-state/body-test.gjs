/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Body from "@hashicorp/design-system-components/components/hds/application-state/body";

module(
  'Integration | Component | hds/application-state/body',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(
        <template><Body id="test-application-state-body" /></template>,
      );

      assert
        .dom('#test-application-state-body')
        .hasClass('hds-application-state__body');
    });

    test('it should render the yielded content when used in block form', async function (assert) {
      await render(
        <template><Body id="test-application-state-body">
        <pre>test</pre>
      </Body></template>,
      );
      assert.dom('#test-application-state-body > pre').exists();
      assert.dom('#test-application-state-body > pre').hasText('test');
    });

    test('it should render the text if defined', async function (assert) {
      await render(
        <template><Body id="test-application-state-body" @text="I am the only thing that should exist" /></template>,
      );
      assert.dom('#test-application-state-body').exists();
      assert
        .dom('#test-application-state-body')
        .hasText('I am the only thing that should exist');
    });

    test('it should not render defined text if used in block form', async function (assert) {
      await render(
        <template><Body id="test-application-state-body" @text="I should not exist">
        <pre>test should only exist</pre>
      </Body></template>,
      );
      assert.dom('#test-application-state-body > pre').exists();
      assert
        .dom('#test-application-state-body > pre')
        .hasText('test should only exist');
    });
  },
);

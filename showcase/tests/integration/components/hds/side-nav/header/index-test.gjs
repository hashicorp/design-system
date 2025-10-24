/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Header from "@hashicorp/design-system-components/components/hds/side-nav/header/index";

module('Integration | Component | hds/side-nav/header', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><Header id="test-side-nav-header" /></template>);
    assert.dom('#test-side-nav-header').hasClass('hds-side-nav-header');
  });

  // CONTENT

  test('it renders passed in content', async function (assert) {
    await render(<template>
      <Header>
        <:logo>
          <div id="test-side-nav-logo"></div>
        </:logo>
        <:actions>
          <div id="test-side-nav-actions"></div>
        </:actions>
      </Header>
    </template>);
    assert.dom('#test-side-nav-logo').exists();
    assert.dom('#test-side-nav-actions').exists();
  });
});

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsSideNavBase } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/side-nav/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><HdsSideNavBase id="test-side-nav" /></template>);
    assert.dom('#test-side-nav').hasClass('hds-side-nav');
  });

  // CONTENT

  test('it renders content passed to the named blocks', async function (assert) {
    await render(
      <template>
        <HdsSideNavBase>
          <:root>
            <span id="test-side-nav-root" />
          </:root>
          <:header>
            <span id="test-side-nav-header" />
          </:header>
          <:body>
            <span id="test-side-nav-body" />
          </:body>
          <:footer>
            <span id="test-side-nav-footer" />
          </:footer>
        </HdsSideNavBase>
      </template>,
    );
    assert.dom('#test-side-nav-root').exists();
    assert.dom('#test-side-nav-header').exists();
    assert.dom('#test-side-nav-body').exists();
    assert.dom('#test-side-nav-footer').exists();
  });
});

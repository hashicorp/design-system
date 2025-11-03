/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsSideNavListItem } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/side-nav/list/item', function (hooks) {
  setupRenderingTest(hooks);

  // Basic

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsSideNavListItem id="test-side-nav-list-item" /></template>,
    );
    assert.dom('#test-side-nav-list-item').hasClass('hds-side-nav__list-item');
  });

  // Test Content

  test('it renders the passed in custom content', async function (assert) {
    await render(
      <template>
        <HdsSideNavListItem>
          <span id="test-custom-content" />
        </HdsSideNavListItem>
      </template>,
    );
    assert.dom('#test-custom-content').exists();
  });
});

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsPaginationNavEllipsis } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/pagination/nav/ellipsis',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsPaginationNavEllipsis id="test-nav-ellipsis" />
        </template>,
      );
      assert.dom('#test-nav-ellipsis').hasClass('hds-pagination-nav__ellipsis');
    });
  },
);

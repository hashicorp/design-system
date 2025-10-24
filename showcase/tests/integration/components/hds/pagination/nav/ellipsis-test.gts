/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Ellipsis from "@hashicorp/design-system-components/components/hds/pagination/nav/ellipsis";

module(
  'Integration | Component | hds/pagination/nav/ellipsis',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(<template>
      <Ellipsis id="test-nav-ellipsis" />
    </template>);
      assert.dom('#test-nav-ellipsis').hasClass('hds-pagination-nav__ellipsis');
    });
  },
);

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsTableTd } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/table/td', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with a CSS class that matches the component name', async function (assert) {
    await render(<template><HdsTableTd id="data-test-table-td" /></template>);
    assert.dom('#data-test-table-td').hasClass('hds-table__td');
  });

  test('it should render with the appropriate `@align` CSS class', async function (assert) {
    await render(
      <template>
        <HdsTableTd id="data-test-table-td" @align="right" />
      </template>,
    );
    assert.dom('#data-test-table-td').hasClass('hds-table__td--align-right');
  });

  test('it should support splattributes', async function (assert) {
    await render(
      <template><HdsTableTd id="data-test-table-td" lang="es" /></template>,
    );
    assert.dom('#data-test-table-td').hasAttribute('lang', 'es');
  });
});

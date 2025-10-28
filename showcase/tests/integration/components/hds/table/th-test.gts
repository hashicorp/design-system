/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, focus, find } from '@ember/test-helpers';

import {
  HdsTable,
  HdsTableTh,
} from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/table/th', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsTableTh id="data-test-table-th">Artist</HdsTableTh>
      </template>,
    );
    assert.dom('#data-test-table-th').hasClass('hds-table__th');
  });

  // CONTENT

  test('it renders text content yielded within the cell (no tooltip)', async function (assert) {
    await render(
      <template>
        <HdsTableTh id="data-test-table-th">Artist</HdsTableTh>
      </template>,
    );
    assert.dom('#data-test-table-th > span').hasText('Artist');
  });
  test('it renders text content yielded within the cell (with tooltip)', async function (assert) {
    await render(
      <template>
        <HdsTableTh
          id="data-test-table-th"
          @tooltip="More info."
        >Artist</HdsTableTh>
      </template>,
    );
    assert
      .dom('#data-test-table-th .hds-table__th-content > span')
      .hasText('Artist');
  });

  // ALIGNMENT

  test('it should render with the appropriate `@align` CSS class', async function (assert) {
    await render(
      <template>
        <HdsTableTh id="data-test-table-th" @align="right">Artist</HdsTableTh>
      </template>,
    );
    assert.dom('#data-test-table-th').hasClass('hds-table__th--align-right');
  });

  // WIDTH

  test('it should add inline styles if `@width` is declared', async function (assert) {
    await render(
      <template>
        <HdsTableTh id="data-test-table-th" @width="10%">Artist</HdsTableTh>
      </template>,
    );
    assert
      .dom('#data-test-table-th')
      .hasAttribute('style', 'width: 10%; min-width: 10%;');
  });

  // ATTRIBUTES

  test('it should support splattributes', async function (assert) {
    await render(
      <template>
        <HdsTableTh id="data-test-table-th" lang="es">Artist</HdsTableTh>
      </template>,
    );
    assert.dom('#data-test-table-th').hasAttribute('lang', 'es');
  });

  test('it has the scope attribute set to column by default', async function (assert) {
    await render(
      <template>
        <HdsTableTh id="data-test-table-th">Artist</HdsTableTh>
      </template>,
    );
    assert.dom('#data-test-table-th').hasAttribute('scope', 'col');
  });
  test('it has the scope attribute set to row if inside a tbody', async function (assert) {
    await render(
      <template>
        <HdsTable><:body as |B|><B.Tr><B.Th
                id="data-test-table-th"
              >Artist</B.Th></B.Tr></:body></HdsTable>
      </template>,
    );
    assert.dom('#data-test-table-th').hasAttribute('scope', 'row');
  });

  // TOOLTIP

  test('if @tooltip is undefined a tooltip button toggle should not be present', async function (assert) {
    await render(
      <template>
        <HdsTableTh id="data-test-table-th">Artist</HdsTableTh>
      </template>,
    );

    assert
      .dom('#data-test-table-th .hds-table__th-button--tooltip')
      .doesNotExist();
  });
  test('if @tooltip is defined a tooltip should be added to the table cell header', async function (assert) {
    await render(
      <template>
        <HdsTableTh
          @tooltip="More info."
          id="data-test-table-th"
        >Artist</HdsTableTh>
      </template>,
    );

    assert.dom('#data-test-table-th .hds-table__th-button--tooltip').exists();
    // activate the tooltip:
    await focus('#data-test-table-th .hds-table__th-button--tooltip');
    // test that the tooltip exists and has the passed in content:
    assert.dom('.tippy-content').hasText('More info.');
  });
  test('it renders the `aria-labelledby` attribute for the tooltip button with the correct IDs', async function (assert) {
    await render(
      <template>
        <HdsTableTh
          id="data-test-table-th"
          @tooltip="More info."
        >Artist</HdsTableTh>
      </template>,
    );
    const prefixLabel = find(
      '#data-test-table-th .hds-table__th-button-aria-label-hidden-segment',
    );
    const buttonLabel = find(
      '#data-test-table-th .hds-table__th-content > span',
    );
    assert
      .dom('#data-test-table-th .hds-table__th-button--tooltip')
      .hasAria('labelledby', `${prefixLabel?.id} ${buttonLabel?.id}`);
  });
});

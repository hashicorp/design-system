/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, focus, click, setupOnerror } from '@ember/test-helpers';
import Th from "@hashicorp/design-system-components/components/hds/advanced-table/th";
import AdvancedTable from "@hashicorp/design-system-components/components/hds/advanced-table/index";

module('Integration | Component | hds/advanced-table/th', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><Th id="data-advanced-test-table-th">Artist</Th></template>,
    );

    assert
      .dom('#data-advanced-test-table-th')
      .hasClass('hds-advanced-table__th');
  });

  // CONTENT

  test('it renders text content yielded within the cell (no tooltip)', async function (assert) {
    await render(
      <template><Th id="data-advanced-test-table-th">Artist</Th></template>,
    );
    assert
      .dom(
        '#data-advanced-test-table-th .hds-advanced-table__th-content > span',
      )
      .hasText('Artist');
  });

  test('it renders text content yielded within the cell (with tooltip)', async function (assert) {
    await render(
      <template><Th id="data-advanced-test-table-th" @tooltip="More info.">Artist</Th></template>,
    );
    assert
      .dom(
        '#data-advanced-test-table-th .hds-advanced-table__th-content > span',
      )
      .hasText('Artist');
  });

  // EXPAND/COLLAPSE

  test('it does not render an expand button by default', async function (assert) {
    await render(
      <template><Th id="data-advanced-test-table-th">Artist</Th></template>,
    );

    assert.dom('.hds-advanced-table__th-button--expand').doesNotExist();
  });

  test('it renders an expand button when `@isExpandable` is true and defaults to collapsed', async function (assert) {
    await render(
      <template><Th id="data-advanced-test-table-th" @isExpandable={{true}}>Artist</Th></template>,
    );
    assert
      .dom(
        '#data-advanced-test-table-th .hds-advanced-table__th-button--expand',
      )
      .hasText('Toggle')
      .hasAria('expanded', 'false');
  });

  test('it renders an expand button when `@isExpandable` is true and is expanded if `@isExpanded`', async function (assert) {
    await render(
      <template><Th id="data-advanced-test-table-th" @isExpandable={{true}} @isExpanded={{true}}>Artist</Th></template>,
    );
    assert
      .dom(
        '#data-advanced-test-table-th .hds-advanced-table__th-button--expand',
      )
      .hasText('Toggle')
      .hasAria('expanded', 'true');
  });

  // ONCLICKTOGGLE

  test('it should call the `@onClickToggle` function if provided', async function (assert) {
    let isClicked = false;
    this.set('onClickToggle', () => (isClicked = true));

    await render(
      <template><Th id="data-advanced-test-table-th" @isExpandable={{true}} @onClickToggle={{this.onClickToggle}}>Artist</Th></template>,
    );

    await click(
      '#data-advanced-test-table-th .hds-advanced-table__th-button--expand',
    );

    assert.ok(isClicked);
  });

  // ALIGNMENT

  test('it should render with the appropriate `@align` CSS class', async function (assert) {
    await render(
      <template><Th id="data-advanced-test-table-th" @align="right">Artist</Th></template>,
    );
    assert
      .dom('#data-advanced-test-table-th')
      .hasClass('hds-advanced-table__th--align-right');
  });

  // ATTRIBUTES

  test('it should render with the appropriate span information by default', async function (assert) {
    await render(
      <template><Th id="data-test-advanced-table-th" /></template>,
    );

    assert.dom('#data-test-advanced-table-th').hasNoAttribute('aria-rowspan');
    assert.dom('#data-test-advanced-table-th').hasNoAttribute('aria-colspan');
    assert.dom('#data-test-advanced-table-th').hasStyle({
      gridRow: 'auto',
      gridColumn: 'auto',
    });
  });

  test('it should render with the appropriate span information when pass rowspan and colspan', async function (assert) {
    await render(
      <template><Th id="data-test-advanced-table-th" @rowspan={{3}} @colspan={{5}} /></template>,
    );

    assert
      .dom('#data-test-advanced-table-th')
      .hasAttribute('aria-rowspan', '3');

    assert
      .dom('#data-test-advanced-table-th')
      .hasAttribute('aria-colspan', '5');

    assert.dom('#data-test-advanced-table-th').hasStyle({
      gridRow: 'span 3',
      gridColumn: 'span 5',
    });
  });

  test('it should throw an assertion if it is a sticky cell with rowspan', async function (assert) {
    const errorMessage =
      'Cannot have custom rowspan or colspan if there are nested rows.';
    assert.expect(1);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });

    await render(
      <template><Th id="data-test-advanced-table-th" @rowspan={{3}} @isStickyColumn={{true}} /></template>,
    );

    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  test('it should throw an assertion if it is a sticky cell with colspan', async function (assert) {
    const errorMessage =
      'Cannot have custom rowspan or colspan if there are nested rows.';

    assert.expect(1);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });

    await render(
      <template><Th id="data-test-advanced-table-th" @colspan={{3}} @isStickyColumn={{true}} /></template>,
    );

    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  test('it should support splattributes', async function (assert) {
    await render(
      <template><Th id="data-advanced-test-table-th" lang="es">Artist</Th></template>,
    );
    assert.dom('#data-advanced-test-table-th').hasAttribute('lang', 'es');
  });

  test('it has the role attribute set to columnheader by default', async function (assert) {
    await render(
      <template><Th id="data-advanced-test-table-th">Artist</Th></template>,
    );
    assert
      .dom('#data-advanced-test-table-th')
      .hasAttribute('role', 'columnheader');
  });

  test('it has the role rowheader if inside a tbody', async function (assert) {
    this.set('model', [
      { key: 'artist', name: 'Test 1', description: 'Test 1 description' },
      { key: 'album', name: 'Test 2', description: 'Test 2 description' },
      { key: 'year', name: 'Test 3', description: 'Test 3 description' },
    ]);

    this.set('columns', [
      { key: 'artist', label: 'components.table.headers.artist' },
      { key: 'album', label: 'components.table.headers.album' },
      { key: 'year', label: 'components.table.headers.year' },
    ]);

    await render(
      <template><AdvancedTable @model={{this.model}} @columns={{this.columns}}><:body as |B|><B.Tr><B.Th id="data-advanced-test-table-th">Artist</B.Th></B.Tr></:body></AdvancedTable></template>,
    );
    assert
      .dom('#data-advanced-test-table-th')
      .hasAttribute('role', 'rowheader');
  });

  // TOOLTIP

  test('if @tooltip is undefined a tooltip button toggle should not be present', async function (assert) {
    await render(
      <template><Th id="data-advanced-test-table-th">Artist</Th></template>,
    );

    assert
      .dom(
        '#data-advanced-test-table-th .hds-advanced-table__th-button--tooltip',
      )
      .doesNotExist();
  });
  test('if @tooltip is defined a tooltip should be added to the table cell header', async function (assert) {
    await render(
      <template><Th @tooltip="More info." id="data-advanced-test-table-th">Artist</Th></template>,
    );

    assert
      .dom(
        '#data-advanced-test-table-th .hds-advanced-table__th-button--tooltip',
      )
      .exists();
    // activate the tooltip:
    await focus(
      '#data-advanced-test-table-th .hds-advanced-table__th-button--tooltip',
    );
    // test that the tooltip exists and has the passed in content:
    assert.dom('.tippy-content').hasText('More info.');
  });
  test('it renders the `aria-labelledby` attribute for the tooltip button with the correct IDs', async function (assert) {
    await render(
      <template><Th id="data-advanced-test-table-th" @tooltip="More info.">Artist</Th></template>,
    );
    let prefixLabel = this.element.querySelector(
      '#data-advanced-test-table-th .hds-advanced-table__th-button-aria-label-hidden-segment',
    );
    let buttonLabel = this.element.querySelector(
      '#data-advanced-test-table-th .hds-advanced-table__th-content > span',
    );
    assert
      .dom(
        '#data-advanced-test-table-th .hds-advanced-table__th-button--tooltip',
      )
      .hasAria('labelledby', `${prefixLabel.id} ${buttonLabel.id}`);
  });
});

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, focus, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/advanced-table/th', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Th
  id='data-advanced-test-table-th'
>Artist</Hds::AdvancedTable::Th>`
    );

    assert
      .dom('#data-advanced-test-table-th')
      .hasClass('hds-advanced-table__th');
  });

  // CONTENT

  test('it renders text content yielded within the cell (no tooltip)', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Th
  id='data-advanced-test-table-th'
>Artist</Hds::AdvancedTable::Th>`
    );
    assert
      .dom(
        '#data-advanced-test-table-th .hds-advanced-table__th-content > span'
      )
      .hasText('Artist');
  });

  test('it renders text content yielded within the cell (with tooltip)', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Th
  id='data-advanced-test-table-th'
  @tooltip='More info.'
>Artist</Hds::AdvancedTable::Th>`
    );
    assert
      .dom(
        '#data-advanced-test-table-th .hds-advanced-table__th-content > span'
      )
      .hasText('Artist');
  });

  // EXPAND/COLLAPSE

  test('it does not render an expand button by default', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Th
  id='data-advanced-test-table-th'
>Artist</Hds::AdvancedTable::Th>`
    );

    assert.dom('.hds-advanced-table__th-button--expand').doesNotExist();
  });

  test('it renders an expand button when `@isExpandable` is true and defaults to collapsed', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Th
  id='data-advanced-test-table-th'
  @isExpandable={{true}}
>Artist</Hds::AdvancedTable::Th>`
    );
    assert
      .dom(
        '#data-advanced-test-table-th .hds-advanced-table__th-button--expand'
      )
      .hasText('Toggle')
      .hasAria('expanded', 'false');
  });

  // ONCLICKTOGGLE

  test('it should call the `@onClickToggle` function if provided', async function (assert) {
    let isClicked = false;
    this.set('onClickToggle', () => (isClicked = true));

    await render(
      hbs`<Hds::AdvancedTable::Th
  id='data-advanced-test-table-th'
  @isExpandable={{true}}
@onClickToggle={{this.onClickToggle}}
>Artist</Hds::AdvancedTable::Th>`
    );

    await click(
      '#data-advanced-test-table-th .hds-advanced-table__th-button--expand'
    );

    assert.ok(isClicked);
  });

  // ALIGNMENT

  test('it should render with the appropriate `@align` CSS class', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Th
  id='data-advanced-test-table-th'
  @align='right'
>Artist</Hds::AdvancedTable::Th>`
    );
    assert
      .dom('#data-advanced-test-table-th')
      .hasClass('hds-advanced-table__th--align-right');
  });

  // ATTRIBUTES

  test('it should render with the appropriate span information by default', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Th id='data-test-advanced-table-th' />`
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
      hbs`<Hds::AdvancedTable::Th
  id='data-test-advanced-table-th'
  @rowspan={{3}}
  @colspan={{5}}
/>`
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

  test('it should support splattributes', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Th
  id='data-advanced-test-table-th'
  lang='es'
>Artist</Hds::AdvancedTable::Th>`
    );
    assert.dom('#data-advanced-test-table-th').hasAttribute('lang', 'es');
  });

  test('it has the role attribute set to columnheader by default', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Th
  id='data-advanced-test-table-th'
>Artist</Hds::AdvancedTable::Th>`
    );
    assert
      .dom('#data-advanced-test-table-th')
      .hasAttribute('role', 'columnheader');
  });
  test('it has the scope attribute set to row if inside a tbody', async function (assert) {
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
      hbs`<Hds::AdvancedTable @model={{this.model}} @columns={{this.columns}}><:body
    as |B|
  ><B.Tr><B.Th
        id='data-advanced-test-table-th'
      >Artist</B.Th></B.Tr></:body></Hds::AdvancedTable>`
    );
    assert
      .dom('#data-advanced-test-table-th')
      .hasAttribute('role', 'rowheader');
  });

  // TOOLTIP

  test('if @tooltip is undefined a tooltip button toggle should not be present', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Th
  id='data-advanced-test-table-th'
>Artist</Hds::AdvancedTable::Th>`
    );

    assert
      .dom(
        '#data-advanced-test-table-th .hds-advanced-table__th-button--tooltip'
      )
      .doesNotExist();
  });
  test('if @tooltip is defined a tooltip should be added to the table cell header', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Th
  @tooltip='More info.'
  id='data-advanced-test-table-th'
>Artist</Hds::AdvancedTable::Th>`
    );

    assert
      .dom(
        '#data-advanced-test-table-th .hds-advanced-table__th-button--tooltip'
      )
      .exists();
    // activate the tooltip:
    await focus(
      '#data-advanced-test-table-th .hds-advanced-table__th-button--tooltip'
    );
    // test that the tooltip exists and has the passed in content:
    assert.dom('.tippy-content').hasText('More info.');
  });
  test('it renders the `aria-labelledby` attribute for the tooltip button with the correct IDs', async function (assert) {
    await render(
      hbs`<Hds::AdvancedTable::Th id="data-advanced-test-table-th" @tooltip="More info.">Artist</Hds::AdvancedTable::Th>`
    );
    let prefixLabel = this.element.querySelector(
      '#data-advanced-test-table-th .hds-advanced-table__th-button-aria-label-hidden-segment'
    );
    let buttonLabel = this.element.querySelector(
      '#data-advanced-test-table-th .hds-advanced-table__th-content > span'
    );
    assert
      .dom(
        '#data-advanced-test-table-th .hds-advanced-table__th-button--tooltip'
      )
      .hasAria('labelledby', `${prefixLabel.id} ${buttonLabel.id}`);
  });
});

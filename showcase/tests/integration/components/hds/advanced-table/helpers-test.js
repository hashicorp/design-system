/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, focus, tab, triggerKeyEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

// we're using this for multiple tests so we'll declare context once and use it when we need it.
const setSortableTableData = (context) => {
  context.set('model', [
    {
      id: '1',
      type: 'folk',
      artist: 'Nick Drake',
      album: 'Pink Moon',
      year: '1972',
    },
    {
      id: '2',
      type: 'folk',
      artist: 'The Beatles',
      album: 'Abbey Road',
      year: '1969',
    },
    {
      id: '3',
      type: 'folk',
      artist: 'Melanie',
      album: 'Candles in the Rain',
      year: '1971',
    },
  ]);
  context.set('columns', [
    { key: 'artist', label: 'Artist', isSortable: true, tooltip: 'More info' },
    { key: 'album', label: 'Album', isSortable: true },
    { key: 'year', label: 'Year' },
  ]);
};

const hbsSortableAdvancedTable = hbs`<Hds::AdvancedTable
  @model={{this.model}}
  @onSort={{this.onSort}}
  @columns={{this.columns}}
  @sortedMessageText={{this.sortedMessageText}}
  @caption={{this.caption}}
  id='data-test-advanced-table'
>
  <:body as |B|>
    <B.Tr>
      <B.Th id="artist-{{B.data.id}}">{{B.data.artist}}</B.Th>
      <B.Td id="album-{{B.data.id}}">{{B.data.album}} <button tabindex='-1'>Disabled button</button></B.Td>
      <B.Td id="year-{{B.data.id}}">{{B.data.year}} <button disabled>Disabled button</button></B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>
<button id='after-advanced-table'>Click me</button>`;

module(
  'Integration | Component | hds/advanced-table/helpers',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should add correct tabindex to cells', async function (assert) {
      setSortableTableData(this);
      await render(hbsSortableAdvancedTable);

      const gridCells = document.querySelectorAll(
        '.hds-advanced-table__td, .hds-advanced-table__th'
      );

      assert.dom(gridCells[0]).hasAttribute('tabindex', '0');

      // should only be one focusable cell
      assert
        .dom(
          '.hds-advanced-table__td[tabindex="0"], .hds-advanced-table__th[tabindex="0"]'
        )
        .exists({ count: 1 });
      assert
        .dom(
          '.hds-advanced-table__td[tabindex="-1"], .hds-advanced-table__th[tabindex="-1"]'
        )
        .exists({ count: gridCells.length - 1 });
    });

    test('it should add the data attribute to focusable content inside cells', async function (assert) {
      setSortableTableData(this);
      await render(hbsSortableAdvancedTable);

      const grid = document.getElementById('data-test-advanced-table');
      // get all not disabled focusable elements that aren't cells
      const focusableElements = grid.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]) [tabindex]:not([tabindex="-1"]):not([disabled]):not(.hds-advanced-table__td):not(.hds-advanced-table__th)'
      );

      assert
        .dom('[data-advanced-table-child-focusable=""]')
        .exists({ count: focusableElements.length });
    });

    test('it should act as one tabstop', async function (assert) {
      setSortableTableData(this);
      await render(hbsSortableAdvancedTable);

      const gridCells = document.querySelectorAll(
        '.hds-advanced-table__td, .hds-advanced-table__th'
      );

      await tab();
      assert.dom(gridCells[0]).isFocused();
      await tab();
      assert.dom('#after-advanced-table').isFocused();
    });

    test('it should be navigable with arrow keys', async function (assert) {
      setSortableTableData(this);
      await render(hbsSortableAdvancedTable);

      const gridCells = document.querySelectorAll(
        '.hds-advanced-table__td, .hds-advanced-table__th'
      );

      await focus(gridCells[0]);
      assert
        .dom(document.activeElement)
        .hasText('Artist More information for Sort by ascending');

      // check it doesn't break if you try to navigate to cell that doesn't exist
      await triggerKeyEvent(gridCells[0], 'keydown', 'ArrowUp');
      assert.dom(gridCells[0]).isFocused().hasAttribute('tabindex', '0');

      await triggerKeyEvent(gridCells[0], 'keydown', 'ArrowDown');
      assert.dom('#artist-1').isFocused().hasAttribute('tabindex', '0');
      assert.dom(gridCells[0]).hasAttribute('tabindex', '-1');

      // check it doesn't break if you try to navigate to cell that doesn't exist
      await triggerKeyEvent('#artist-1', 'keydown', 'ArrowLeft');
      assert.dom('#artist-1').isFocused().hasAttribute('tabindex', '0');

      await triggerKeyEvent('#artist-1', 'keydown', 'ArrowRight');
      assert.dom('#album-1').isFocused().hasAttribute('tabindex', '0');
      assert.dom('#artist-1').hasAttribute('tabindex', '-1');
    });

    test('it should have keyboard shortcuts', async function (assert) {
      setSortableTableData(this);
      await render(hbsSortableAdvancedTable);

      const firstCell = document.querySelector('.hds-advanced-table__th');

      await triggerKeyEvent(firstCell, 'keydown', 'PageDown');
      assert.dom('#artist-3').isFocused();

      await triggerKeyEvent('#artist-3', 'keydown', 'PageUp');
      assert.dom(firstCell).isFocused();

      await triggerKeyEvent('#artist-3', 'keydown', 'End');
      assert.dom('#year-3').isFocused();

      await triggerKeyEvent('#year-3', 'keydown', 'Home');
      assert.dom('#artist-3').isFocused();
    });

    test('it should switch navigation modes properly', async function (assert) {
      setSortableTableData(this);
      await render(hbsSortableAdvancedTable);

      const firstCell = document.querySelector('.hds-advanced-table__th');
      const firstCellSortButton = firstCell.querySelector('button');

      assert.dom(firstCell).hasAttribute('tabindex', '0');
      assert.dom(firstCellSortButton).hasAttribute('tabindex', '-1');

      // content within cells should not be focusable
      assert
        .dom('[data-advanced-table-child-focusable=""][tabindex="0"]')
        .doesNotExist();

      await triggerKeyEvent(firstCell, 'keydown', 'Enter');
      assert.dom(firstCellSortButton).isFocused().hasAttribute('tabindex', '0');

      // cells should not be focusable anymore
      assert.dom('.hds-advanced-table__th[tabindex="0"]').doesNotExist();
      assert.dom('.hds-advanced-table__td[tabindex="0"]').doesNotExist();

      await triggerKeyEvent(firstCellSortButton, 'keydown', 'Escape');
      assert.dom(firstCell).isFocused().hasAttribute('tabindex', '0');
      assert.dom(firstCellSortButton).hasAttribute('tabindex', '-1');

      // content within cells should not be focusable anymore
      assert
        .dom('[data-advanced-table-child-focusable=""][tabindex="0"]')
        .doesNotExist();
    });

    test('it should trap focus inside a cell when not in navigation mode', async function (assert) {
      setSortableTableData(this);
      await render(hbsSortableAdvancedTable);

      const firstCell = document.querySelector('.hds-advanced-table__th');
      const cellButtons = firstCell.querySelectorAll('button');

      await triggerKeyEvent(firstCell, 'keydown', 'Enter');
      assert.dom(cellButtons[0]).isFocused().hasAttribute('tabindex', '0');

      await tab();
      assert.dom(cellButtons[1]).isFocused().hasAttribute('tabindex', '0');

      await tab();
      assert.dom(cellButtons[0]).isFocused().hasAttribute('tabindex', '0');

      await tab({ backwards: true });
      assert.dom(cellButtons[1]).isFocused().hasAttribute('tabindex', '0');

      await tab({ backwards: true });
      assert.dom(cellButtons[0]).isFocused().hasAttribute('tabindex', '0');
    });
  }
);

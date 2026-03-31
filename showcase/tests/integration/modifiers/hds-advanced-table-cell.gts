/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import {
  render,
  focus,
  tab,
  triggerKeyEvent,
  click,
  find,
  findAll,
} from '@ember/test-helpers';
import { focusable } from 'tabbable';
import { get } from '@ember/helper';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

// we're using this for multiple tests so we'll declare context once and use it when we need it.
const DEFAULT_SORTABLE_MODEL = [
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
];

const DEFAULT_SORTABLE_COLUMNS = [
  { key: 'artist', label: 'Artist', isSortable: true, tooltip: 'More info' },
  { key: 'album', label: 'Album', isSortable: true },
  { key: 'year', label: 'Year' },
];

const DEFAULT_NESTED_MODEL = [
  {
    id: 1,
    name: 'Policy set 1',
    status: 'PASS',
    description: '',
    children: [
      {
        id: 11,
        name: 'test-advisory-pass.sentinel',
        status: 'PASS',
        description: 'Sample description for this thing.',
      },
      {
        id: 12,
        name: 'test-hard-mandatory-pass.sentinel',
        status: 'PASS',
        description: 'Sample description for this thing.',
      },
    ],
  },
  {
    id: 2,
    name: 'Policy set 2',
    status: 'FAIL',
    description: '',
    children: [
      {
        id: 21,
        name: 'test-advisory-pass.sentinel',
        status: 'PASS',
        description: 'Sample description for this thing.',
        children: [
          {
            id: 211,
            name: 'test-advisory-pass.sentinel.primary',
            status: 'PASS',
            description: 'Sample description for this thing.',
          },
        ],
      },
    ],
  },
];

const DEFAULT_NESTED_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
  { key: 'description', label: 'Description' },
];

const createSortableTable = async () => {
  return await render(
    <template>
      <HdsAdvancedTable
        @model={{DEFAULT_SORTABLE_MODEL}}
        @columns={{DEFAULT_SORTABLE_COLUMNS}}
        id="data-test-advanced-table"
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error }}
            <B.Td>{{get B.data "artist"}}</B.Td>
            {{! @glint-expect-error }}
            <B.Td>{{get B.data "album"}}</B.Td>
            {{! @glint-expect-error }}
            <B.Td>{{get B.data "year"}}</B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>
    </template>,
  );
};

const createNestedTable = async () => {
  return await render(
    <template>
      <HdsAdvancedTable
        @model={{DEFAULT_NESTED_MODEL}}
        @columns={{DEFAULT_NESTED_COLUMNS}}
        id="data-test-nested-advanced-table"
      >
        <:body as |B|>
          {{! @glint-expect-error }}
          <B.Tr @selectionKey={{get B.data "id"}}>
            {{! @glint-expect-error }}
            <B.Th>{{get B.data "name"}}</B.Th>
            {{! @glint-expect-error }}
            <B.Td>{{get B.data "status"}}</B.Td>
            {{! @glint-expect-error }}
            <B.Td>{{get B.data "description"}}</B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>
    </template>,
  );
};

module('Integration | Modifier | hds-advanced-table-cell', function (hooks) {
  setupRenderingTest(hooks);

  test('it should add correct tabindex to cells', async function (assert) {
    await createSortableTable();

    const gridCells = findAll(
      '.hds-advanced-table__td, .hds-advanced-table__th',
    );

    assert.dom(gridCells[0]).hasAttribute('tabindex', '0');

    // should only be one focusable cell
    assert
      .dom(
        '.hds-advanced-table__td[tabindex="0"], .hds-advanced-table__th[tabindex="0"]',
      )
      .exists({ count: 1 });
    assert
      .dom(
        '.hds-advanced-table__td[tabindex="-1"], .hds-advanced-table__th[tabindex="-1"]',
      )
      .exists({ count: gridCells.length - 1 });
  });

  test('it should add the data attribute to focusable content inside cells', async function (assert) {
    await createSortableTable();

    const grid = find('#data-test-advanced-table');

    if (grid) {
      const focusableElements = focusable(grid).filter(
        (element) =>
          !element.classList.contains('hds-advanced-table__th') &&
          !element.classList.contains('hds-advanced-table__td'),
      );

      assert
        .dom('[data-advanced-table-child-focusable=""]')
        .exists({ count: focusableElements.length });
    }
  });

  test('it should act as one tabstop', async function (assert) {
    await createSortableTable();

    const gridCells = findAll(
      '.hds-advanced-table__td, .hds-advanced-table__th',
    );

    await tab();
    assert.dom(gridCells[0]).isFocused();
    await tab();
    assert.dom('#after-advanced-table').isFocused();
  });

  test('it should be navigable with arrow keys', async function (assert) {
    await createNestedTable();

    const gridCells = findAll(
      '.hds-advanced-table__td, .hds-advanced-table__th',
    );

    if (gridCells[0]) {
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
    }
  });

  test('it should be navigable with arrow keys when there are nested rows', async function (assert) {
    await createNestedTable();

    const gridCells = findAll(
      '.hds-advanced-table__td, .hds-advanced-table__th',
    );

    if (gridCells[0]) {
      await focus(gridCells[0]);
      assert.dom(document.activeElement).hasText('Name');

      // check it doesn't break if you try to navigate to cell that doesn't exist
      await triggerKeyEvent(gridCells[0], 'keydown', 'ArrowUp');
      assert.dom(gridCells[0]).isFocused().hasAttribute('tabindex', '0');

      await triggerKeyEvent(gridCells[0], 'keydown', 'ArrowDown');
      assert.dom('#name-1').isFocused().hasAttribute('tabindex', '0');
      assert.dom(gridCells[0]).hasAttribute('tabindex', '-1');

      // check it doesn't break if you try to navigate to cell that doesn't exist
      await triggerKeyEvent('#name-1', 'keydown', 'ArrowLeft');
      assert.dom('#name-1').isFocused().hasAttribute('tabindex', '0');

      await triggerKeyEvent('#name-1', 'keydown', 'ArrowRight');
      assert.dom('#status-1').isFocused().hasAttribute('tabindex', '0');
      assert.dom('#name-1').hasAttribute('tabindex', '-1');

      await triggerKeyEvent('#status-1', 'keydown', 'ArrowDown');
      assert.dom('#status-2').isFocused().hasAttribute('tabindex', '0');
      assert.dom('#status-1').hasAttribute('tabindex', '-1');

      const expandRowButtonSelector = '.hds-advanced-table__th-button--expand';
      const rowToggles = findAll(expandRowButtonSelector);

      if (rowToggles[0]) {
        await click(rowToggles[0]);

        // check that can navigate to newly visible cells
        await triggerKeyEvent('#status-1', 'keydown', 'ArrowDown');
        assert.dom('#status-11').isFocused().hasAttribute('tabindex', '0');
        assert.dom('#status-1').hasAttribute('tabindex', '-1');
      }
    }
  });

  test('it should have keyboard shortcuts', async function (assert) {
    await createSortableTable();
    const firstCell = find('.hds-advanced-table__th');

    if (firstCell) {
      await triggerKeyEvent(firstCell, 'keydown', 'PageDown');
      assert.dom('#artist-3').isFocused();

      await triggerKeyEvent('#artist-3', 'keydown', 'PageUp');
      assert.dom(firstCell).isFocused();

      await triggerKeyEvent('#artist-3', 'keydown', 'End');
      assert.dom('#year-3').isFocused();

      await triggerKeyEvent('#year-3', 'keydown', 'Home');
      assert.dom('#artist-3').isFocused();
    }
  });

  test('it should have keyboard shortcuts when there are nested rows', async function (assert) {
    await createNestedTable();

    const firstCell = find('.hds-advanced-table__th');

    if (firstCell) {
      await triggerKeyEvent(firstCell, 'keydown', 'PageDown');
      assert.dom('#name-2').isFocused();

      await triggerKeyEvent('#name-2', 'keydown', 'PageUp');
      assert.dom(firstCell).isFocused();

      await triggerKeyEvent('#name-2', 'keydown', 'End');
      assert.dom('#description-2').isFocused();

      await triggerKeyEvent('#description-2', 'keydown', 'Home');
      assert.dom('#name-2').isFocused();

      const expandRowButtonSelector =
        '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__th[role="rowheader"] .hds-advanced-table__th-button--expand';
      const rowToggles = findAll(expandRowButtonSelector);
      const lastToggle = rowToggles[rowToggles.length - 1];

      if (rowToggles.length > 0 && lastToggle) {
        await click(lastToggle);

        // check that when the cells are expanded, the shortcuts jump to the new last cell in the column
        await triggerKeyEvent(firstCell, 'keydown', 'PageDown');
        assert.dom('#name-21').isFocused();

        await triggerKeyEvent('#name-21', 'keydown', 'PageUp');
        assert.dom(firstCell).isFocused();
      }
    }
  });

  test('it should switch navigation modes properly', async function (assert) {
    await createSortableTable();

    const firstCell = find('.hds-advanced-table__th');
    const firstCellSortButton = find('.hds-advanced-table__th button');

    assert.dom(firstCell).hasAttribute('tabindex', '0');
    assert.dom(firstCellSortButton).hasAttribute('tabindex', '-1');

    if (firstCell && firstCellSortButton) {
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
      assert.dom(firstCell).hasAttribute('tabindex', '0');
      assert.dom(firstCellSortButton).hasAttribute('tabindex', '-1');

      // content within cells should not be focusable anymore
      assert
        .dom('[data-advanced-table-child-focusable=""][tabindex="0"]')
        .doesNotExist();
    }
  });

  test('it should trap focus inside a cell when not in navigation mode', async function (assert) {
    await createSortableTable();

    const firstCell = find('.hds-advanced-table__th');
    const cellButtons = firstCell?.querySelectorAll('button');

    if (firstCell && cellButtons) {
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
    }
  });
});

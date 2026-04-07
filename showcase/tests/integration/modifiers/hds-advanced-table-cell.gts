/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import {
  render,
  tab,
  triggerKeyEvent,
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

module('Integration | Modifier | hds-advanced-table-cell', function (hooks) {
  setupRenderingTest(hooks);

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

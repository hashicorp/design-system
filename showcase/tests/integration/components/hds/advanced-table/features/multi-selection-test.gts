/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { click, findAll, render } from '@ember/test-helpers';
import { get } from '@ember/helper';
import { TrackedObject } from 'tracked-built-ins';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/types';

import { setupRenderingTest } from 'showcase/tests/helpers';

const DEFAULT_SELECTABLE_MODEL = [
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

const DEFAULT_SELECTABLE_COLUMNS = [
  { key: 'artist', label: 'Artist' },
  { key: 'album', label: 'Album' },
  { key: 'year', label: 'Year' },
];

const createSelectableTable = async (options: {
  selectionAriaLabelSuffix?: string;
  hasStickyFirstColumn?: boolean;
  onSelectionChange?: (
    args: HdsAdvancedTableOnSelectionChangeSignature,
  ) => void;
}) => {
  return await render(
    <template>
      <HdsAdvancedTable
        @model={{DEFAULT_SELECTABLE_MODEL}}
        @columns={{DEFAULT_SELECTABLE_COLUMNS}}
        id="data-test-selectable-advanced-table"
        @hasStickyFirstColumn={{options.hasStickyFirstColumn}}
        @onSelectionChange={{options.onSelectionChange}}
        @isSelectable={{true}}
      >
        <:body as |B|>
          <B.Tr
            {{! @glint-expect-error }}
            @selectionKey={{get B.data "id"}}
            @selectionAriaLabelSuffix={{options.selectionAriaLabelSuffix}}
          >
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

module('Integration | Component | hds/advanced-table/index', function (hooks) {
  setupRenderingTest(hooks);

  module('multi-selection', function () {
    const selectAllCheckboxSelector =
      '#data-test-selectable-advanced-table .hds-advanced-table__thead .hds-advanced-table__th[role="columnheader"] .hds-advanced-table__checkbox';
    const rowCheckboxesSelector =
      '#data-test-selectable-advanced-table .hds-advanced-table__tbody .hds-advanced-table__th .hds-advanced-table__checkbox';

    test('it renders a multi-select table when isSelectable is set to true for a table with a model', async function (assert) {
      await createSelectableTable({});

      assert.dom(selectAllCheckboxSelector).exists({ count: 1 });
      assert
        .dom(rowCheckboxesSelector)
        .exists({ count: DEFAULT_SELECTABLE_MODEL.length });
    });

    test('it selects all rows when the "select all" checkbox checked state is triggered', async function (assert) {
      await createSelectableTable({});

      // Default should be unchecked:
      assert.dom(selectAllCheckboxSelector).isNotChecked();
      assert.dom(rowCheckboxesSelector).isNotChecked().exists({ count: 3 });
      // Should change to checked after it is triggered:
      await click(selectAllCheckboxSelector);
      assert.dom(selectAllCheckboxSelector).isChecked();
      assert.dom(rowCheckboxesSelector).isChecked().exists({ count: 3 });
    });

    test('it deselects all rows when the "select all" checkbox unchecked state is triggered', async function (assert) {
      await createSelectableTable({});
      // Trigger checked status:
      await click(selectAllCheckboxSelector);
      // Trigger unchecked state:
      await click(selectAllCheckboxSelector);
      assert.dom(selectAllCheckboxSelector).isNotChecked();
      assert.dom(rowCheckboxesSelector).isNotChecked().exists({ count: 3 });
    });

    test('if some rows are selected but not all, the "select all" checkbox should be in an indeterminate state', async function (assert) {
      await createSelectableTable({});
      const rowCheckboxes = findAll(rowCheckboxesSelector);
      const firstRowCheckbox = rowCheckboxes[0];

      if (firstRowCheckbox) {
        // Check checkbox in just the first row:
        await click(firstRowCheckbox);
        assert
          .dom(selectAllCheckboxSelector)
          .hasProperty('indeterminate', true);
      }
    });

    test('it should invoke the `onSelectionChange` callback when a checkbox is selected', async function (assert) {
      const context = new TrackedObject<{
        keys: string[];
      }>({
        keys: [],
      });

      const onSelectionChange = ({
        selectedRowsKeys,
      }: {
        selectedRowsKeys: string[];
      }) => {
        context.keys = selectedRowsKeys;
      };

      await createSelectableTable({ onSelectionChange });

      const rowCheckboxes = findAll(rowCheckboxesSelector);
      const firstRowCheckbox = rowCheckboxes[0];

      if (firstRowCheckbox) {
        await click(firstRowCheckbox);
        assert.deepEqual(context.keys, ['1']);
      }

      await click(selectAllCheckboxSelector);
      assert.deepEqual(context.keys, ['1', '2', '3']);
      await click(selectAllCheckboxSelector);
      assert.deepEqual(context.keys, []);
    });

    test('it renders the expected `aria-label` values for "select all" and rows by default', async function (assert) {
      await createSelectableTable({});

      assert.dom(selectAllCheckboxSelector).hasAria('label', 'Select all rows');
      assert.dom(rowCheckboxesSelector).hasAria('label', 'Select row');

      await click(selectAllCheckboxSelector);
      await click(rowCheckboxesSelector);

      assert.dom(selectAllCheckboxSelector).hasAria('label', 'Select all rows');
      assert.dom(rowCheckboxesSelector).hasAria('label', 'Select row');
    });

    test('it renders the expected `aria-label` for rows with `@selectionAriaLabelSuffix`', async function (assert) {
      await createSelectableTable({
        selectionAriaLabelSuffix: 'custom suffix',
      });

      assert
        .dom(rowCheckboxesSelector)
        .hasAria('label', 'Select custom suffix');

      await click(rowCheckboxesSelector);

      assert
        .dom(rowCheckboxesSelector)
        .hasAria('label', 'Select custom suffix');
    });
  });
});

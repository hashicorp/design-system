/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import {
  click,
  find,
  findAll,
  render,
  setupOnerror,
} from '@ember/test-helpers';
import { get } from '@ember/helper';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type {
  HdsAdvancedTableColumn,
  HdsAdvancedTableDensities,
  HdsAdvancedTableOnSelectionChangeSignature,
  HdsAdvancedTableVerticalAlignment,
} from '@hashicorp/design-system-components/components/hds/advanced-table/types';

import { setupRenderingTest } from 'showcase/tests/helpers';

async function performContextMenuAction(th: Element | null, key: string) {
  const contextMenuToggle = th?.querySelector('.hds-dropdown-toggle-icon');

  if (contextMenuToggle) {
    await click(contextMenuToggle);
    return click(`[data-test-context-option-key="${key}"]`);
  }
}

const DEFAULT_BASIC_MODEL = [
  { id: '1', name: 'Bob', age: 20, country: 'USA' },
  { id: '2', name: 'Alice', age: 25, country: 'UK' },
  { id: '3', name: 'Charlie', age: 30, country: 'Canada' },
];

const DEFAULT_BASIC_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'country', label: 'Country' },
];

const createBasicTable = async (options: {
  hasStickyFirstColumn?: boolean;
  maxHeight?: string;
  hasStickyHeader?: boolean;
}) => {
  return await render(
    <template>
      <HdsAdvancedTable
        @isSelectable={{true}}
        @model={{DEFAULT_BASIC_MODEL}}
        @columns={{DEFAULT_BASIC_COLUMNS}}
        @hasStickyFirstColumn={{options.hasStickyFirstColumn}}
        @maxHeight={{options.maxHeight}}
        @hasStickyHeader={{options.hasStickyHeader}}
        id="data-test-advanced-table"
      >
        <:body as |B|>
          {{! @glint-expect-error }}
          <B.Tr @selectionKey={{get B.data "id"}}>
            {{! @glint-expect-error }}
            <B.Th>{{get B.data "name"}}</B.Th>
            {{! @glint-expect-error }}
            <B.Td>{{get B.data "age"}}</B.Td>
            {{! @glint-expect-error }}
            <B.Td>{{get B.data "country"}}</B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>
    </template>,
  );
};

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
  { key: 'artist', label: 'Artist', isSortable: true },
  { key: 'album', label: 'Album', isSortable: true },
  { key: 'year', label: 'Year' },
];

const createSortableTable = async (options: {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  sortedMessageText?: string;
  caption?: string;
  hasStickyFirstColumn?: boolean;
  density?: HdsAdvancedTableDensities;
  valign?: HdsAdvancedTableVerticalAlignment;
  maxHeight?: string;
  hasStickyHeader?: boolean;
  hasTooltip?: boolean;
  columns?: HdsAdvancedTableColumn[];
}) => {
  const columns = DEFAULT_SORTABLE_COLUMNS.map((col, index) => {
    if (options.hasTooltip && index === 0) {
      return { ...col, tooltip: 'More info.' };
    }
    return col;
  });

  return await render(
    <template>
      <HdsAdvancedTable
        @model={{DEFAULT_SORTABLE_MODEL}}
        @sortBy={{options.sortBy}}
        @sortOrder={{options.sortOrder}}
        @onSort={{options.onSort}}
        @columns={{if options.columns options.columns columns}}
        @sortedMessageText={{options.sortedMessageText}}
        @caption={{options.caption}}
        @hasStickyFirstColumn={{options.hasStickyFirstColumn}}
        @density={{options.density}}
        @valign={{options.valign}}
        @maxHeight={{options.maxHeight}}
        @hasStickyHeader={{options.hasStickyHeader}}
        id="data-test-sortable-advanced-table"
      >
        <:body as |B|>
          <B.Tr>
            {{! @glint-expect-error }}
            <B.Td>{{B.data.artist}}</B.Td>
            {{! @glint-expect-error }}
            <B.Td>{{B.data.album}}</B.Td>
            {{! @glint-expect-error }}
            <B.Td>{{B.data.year}}</B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>
    </template>,
  );
};

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

  module('sticky header & columns', function () {
    test('it should render with a CSS class appropriate for the @hasStickyHeader argument', async function (assert) {
      await createBasicTable({
        hasStickyHeader: true,
        maxHeight: '75px',
      });

      assert
        .dom('#data-test-advanced-table .hds-advanced-table__thead')
        .hasClass('hds-advanced-table__thead--sticky');
    });

    test('it should render the appropriate CSS and add a sticky header when set @maxHeight', async function (assert) {
      await createBasicTable({
        maxHeight: '75px',
      });

      assert
        .dom('#data-test-advanced-table .hds-advanced-table__thead')
        .hasClass('hds-advanced-table__thead--sticky');

      assert
        .dom('#data-test-advanced-table .hds-advanced-table')
        .hasStyle({ maxHeight: '75px' });
    });

    test('it should render the appropriate CSS when set @maxHeight and @hasStickyHeader is set to false', async function (assert) {
      await createBasicTable({
        hasStickyHeader: false,
        maxHeight: '75px',
      });

      assert
        .dom('#data-test-advanced-table .hds-advanced-table__thead')
        .doesNotHaveClass('hds-advanced-table__thead--sticky');

      assert
        .dom('#data-test-advanced-table .hds-advanced-table')
        .hasStyle({ maxHeight: '75px' });
    });

    test('it throws an assertion if it has `@hasStickyHeader` and does not have @maxHeight', async function (assert) {
      const errorMessage = 'Must set @maxHeight to use @hasStickyHeader.';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      await createBasicTable({
        hasStickyHeader: true,
      });

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });

    test('it should render with a CSS class appropriate for the @hasStickyFirstColumn argument', async function (assert) {
      await createSortableTable({
        hasStickyFirstColumn: true,
      });

      assert
        .dom(
          '.hds-advanced-table__th.hds-advanced-table__th--is-sticky-column.hds-advanced-table__th--sort',
        )
        .exists({ count: 1 });

      assert.dom('.hds-advanced-table__th').exists({ count: 3 });
    });

    test('it should render with a CSS class appropriate for the @hasStickyFirstColumn argument when also selectable', async function (assert) {
      await createSelectableTable({
        hasStickyFirstColumn: true,
      });

      assert
        .dom(
          '.hds-advanced-table__th--is-selectable.hds-advanced-table__th--is-sticky-column',
        )
        .exists({ count: 4 });

      assert
        .dom(
          '.hds-advanced-table__th.hds-advanced-table__th--is-sticky-column:not(.hds-advanced-table__th--is-selectable)',
        )
        .exists({ count: 4 });
    });

    test('it should show the context menu when the @hasStickyFirstColumn argument is true', async function (assert) {
      await createBasicTable({
        hasStickyFirstColumn: true,
      });

      const ths = findAll('.hds-advanced-table__th');
      const firstTh = ths[1]; // find the first header cell after the selectable column

      if (firstTh) {
        assert.ok(
          firstTh.querySelector('.hds-advanced-table__th-context-menu'),
          'context menu exists',
        );

        const contextMenuToggle = firstTh.querySelector(
          '.hds-dropdown-toggle-icon',
        );

        if (contextMenuToggle) {
          await click(contextMenuToggle);

          assert
            .dom('[data-test-context-option-key="pin-first-column"]')
            .exists();
        }
      }
    });

    test('it should show the context menu when the @hasStickyFirstColumn argument is false', async function (assert) {
      await createBasicTable({
        hasStickyFirstColumn: false,
      });

      const ths = findAll('.hds-advanced-table__th');
      const firstTh = ths[1]; // find the first header cell after the selectable column

      if (firstTh) {
        assert.ok(
          firstTh.querySelector('.hds-advanced-table__th-context-menu'),
          'context menu exists',
        );

        const contextMenuToggle = firstTh.querySelector(
          '.hds-dropdown-toggle-icon',
        );

        if (contextMenuToggle) {
          await click(contextMenuToggle);
          assert
            .dom('[data-test-context-option-key="pin-first-column"]')
            .exists();
        }
      }
    });

    test('it should not show the context menu when the @hasStickyFirstColumn argument is undefined', async function (assert) {
      await createBasicTable({});

      const ths = findAll('.hds-advanced-table__th');
      const firstTh = ths[1]; // find the first header cell after the selectable column

      if (firstTh) {
        assert.notOk(
          firstTh.querySelector('.hds-advanced-table__th-context-menu'),
          'context menu exists',
        );
      }
    });

    test('it should toggle column pinning when the context menu item is clicked', async function (assert) {
      await createBasicTable({
        hasStickyFirstColumn: false,
      });

      const ths = findAll('.hds-advanced-table__th');
      const firstTh = ths[1]; // find the first header cell after the selectable column

      if (firstTh) {
        // Pin column
        await performContextMenuAction(firstTh, 'pin-first-column');

        assert
          .dom(
            '.hds-advanced-table__thead .hds-advanced-table__th.hds-advanced-table__th--is-sticky-column',
          )
          .exists({ count: 2 });

        // Unpin column
        await performContextMenuAction(firstTh, 'pin-first-column');

        assert
          .dom(
            '.hds-advanced-table__th.hds-advanced-table__th--is-sticky-column',
          )
          .doesNotExist();
      }
    });

    test('it should show the context menu when the @hasStickyFirstColumn argument is true and the column is sortable', async function (assert) {
      await createSortableTable({
        hasStickyFirstColumn: true,
      });

      const th = find('.hds-advanced-table__th--sort'); // find the first header cell

      if (th) {
        assert.ok(
          th.querySelector('.hds-advanced-table__th-context-menu'),
          'context menu exists',
        );

        const contextMenuToggle = th.querySelector('.hds-dropdown-toggle-icon');

        if (contextMenuToggle) {
          await click(contextMenuToggle);

          assert
            .dom('[data-test-context-option-key="pin-first-column"]')
            .exists();
        }
      }
    });

    test('it should show the context menu when the @hasStickyFirstColumn argument is false and the column is sortable', async function (assert) {
      await createSortableTable({
        hasStickyFirstColumn: false,
      });

      const th = find('.hds-advanced-table__th--sort'); // find the first header cell

      if (th) {
        assert.ok(
          th.querySelector('.hds-advanced-table__th-context-menu'),
          'context menu exists',
        );

        const contextMenuToggle = th.querySelector('.hds-dropdown-toggle-icon');

        if (contextMenuToggle) {
          await click(contextMenuToggle);

          assert
            .dom('[data-test-context-option-key="pin-first-column"]')
            .exists();
        }
      }
    });

    test('it should not show the context menu when the @hasStickyFirstColumn argument is undefined', async function (assert) {
      await createBasicTable({});

      const ths = findAll('.hds-advanced-table__th');
      const firstTh = ths[1]; // find the first header cell after the selectable column

      if (firstTh) {
        assert.notOk(
          firstTh.querySelector('.hds-advanced-table__th-context-menu'),
          'context menu exists',
        );
      }
    });

    test('it should toggle column pinning when the context menu item is clicked and the column is sortable', async function (assert) {
      await createSortableTable({
        hasStickyFirstColumn: false,
      });

      const th = find('.hds-advanced-table__th--sort'); // find the first header cell

      // Pin column
      await performContextMenuAction(th, 'pin-first-column');

      assert
        .dom('.hds-advanced-table__th.hds-advanced-table__th--is-sticky-column')
        .exists({ count: 1 });

      // Unpin column
      await performContextMenuAction(th, 'pin-first-column');

      assert
        .dom('.hds-advanced-table__th.hds-advanced-table__th--is-sticky-column')
        .doesNotExist();
    });
  });
});

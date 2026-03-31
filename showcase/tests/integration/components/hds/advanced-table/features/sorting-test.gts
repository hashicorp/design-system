/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { array, hash, get } from '@ember/helper';
import { click, focus, render } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';
import sinon from 'sinon';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type {
  HdsAdvancedTableColumn,
  HdsAdvancedTableDensities,
  HdsAdvancedTableOnSelectionChangeSignature,
  HdsAdvancedTableThSortOrder,
  HdsAdvancedTableVerticalAlignment,
} from '@hashicorp/design-system-components/components/hds/advanced-table/types';

import { setupRenderingTest } from 'showcase/tests/helpers';
import type { FolkMusic } from 'showcase/mocks/folk-music-data';

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
        id="data-test-advanced-table"
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

module('Integration | Component | hds/advanced-table/index', function (hooks) {
  setupRenderingTest(hooks);

  module('sorting', function () {
    test('it should render a sortable table when appropriate', async function (assert) {
      await createSortableTable({
        sortBy: 'artist',
        sortOrder: 'asc',
      });

      assert
        .dom('#data-test-advanced-table .hds-advanced-table__th:first-of-type')
        .hasClass('hds-advanced-table__th--sort');
      assert
        .dom(
          '#data-test-advanced-table .hds-advanced-table__th:first-of-type .hds-advanced-table__th-content > span',
        )
        .hasText('Artist');
    });

    test('it should render a sortable table with a tooltip', async function (assert) {
      await createSortableTable({
        sortBy: 'artist',
        sortOrder: 'asc',
        hasTooltip: true,
      });

      assert
        .dom(
          '#data-test-advanced-table .hds-advanced-table__thead .hds-advanced-table__th:first-of-type .hds-advanced-table__th-button--tooltip',
        )
        .exists();
      // activate the tooltip:
      await focus(
        '#data-test-advanced-table .hds-advanced-table__thead .hds-advanced-table__th:first-of-type .hds-advanced-table__th-button--tooltip',
      );
      // test that the tooltip exists and has the passed in content:
      assert.dom('.tippy-content').hasText('More info.');
    });

    test('it should render a sortable table and table is unsorted', async function (assert) {
      await createSortableTable({});

      assert
        .dom('#data-test-advanced-table .hds-advanced-table__th:first-of-type')
        .hasClass('hds-advanced-table__th--sort');
      assert
        .dom('#data-test-advanced-table .hds-advanced-table__caption')
        .hasText('');
    });

    test('it updates the caption correctly after a sort has been performed', async function (assert) {
      await createSortableTable({});

      assert
        .dom('#data-test-advanced-table .hds-advanced-table__td:nth-of-type(1)')
        .hasText('Nick Drake');

      await click(
        '#data-test-advanced-table .hds-advanced-table__th--sort:nth-of-type(1) button',
      );
      assert
        .dom('#data-test-advanced-table .hds-advanced-table__td:nth-of-type(1)')
        .hasText('Melanie');

      assert
        .dom('#data-test-advanced-table .hds-advanced-table__caption')
        .hasText('Sorted by artist ascending');

      await click(
        '#data-test-advanced-table .hds-advanced-table__th--sort:nth-of-type(1) button',
      );
      assert
        .dom('#data-test-advanced-table .hds-advanced-table__td:nth-of-type(1)')
        .hasText('The Beatles');
      assert
        .dom('#data-test-advanced-table .hds-advanced-table__caption')
        .hasText('Sorted by artist descending');
    });

    test('it sorts the rows asc by default when the sort button is clicked on an unsorted column', async function (assert) {
      await createSortableTable({
        sortBy: 'artist',
        sortOrder: 'asc',
      });

      assert
        .dom('#data-test-advanced-table .hds-advanced-table__td:nth-of-type(1)')
        .hasText('Melanie');

      await click(
        '#data-test-advanced-table .hds-advanced-table__th--sort:nth-of-type(1) button',
      );
      assert
        .dom('#data-test-advanced-table .hds-advanced-table__td:nth-of-type(1)')
        .hasText('The Beatles');
    });

    test('it renders a custom sortedMessageText if supplied', async function (assert) {
      await createSortableTable({
        sortedMessageText: 'Melanie will sort it',
        sortBy: 'artist',
        sortOrder: 'asc',
      });

      assert
        .dom('#data-test-advanced-table .hds-advanced-table__caption')
        .hasText('Melanie will sort it');
    });

    test('it renders both a custom caption and a custom sortedMessageText if supplied', async function (assert) {
      await createSortableTable({
        caption: 'A custom caption.',
        sortedMessageText: 'Melanie will sort it!',
        sortBy: 'artist',
        sortOrder: 'asc',
      });

      assert
        .dom('#data-test-advanced-table .hds-advanced-table__caption')
        .hasText('A custom caption. Melanie will sort it!');
    });

    test('it uses a custom sort function if one is supplied', async function (assert) {
      // contrived example; we don’t care _what_ the custom sorting function does, just that it’s used instead of the default.
      // sort based on the second letter of the album name
      const mySortingFunction = (a: unknown, b: unknown) => {
        const typedA = a as FolkMusic;
        const typedB = b as FolkMusic;

        if (typedA.album.charAt(1) < typedB.album.charAt(1)) {
          return -1;
        } else if (typedA.album.charAt(1) > typedB.album.charAt(1)) {
          return 1;
        } else {
          return 0;
        }
      };

      const columns = [
        { key: 'artist', label: 'Artist', isSortable: true },
        {
          key: 'album',
          label: 'Album',
          isSortable: true,
          sortingFunction: mySortingFunction,
        },
        { key: 'year', label: 'Year' },
      ];

      await createSortableTable({
        columns,
        sortBy: 'album',
        sortOrder: 'asc',
      });
      // let’s just check that the table is pre-sorted the way we expect (artist, ascending)
      assert
        .dom('#data-test-advanced-table .hds-advanced-table__td:nth-of-type(1)')
        .hasText('Melanie');

      await click(
        '#data-test-advanced-table .hds-advanced-table__th--sort:nth-of-type(2) button',
      );
      assert
        .dom(
          '#data-test-advanced-table .hds-advanced-table__tbody .hds-advanced-table__td:nth-of-type(2)',
        )
        .hasText('Candles in the Rain');
    });

    test('it updates the `aria-sort` attribute value when a sort is performed', async function (assert) {
      await createSortableTable({
        sortBy: 'artist',
        sortOrder: 'asc',
      });

      await click(
        '#data-test-advanced-table .hds-advanced-table__th--sort:nth-of-type(1) button',
      );
      assert
        .dom(
          '#data-test-advanced-table .hds-advanced-table__th--sort:nth-of-type(1)',
        )
        .hasAria('sort', 'descending');
      await click(
        '#data-test-advanced-table .hds-advanced-table__th--sort:nth-of-type(1) button',
      );
      assert
        .dom(
          '#data-test-advanced-table .hds-advanced-table__th--sort:nth-of-type(1)',
        )
        .hasAria('sort', 'ascending');
    });

    test('it invokes the `onSort` callback when a sort is performed', async function (assert) {
      const context = new TrackedObject<{
        sortBy?: string;
        sortOrder?: HdsAdvancedTableThSortOrder;
      }>({
        sortBy: 'artist',
        sortOrder: 'asc',
      });

      const onSort = (
        sortBy: string,
        sortOrder: HdsAdvancedTableThSortOrder,
      ) => {
        context.sortBy = sortBy;
        context.sortOrder = sortOrder;
      };

      await createSortableTable({
        sortBy: context.sortBy,
        sortOrder: context.sortOrder,
        onSort,
      });

      await click(
        '#data-test-advanced-table .hds-advanced-table__th--sort:nth-of-type(1) button',
      );
      assert.strictEqual(context.sortBy, 'artist');
      assert.strictEqual(context.sortOrder, 'desc');
      await click(
        '#data-test-advanced-table .hds-advanced-table__th--sort:nth-of-type(1) button',
      );
      assert.strictEqual(context.sortBy, 'artist');
      assert.strictEqual(context.sortOrder, 'asc');
    });

    test('it sorts by selected row when `@selectableColumnKey` is provided', async function (assert) {
      const sortSpy = sinon.spy();

      const sortBySelectedSelector =
        '#data-test-advanced-table .hds-advanced-table__thead .hds-advanced-table__th[role="columnheader"] .hds-advanced-table__th-button--sort';

      const model = [
        { id: '1', name: 'Bob', age: 1, isSelected: false },
        { id: '2', name: 'Sally', age: 50, isSelected: true },
        { id: '3', name: 'Jim', age: 30, isSelected: false },
      ];

      const onSelectionChange = ({
        selectionKey,
      }: HdsAdvancedTableOnSelectionChangeSignature) => {
        const recordToUpdate = model.find(
          (modelRow) => modelRow.id === selectionKey,
        );
        if (recordToUpdate) {
          recordToUpdate.isSelected = !recordToUpdate.isSelected;
        }
      };

      await render(
        <template>
          <HdsAdvancedTable
            id="data-test-advanced-table"
            @isSelectable={{true}}
            @selectableColumnKey="isSelected"
            @onSelectionChange={{onSelectionChange}}
            @onSort={{sortSpy}}
            @model={{model}}
            @columns={{array
              (hash key="name" label="Name")
              (hash key="age" label="Age")
            }}
          >
            <:body as |B|>
              <B.Tr
                {{! @glint-expect-error }}
                @selectionKey={{get B.data "id"}}
                {{! @glint-expect-error }}
                @isSelected={{get B.data "isSelected"}}
              >
                {{! @glint-expect-error }}
                <B.Td>{{get B.data "name"}}</B.Td>
                {{! @glint-expect-error }}
                <B.Td>{{get B.data "age"}}</B.Td>
              </B.Tr>
            </:body>
          </HdsAdvancedTable>
        </template>,
      );

      assert.dom(sortBySelectedSelector).exists();

      assert
        .dom(
          '#data-test-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr:nth-of-type(3) .hds-advanced-table__td',
        )
        .hasText('Jim');

      await click(sortBySelectedSelector);
      assert
        .dom(
          '#data-test-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr:nth-of-type(3) .hds-advanced-table__td',
        )
        .hasText('Sally');

      assert.ok(
        sortSpy.calledWith('isSelected', 'asc'),
        'it invokes the `onSort` callback with the `selectableColumnKey` when a sort is performed on the selectable column',
      );
    });
  });
});

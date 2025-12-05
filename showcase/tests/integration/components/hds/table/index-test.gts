/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { array, hash } from '@ember/helper';
import { render, click, focus, findAll } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';
import { TrackedArray, TrackedObject } from 'tracked-built-ins';
import sinon from 'sinon';

import { HdsTable } from '@hashicorp/design-system-components/components';
import type { HdsTableSignature } from '@hashicorp/design-system-components/components/hds/table/index';
import type {
  HdsTableOnSelectionChangeSignature,
  HdsTableThSortOrder,
} from '@hashicorp/design-system-components/components/hds/table/types';

import { setupRenderingTest } from 'showcase/tests/helpers';
import type { FolkMusic } from 'showcase/mocks/folk-music-data';

const DEFAULT_SORTABLE_MODEL = [
  {
    id: '1',
    artist: 'Nick Drake',
    album: 'Pink Moon',
    year: 1972,
  },
  {
    id: '2',
    artist: 'The Beatles',
    album: 'Abbey Road',
    year: 1969,
  },
  {
    id: '3',
    artist: 'Melanie',
    album: 'Candles in the Rain',
    year: 1971,
  },
];

const DEFAULT_SORTABLE_COLUMNS = [
  { key: 'artist', label: 'Artist', isSortable: true },
  { key: 'album', label: 'Album', isSortable: true },
  { key: 'year', label: 'Year' },
];

const createSortableTable = async (options: {
  onSort?: (by: string, order: HdsTableThSortOrder) => void;
  sortedMessageText?: string;
  caption?: string;
  hasTooltip?: boolean;
  sortBy?: string;
  sortOrder?: HdsTableThSortOrder;
  columns?: HdsTableSignature['Args']['columns'];
}) => {
  const columns = DEFAULT_SORTABLE_COLUMNS.map((col, index) => {
    if (options.hasTooltip && index === 0) {
      return { ...col, tooltip: 'More info.' };
    }
    return col;
  });

  return await render(
    <template>
      <HdsTable
        @model={{DEFAULT_SORTABLE_MODEL}}
        @sortBy={{options.sortBy}}
        @sortOrder={{options.sortOrder}}
        @onSort={{options.onSort}}
        @columns={{if options.columns options.columns columns}}
        @sortedMessageText={{options.sortedMessageText}}
        @caption={{options.caption}}
        id="data-test-table"
      >
        <:body as |B|>
          <B.Tr>
            <B.Td>{{B.data.artist}}</B.Td>
            <B.Td>{{B.data.album}}</B.Td>
            <B.Td>{{B.data.year}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>
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

const createSelectableTable = async () => {
  await render(
    <template>
      <HdsTable
        @isSelectable={{true}}
        @model={{DEFAULT_SELECTABLE_MODEL}}
        @columns={{DEFAULT_SELECTABLE_COLUMNS}}
        id="data-test-selectable-table"
      >
        <:body as |B|>
          <B.Tr @selectionKey={{B.data.id}}>
            <B.Td>{{B.data.artist}}</B.Td>
            <B.Td>{{B.data.album}}</B.Td>
            <B.Td>{{B.data.year}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>
    </template>,
  );
};

// Basic tests

module('Integration | Component | hds/table/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><HdsTable id="data-test-table" /></template>);
    assert.dom('#data-test-table').hasClass('hds-table');
  });

  test('it should render with a CSS class appropriate for the @density value', async function (assert) {
    await render(
      <template><HdsTable @density="short" id="data-test-table" /></template>,
    );
    assert.dom('#data-test-table').hasClass('hds-table--density-short');
  });

  test('it should render with a CSS class appropriate if no @density value is set', async function (assert) {
    await render(<template><HdsTable id="data-test-table" /></template>);
    assert.dom('#data-test-table').hasClass('hds-table--density-medium');
  });

  test('it should render with a CSS class appropriate for the @valign value', async function (assert) {
    await render(
      <template><HdsTable @valign="middle" id="data-test-table" /></template>,
    );
    assert.dom('#data-test-table').hasClass('hds-table--valign-middle');
  });

  test('it should render with a CSS class appropriate if no @valign value is set', async function (assert) {
    await render(<template><HdsTable id="data-test-table" /></template>);
    assert.dom('#data-test-table').hasClass('hds-table--valign-top');
  });

  test('it should support splattributes', async function (assert) {
    await render(
      <template>
        <HdsTable id="data-test-table" aria-label="data test table" />
      </template>,
    );
    assert
      .dom('#data-test-table')
      .hasAttribute('aria-label', 'data test table');
  });

  test('it should render the table with manual data passed and no model defined', async function (assert) {
    await render(
      <template>
        <HdsTable id="data-test-table">
          <:head as |H|>
            <H.Tr>
              <H.Th>Cell Header 1</H.Th>
              <H.Th>Cell Header 2</H.Th>
              <H.Th>Cell Header 3</H.Th>
            </H.Tr>
          </:head>
          <:body as |B|>
            <B.Tr>
              <B.Td>Cell Content 1 1</B.Td>
              <B.Td>Cell Content 1 2</B.Td>
              <B.Td>Cell Content 1 3</B.Td>
            </B.Tr>
            <B.Tr>
              <B.Td>Cell Content 2 1</B.Td>
              <B.Td>Cell Content 2 2</B.Td>
              <B.Td>Cell Content 2 3</B.Td>
            </B.Tr>
            <B.Tr>
              <B.Td>Cell Content 3 1</B.Td>
              <B.Td>Cell Content 3 2</B.Td>
              <B.Td>Cell Content 3 3</B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </template>,
    );

    assert.dom('#data-test-table tr th:first-of-type').hasText('Cell Header 1');
    assert
      .dom('#data-test-table tr td:first-of-type')
      .hasText('Cell Content 1 1');
  });

  test('it should render a table based on the data model passed', async function (assert) {
    const model = [
      { key: 'artist', name: 'Test 1', description: 'Test 1 description' },
      { key: 'album', name: 'Test 2', description: 'Test 2 description' },
      { key: 'year', name: 'Test 3', description: 'Test 3 description' },
    ];

    const columns = [
      { key: 'artist', label: 'components.table.headers.artist' },
      { key: 'album', label: 'components.table.headers.album' },
      { key: 'year', label: 'components.table.headers.year' },
    ];

    await render(
      <template>
        <HdsTable id="data-test-table" @model={{model}} @columns={{columns}}>
          <:body as |B|>
            <B.Tr id={{B.rowIndex}}>
              <B.Td>{{B.data.key}}</B.Td>
              <B.Td>{{B.data.name}}</B.Td>
              <B.Td>{{B.data.description}}</B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </template>,
    );

    assert.dom('#data-test-table tr:nth-child(3)').hasProperty('id', '2');

    assert
      .dom('#data-test-table tr:first-of-type td:nth-of-type(2n)')
      .hasText('Test 1');
    assert
      .dom('#data-test-table tr:last-of-type td:last-of-type')
      .hasText('Test 3 description');
  });

  test('it should render caption if @caption is defined', async function (assert) {
    const model = [
      { key: 'artist', name: 'Test 1', description: 'Test 1 description' },
      { key: 'album', name: 'Test 2', description: 'Test 2 description' },
      { key: 'year', name: 'Test 3', description: 'Test 3 description' },
    ];

    await render(
      <template>
        <HdsTable
          id="data-test-table"
          @model={{model}}
          @caption="a test caption"
        >
          <:head as |H|>
            <H.Tr>
              <H.Th>Id</H.Th>
              <H.Th>Name</H.Th>
              <H.Th>Description</H.Th>
            </H.Tr>
          </:head>
          <:body as |B|>
            <B.Tr>
              <B.Td>{{B.data.key}}</B.Td>
              <B.Td>{{B.data.name}}</B.Td>
              <B.Td>{{B.data.description}}</B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </template>,
    );

    assert.dom('#data-test-table caption').hasText('a test caption');
  });

  // OPTIONS

  // Sortable

  test('it should render a sortable table when appropriate', async function (assert) {
    await createSortableTable({});

    assert
      .dom('#data-test-table th:first-of-type')
      .hasClass('hds-table__th--sort');
    assert
      .dom('#data-test-table th:first-of-type .hds-table__th-content > span')
      .hasText('Artist');
  });

  test('it should render a sortable table with a tooltip', async function (assert) {
    await createSortableTable({ hasTooltip: true });

    assert
      .dom(
        '#data-test-table thead th:first-of-type .hds-table__th-button--tooltip',
      )
      .exists();
    // activate the tooltip:
    await focus(
      '#data-test-table thead th:first-of-type .hds-table__th-button--tooltip',
    );
    // test that the tooltip exists and has the passed in content:
    assert.dom('.tippy-content').hasText('More info.');
  });

  test('it should render a sortable table with an empty caption if no caption is provided and table is unsorted', async function (assert) {
    await createSortableTable({});

    assert
      .dom('#data-test-table th:first-of-type')
      .hasClass('hds-table__th--sort');
    assert.dom('#data-test-table caption').hasText('');
  });

  test('it sorts the rows asc by default when the sort button is clicked on an unsorted column', async function (assert) {
    await createSortableTable({
      sortBy: 'artist',
      sortOrder: 'asc',
    });

    assert.dom('#data-test-table td:nth-of-type(1)').hasText('Melanie');

    await click('#data-test-table .hds-table__th--sort:nth-of-type(1) button');
    assert.dom('#data-test-table td:nth-of-type(1)').hasText('The Beatles');
  });

  test('it updates the caption correctly after a sort has been performed', async function (assert) {
    await createSortableTable({});

    assert.dom('#data-test-table td:nth-of-type(1)').hasText('Nick Drake');

    await click('#data-test-table .hds-table__th--sort:nth-of-type(1) button');
    assert.dom('#data-test-table td:nth-of-type(1)').hasText('Melanie');
    assert
      .dom('#data-test-table caption')
      .hasText('Sorted by artist ascending');

    await click('#data-test-table .hds-table__th--sort:nth-of-type(1) button');
    assert.dom('#data-test-table td:nth-of-type(1)').hasText('The Beatles');
    assert
      .dom('#data-test-table caption')
      .hasText('Sorted by artist descending');
  });

  test('it renders a custom sortedMessageText if supplied', async function (assert) {
    await createSortableTable({
      sortedMessageText: 'Melanie will sort it',
    });

    assert.dom('#data-test-table caption').hasText('Melanie will sort it');
  });

  test('it renders both a custom caption and a custom sortedMessageText if supplied', async function (assert) {
    await createSortableTable({
      caption: 'A custom caption.',
      sortedMessageText: 'Melanie will sort it!',
    });

    assert
      .dom('#data-test-table caption')
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

    await createSortableTable({
      sortBy: 'album',
      sortOrder: 'asc',
      columns: [
        { key: 'artist', label: 'Artist', isSortable: true },
        {
          key: 'album',
          label: 'Album',
          isSortable: true,
          sortingFunction: mySortingFunction,
        },
        { key: 'year', label: 'Year' },
      ],
    });

    // let’s just check that the table is pre-sorted the way we expect (artist, ascending)
    assert.dom('#data-test-table td:nth-of-type(1)').hasText('Melanie');

    await click('#data-test-table .hds-table__th--sort:nth-of-type(2) button');
    assert
      .dom('#data-test-table tbody td:nth-of-type(2)')
      .hasText('Candles in the Rain');
  });

  test('it updates the `aria-sort` attribute value when a sort is performed', async function (assert) {
    await createSortableTable({
      sortBy: 'artist',
      sortOrder: 'asc',
    });

    await click('#data-test-table .hds-table__th--sort:nth-of-type(1) button');
    assert
      .dom('#data-test-table .hds-table__th--sort:nth-of-type(1)')
      .hasAria('sort', 'descending');
    await click('#data-test-table .hds-table__th--sort:nth-of-type(1) button');
    assert
      .dom('#data-test-table .hds-table__th--sort:nth-of-type(1)')
      .hasAria('sort', 'ascending');
  });

  test('it invokes the `onSort` callback when a sort is performed', async function (assert) {
    const context = tracked<{
      sortBy: string;
      sortOrder: HdsTableThSortOrder;
    }>({
      sortBy: 'artist',
      sortOrder: 'asc',
    });

    const onSort = (by: string, ord: HdsTableThSortOrder) => {
      context.sortBy = by;
      context.sortOrder = ord;
    };

    await createSortableTable({
      sortBy: context.sortBy,
      sortOrder: context.sortOrder,
      onSort,
    });

    await click('#data-test-table .hds-table__th--sort:nth-of-type(1) button');
    assert.strictEqual(context.sortBy, 'artist');
    assert.strictEqual(context.sortOrder, 'desc');
    await click('#data-test-table .hds-table__th--sort:nth-of-type(1) button');
    assert.strictEqual(context.sortBy, 'artist');
    assert.strictEqual(context.sortOrder, 'asc');
  });

  test('it sorts by selected row when `@selectableColumnKey` is provided', async function (assert) {
    const sortSpy = sinon.spy();
    const model = new TrackedArray([
      new TrackedObject({ id: '1', name: 'Bob', age: 1, isSelected: false }),
      new TrackedObject({ id: '2', name: 'Sally', age: 50, isSelected: true }),
      new TrackedObject({ id: '3', name: 'Jim', age: 30, isSelected: false }),
    ]);
    const selectableColumnKey = 'isSelected';
    const onSelectionChange = ({
      selectionKey,
    }: HdsTableOnSelectionChangeSignature) => {
      const recordToUpdate = model.find(
        (modelRow) => modelRow.id === selectionKey,
      );
      if (recordToUpdate) {
        recordToUpdate.isSelected = !recordToUpdate.isSelected;
      }
    };

    const sortBySelectedSelector =
      '#data-test-table thead th[scope="col"] .hds-table__th-button--sort';

    await render(
      <template>
        <HdsTable
          id="data-test-table"
          @isSelectable={{true}}
          @selectableColumnKey={{selectableColumnKey}}
          @onSelectionChange={{onSelectionChange}}
          @onSort={{sortSpy}}
          @model={{model}}
          @columns={{array
            (hash key="name" label="Name")
            (hash key="age" label="Age")
          }}
        >
          <:body as |B|>
            <B.Tr @selectionKey={{B.data.id}} @isSelected={{B.data.isSelected}}>
              <B.Td>{{B.data.name}}</B.Td>
              <B.Td>{{B.data.age}}</B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </template>,
    );

    assert.dom(sortBySelectedSelector).exists();
    assert
      .dom('#data-test-table tbody tr:nth-of-type(3) td:nth-of-type(1)')
      .hasText('Jim');

    await click(sortBySelectedSelector);
    assert
      .dom('#data-test-table tbody tr:nth-of-type(3) td:nth-of-type(1)')
      .hasText('Sally');

    assert.ok(
      sortSpy.calledWith(selectableColumnKey, 'asc'),
      'it invokes the `onSort` callback with the `selectableColumnKey` when a sort is performed on the selectable column',
    );
  });

  // Multi-select

  const selectAllCheckboxSelector =
    '#data-test-selectable-table thead th[scope="col"] .hds-table__checkbox';
  const rowCheckboxesSelector =
    '#data-test-selectable-table tbody th[scope="row"] .hds-table__checkbox';

  // basic multi-select

  test('it renders a multi-select table when isSelectable is set to true for a table with a model', async function (assert) {
    await createSelectableTable();

    assert.dom(selectAllCheckboxSelector).exists({ count: 1 });
    assert
      .dom(rowCheckboxesSelector)
      .exists({ count: DEFAULT_SELECTABLE_MODEL.length });
  });

  test('it renders a multi-select table when isSelectable is set to true for a table without a model', async function (assert) {
    await render(
      <template>
        <HdsTable @isSelectable={{true}} id="data-test-selectable-table">
          <:head as |H|>
            <H.Tr>
              <H.Th>Cell Header 1</H.Th>
              <H.Th>Cell Header 2</H.Th>
              <H.Th>Cell Header 3</H.Th>
            </H.Tr>
          </:head>
          <:body as |B|>
            <B.Tr @selectionKey="row1">
              <B.Td>Cell Content 1 1</B.Td>
              <B.Td>Cell Content 1 2</B.Td>
              <B.Td>Cell Content 1 3</B.Td>
            </B.Tr>
            <B.Tr @selectionKey="row2">
              <B.Td>Cell Content 2 1</B.Td>
              <B.Td>Cell Content 2 2</B.Td>
              <B.Td>Cell Content 2 3</B.Td>
            </B.Tr>
            <B.Tr @selectionKey="row3">
              <B.Td>Cell Content 3 1</B.Td>
              <B.Td>Cell Content 3 2</B.Td>
              <B.Td>Cell Content 3 3</B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </template>,
    );
    assert.dom(selectAllCheckboxSelector).exists({ count: 1 });
    assert.dom(rowCheckboxesSelector).exists({ count: 3 });
  });

  // multi-select functionality

  test('it selects all rows when the "select all" checkbox checked state is triggered', async function (assert) {
    await createSelectableTable();

    // Default should be unchecked:
    assert.dom(selectAllCheckboxSelector).isNotChecked();
    assert.dom(rowCheckboxesSelector).isNotChecked().exists({ count: 3 });
    // Should change to checked after it is triggered:
    await click(selectAllCheckboxSelector);
    assert.dom(selectAllCheckboxSelector).isChecked();
    assert.dom(rowCheckboxesSelector).isChecked().exists({ count: 3 });
  });

  test('it deselects all rows when the "select all" checkbox unchecked state is triggered', async function (assert) {
    await createSelectableTable();
    // Trigger checked status:
    await click(selectAllCheckboxSelector);
    // Trigger unchecked state:
    await click(selectAllCheckboxSelector);
    assert.dom(selectAllCheckboxSelector).isNotChecked();
    assert.dom(rowCheckboxesSelector).isNotChecked().exists({ count: 3 });
  });

  test('if some rows are selected but not all, the "select all" checkbox should be in an indeterminate state', async function (assert) {
    await createSelectableTable();

    const rowCheckboxes = findAll(rowCheckboxesSelector);
    const firstRowCheckbox = rowCheckboxes[0];

    if (firstRowCheckbox) {
      // Check checkbox in just the first row:
      await click(firstRowCheckbox);
      assert.dom(selectAllCheckboxSelector).hasProperty('indeterminate', true);
    }
  });

  test('it should invoke the `onSelectionChange` callback when a checkbox is selected', async function (assert) {
    const context = tracked<{ keys: string[] }>({
      keys: [],
    });

    const onSelectionChange = ({
      selectedRowsKeys,
    }: HdsTableOnSelectionChangeSignature) => {
      context.keys = selectedRowsKeys;
    };

    await render(
      <template>
        <HdsTable
          @isSelectable={{true}}
          @onSelectionChange={{onSelectionChange}}
          id="data-test-selectable-table"
        >
          <:head as |H|>
            <H.Tr>
              <H.Th>Cell Header 1</H.Th>
              <H.Th>Cell Header 2</H.Th>
              <H.Th>Cell Header 3</H.Th>
            </H.Tr>
          </:head>
          <:body as |B|>
            <B.Tr @selectionKey="row1">
              <B.Td>Cell Content 1 1</B.Td>
              <B.Td>Cell Content 1 2</B.Td>
              <B.Td>Cell Content 1 3</B.Td>
            </B.Tr>
            <B.Tr @selectionKey="row2">
              <B.Td>Cell Content 2 1</B.Td>
              <B.Td>Cell Content 2 2</B.Td>
              <B.Td>Cell Content 2 3</B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </template>,
    );
    const rowCheckboxes = findAll(rowCheckboxesSelector);
    const firstRowCheckbox = rowCheckboxes[0];

    if (firstRowCheckbox) {
      await click(firstRowCheckbox);
      assert.deepEqual(context.keys, ['row1']);
      await click(selectAllCheckboxSelector);
      assert.deepEqual(context.keys, ['row1', 'row2']);
      await click(selectAllCheckboxSelector);
      assert.deepEqual(context.keys, []);
    }
  });

  // multi-select options

  // aria-labels

  test('it renders the expected `aria-label` values for "select all" and rows by default', async function (assert) {
    await render(
      <template>
        <HdsTable
          @isSelectable={{true}}
          @model={{DEFAULT_SELECTABLE_MODEL}}
          @columns={{DEFAULT_SELECTABLE_COLUMNS}}
          id="data-test-selectable-table"
        >
          <:body as |B|>
            <B.Tr @selectionKey={{B.data.id}}>
              <B.Td>{{B.data.artist}}</B.Td>
              <B.Td>{{B.data.album}}</B.Td>
              <B.Td>{{B.data.year}}</B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </template>,
    );

    assert.dom(selectAllCheckboxSelector).hasAria('label', 'Select all rows');
    assert.dom(rowCheckboxesSelector).hasAria('label', 'Select row');

    await click(selectAllCheckboxSelector);
    await click(rowCheckboxesSelector);

    assert.dom(selectAllCheckboxSelector).hasAria('label', 'Select all rows');
    assert.dom(rowCheckboxesSelector).hasAria('label', 'Select row');
  });

  test('it renders the expected `aria-label` for rows with `@selectionAriaLabelSuffix`', async function (assert) {
    await render(
      <template>
        <HdsTable
          @isSelectable={{true}}
          @model={{DEFAULT_SELECTABLE_MODEL}}
          @columns={{DEFAULT_SELECTABLE_COLUMNS}}
          id="data-test-selectable-table"
        >
          <:body as |B|>
            <B.Tr
              @selectionKey={{B.data.id}}
              @selectionAriaLabelSuffix="custom suffix"
            >
              <B.Td>{{B.data.artist}}</B.Td>
              <B.Td>{{B.data.album}}</B.Td>
              <B.Td>{{B.data.year}}</B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </template>,
    );

    assert.dom(rowCheckboxesSelector).hasAria('label', 'Select custom suffix');

    await click(rowCheckboxesSelector);

    assert.dom(rowCheckboxesSelector).hasAria('label', 'Select custom suffix');
  });
});

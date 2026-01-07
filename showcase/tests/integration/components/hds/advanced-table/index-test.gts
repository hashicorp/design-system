/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { array, hash, get } from '@ember/helper';
import { findAll, render, settled, resetOnerror } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type {
  HdsAdvancedTableDensities,
  HdsAdvancedTableVerticalAlignment,
} from '@hashicorp/design-system-components/components/hds/advanced-table/types';

import { setupRenderingTest } from 'showcase/tests/helpers';

const getBodyContent = () => {
  return Array.from(
    document.querySelectorAll(
      '.hds-advanced-table__tbody .hds-advanced-table__tr',
    ),
  ).map((row) => {
    const cells = row.querySelectorAll('.hds-advanced-table__td');
    return Array.from(cells).map((cell) => cell.textContent.trim());
  });
};

const getColumnByLabel = (
  columns: typeof DEFAULT_BASIC_COLUMNS,
  label: string,
) => {
  return columns.find((col) => col.label === label);
};

const getColumnOrder = (columns: typeof DEFAULT_BASIC_COLUMNS) => {
  const thElements = findAll('.hds-advanced-table__th');

  return thElements.map((th) => {
    const column = getColumnByLabel(columns, th.textContent.trim());

    return column ? column.key : null;
  });
};

const DEFAULT_BASIC_MODEL = [
  { id: '1', name: 'Bob', age: 20, country: 'USA' },
  { id: '2', name: 'Alice', age: 25, country: 'UK' },
  { id: '3', name: 'Charlie', age: 30, country: 'Canada' },
];

const DEFAULT_EMPTY_MODEL: Array<never> = [];

const DEFAULT_BASIC_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'country', label: 'Country' },
];

const createBasicTable = async (options: {
  hasStickyFirstColumn?: boolean;
  density?: HdsAdvancedTableDensities;
  valign?: HdsAdvancedTableVerticalAlignment;
}) => {
  return await render(
    <template>
      <HdsAdvancedTable
        @isSelectable={{true}}
        @model={{DEFAULT_BASIC_MODEL}}
        @columns={{DEFAULT_BASIC_COLUMNS}}
        @hasStickyFirstColumn={{options.hasStickyFirstColumn}}
        @density={{options.density}}
        @valign={{options.valign}}
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

module('Integration | Component | hds/advanced-table/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(function () {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await createBasicTable({});

    assert
      .dom('#data-test-advanced-table [role="grid"]')
      .hasClass('hds-advanced-table');
  });

  test('it should render with a CSS class appropriate for the @density value', async function (assert) {
    await createBasicTable({
      density: 'short',
    });

    assert
      .dom('#data-test-advanced-table [role="grid"]')
      .hasClass('hds-advanced-table--density-short');
  });

  test('it should render with a CSS class appropriate if no @density value is set', async function (assert) {
    await createBasicTable({});

    assert
      .dom('#data-test-advanced-table [role="grid"]')
      .hasClass('hds-advanced-table--density-medium');
  });

  test('it should render with a CSS class appropriate for middle @valign value', async function (assert) {
    await createBasicTable({
      valign: 'middle',
    });

    assert
      .dom('#data-test-advanced-table [role="grid"]')
      .hasClass('hds-advanced-table--valign-middle');
  });

  test('it should render with a CSS class appropriate baseline @valign value', async function (assert) {
    await createBasicTable({
      valign: 'baseline',
    });

    assert
      .dom('#data-test-advanced-table [role="grid"]')
      .hasClass('hds-advanced-table--valign-baseline');
  });

  test('it should render with a CSS class appropriate if no @valign value is set', async function (assert) {
    await createBasicTable({});

    assert
      .dom('#data-test-advanced-table [role="grid"]')
      .hasClass('hds-advanced-table--valign-top');
  });

  test('it should support splattributes', async function (assert) {
    await render(
      <template>
        <HdsAdvancedTable
          id="data-test-advanced-table"
          @model={{DEFAULT_BASIC_MODEL}}
          @columns={{DEFAULT_BASIC_COLUMNS}}
          aria-label="data test table"
        />
      </template>,
    );

    assert
      .dom('#data-test-advanced-table')
      .hasAttribute('aria-label', 'data test table');
  });

  test('it should render a table based on the data model passed', async function (assert) {
    await render(
      <template>
        <HdsAdvancedTable
          id="data-advanced-test-table"
          @model={{array
            (hash key="artist" name="Test 1" description="Test 1 description")
            (hash key="album" name="Test 2" description="Test 2 description")
            (hash key="year" name="Test 3" description="Test 3 description")
          }}
          @columns={{array
            (hash key="artist" label="components.table.headers.artist")
            (hash key="album" label="components.table.headers.album")
            (hash key="year" label="components.table.headers.year")
          }}
        >
          <:body as |B|>
            <B.Tr id={{B.rowIndex}}>
              {{! @glint-expect-error }}
              <B.Td>{{get B.data "key"}}</B.Td>
              {{! @glint-expect-error }}
              <B.Td>{{get B.data "name"}}</B.Td>
              {{! @glint-expect-error }}
              <B.Td>{{get B.data "description"}}</B.Td>
            </B.Tr>
          </:body>
        </HdsAdvancedTable>
      </template>,
    );

    assert
      .dom('#data-advanced-test-table .hds-advanced-table__tr:nth-child(3)')
      .hasProperty('id', '2');

    assert
      .dom(
        '#data-advanced-test-table .hds-advanced-table__tr:first-of-type .hds-advanced-table__td:nth-of-type(2n)',
      )
      .hasText('Test 1');
    assert
      .dom(
        '#data-advanced-test-table .hds-advanced-table__tr:last-of-type .hds-advanced-table__td:last-of-type',
      )
      .hasText('Test 3 description');
  });

  test('it should update the table when the model changes', async function (assert) {
    const context = new TrackedObject({
      model: DEFAULT_BASIC_MODEL,
    });

    await render(
      <template>
        <HdsAdvancedTable
          @model={{context.model}}
          @columns={{DEFAULT_BASIC_COLUMNS}}
          id="data-test-advanced-table"
        >
          <:body as |B|>
            <B.Tr>
              {{! @glint-expect-error }}
              <B.Td>{{get B.data "name"}}</B.Td>
              {{! @glint-expect-error }}
              <B.Td>{{get B.data "age"}}</B.Td>
              {{! @glint-expect-error }}
              <B.Td>{{get B.data "country"}}</B.Td>
            </B.Tr>
          </:body>
        </HdsAdvancedTable>
      </template>,
    );

    assert
      .dom(`.hds-advanced-table__tbody .hds-advanced-table__tr`)
      .exists({ count: 3 });
    assert.deepEqual(getBodyContent(), [
      ['Bob', '20', 'USA'],
      ['Alice', '25', 'UK'],
      ['Charlie', '30', 'Canada'],
    ]);

    context.model = [{ id: '4', name: 'Jane', age: 35, country: 'Mexico' }];
    await settled();

    assert
      .dom(`.hds-advanced-table__tbody .hds-advanced-table__tr`)
      .exists({ count: 1 });
    assert.deepEqual(getBodyContent(), [['Jane', '35', 'Mexico']]);
  });

  test('it should update the table when the columns change', async function (assert) {
    const context = new TrackedObject({
      columns: DEFAULT_BASIC_COLUMNS,
    });

    const getColumnLabels = () => {
      return Array.from(
        document.querySelectorAll(
          '.hds-advanced-table__thead .hds-advanced-table__th',
        ),
      ).map((th) => th.textContent.trim());
    };

    await render(
      <template>
        <HdsAdvancedTable
          id="data-advanced-test-table"
          @model={{DEFAULT_BASIC_MODEL}}
          @columns={{context.columns}}
        >
          <:body as |B|>
            <B.Tr id={{B.rowIndex}}>
              {{! @glint-expect-error }}
              <B.Td>{{get B.data "name"}}</B.Td>
              {{! @glint-expect-error }}
              <B.Td>{{get B.data "age"}}</B.Td>
              {{! @glint-expect-error }}
              <B.Td>{{get B.data "country"}}</B.Td>
            </B.Tr>
          </:body>
        </HdsAdvancedTable>
      </template>,
    );

    assert.deepEqual(getColumnLabels(), ['Name', 'Age', 'Country']);

    context.columns = context.columns.map((column) => ({
      ...column,
      label: `Updated ${column.label}`,
    }));
    await settled();

    assert.deepEqual(getColumnLabels(), [
      'Updated Name',
      'Updated Age',
      'Updated Country',
    ]);
  });

  test('it should render correct columns when columns are added or removed dynamically', async function (assert) {
    const context = new TrackedObject({
      columns: DEFAULT_BASIC_COLUMNS,
    });

    await render(
      <template>
        <HdsAdvancedTable
          id="data-advanced-test-table"
          @model={{DEFAULT_BASIC_MODEL}}
          @columns={{context.columns}}
        >
          <:body as |B|>
            <B.Tr id={{B.rowIndex}}>
              {{#each context.columns as |column|}}
                <B.Td>
                  {{! @glint-expect-error }}
                  {{get B.data column.key}}
                </B.Td>
              {{/each}}
            </B.Tr>
          </:body>
        </HdsAdvancedTable>
      </template>,
    );

    let columnOrder = getColumnOrder(context.columns);
    assert.deepEqual(
      columnOrder,
      ['name', 'age', 'country'],
      'Initial columns are correct',
    );

    assert.deepEqual(getBodyContent(), [
      ['Bob', '20', 'USA'],
      ['Alice', '25', 'UK'],
      ['Charlie', '30', 'Canada'],
    ]);

    context.columns = context.columns.filter((col) => col.key !== 'age');

    await settled();

    columnOrder = getColumnOrder(context.columns);
    assert.deepEqual(
      columnOrder,
      ['name', 'country'],
      'Columns are correct after removing age',
    );
    assert.deepEqual(getBodyContent(), [
      ['Bob', 'USA'],
      ['Alice', 'UK'],
      ['Charlie', 'Canada'],
    ]);

    context.columns = DEFAULT_BASIC_COLUMNS;
    await settled();

    columnOrder = getColumnOrder(context.columns);
    assert.deepEqual(
      columnOrder,
      ['name', 'age', 'country'],
      'Columns are correct after adding age back',
    );
    assert.deepEqual(getBodyContent(), [
      ['Bob', '20', 'USA'],
      ['Alice', '25', 'UK'],
      ['Charlie', '30', 'Canada'],
    ]);
  });

  test('it should show the empty state with the default content if no data is present in the model', async function (assert) {
    await render(
      <template>
        <HdsAdvancedTable
          id="data-test-advanced-table"
          @model={{DEFAULT_EMPTY_MODEL}}
          @columns={{DEFAULT_BASIC_COLUMNS}}
          aria-label="data test table"
        />
      </template>,
    );

    assert
      .dom('#data-test-advanced-table .hds-advanced-table__empty-state')
      .exists();
    assert
      .dom(
        '#data-test-advanced-table .hds-advanced-table__empty-state .hds-application-state',
      )
      .exists();
    assert
      .dom(
        '#data-test-advanced-table .hds-advanced-table__empty-state .hds-application-state .hds-application-state__title',
      )
      .hasText('No data available');
    assert
      .dom(
        '#data-test-advanced-table .hds-advanced-table__empty-state .hds-application-state .hds-application-state__body-text',
      )
      .hasText('There is no data to display in the table at this time.');
  });

  test('it should show empty state with the emptyState named block content if no data is present in the model', async function (assert) {
    await render(
      <template>
        <HdsAdvancedTable
          id="data-test-advanced-table"
          @model={{DEFAULT_EMPTY_MODEL}}
          @columns={{DEFAULT_BASIC_COLUMNS}}
          aria-label="data test table"
        >
          <:emptyState>
            <div id="data-test-empty-state">
              <span>Custom empty state content</span>
            </div>
          </:emptyState>
        </HdsAdvancedTable>
      </template>,
    );

    assert
      .dom('#data-test-advanced-table .hds-advanced-table__empty-state')
      .exists();
    assert
      .dom(
        '#data-test-advanced-table .hds-advanced-table__empty-state .hds-application-state',
      )
      .doesNotExist();
    assert
      .dom(
        '#data-test-advanced-table .hds-advanced-table__empty-state #data-test-empty-state',
      )
      .exists()
      .hasText('Custom empty state content');
  });

  test('it should show empty state with the emptyState ApplicationState contextual component if no data is present in the model', async function (assert) {
    await render(
      <template>
        <HdsAdvancedTable
          id="data-test-advanced-table"
          @model={{DEFAULT_EMPTY_MODEL}}
          @columns={{DEFAULT_BASIC_COLUMNS}}
          aria-label="data test table"
        >
          <:emptyState as |E|>
            <E.ApplicationState as |A|>
              <A.Body>
                <span id="data-test-empty-state">Custom empty state content</span>
              </A.Body>
            </E.ApplicationState>
          </:emptyState>
        </HdsAdvancedTable>
      </template>,
    );

    assert
      .dom('#data-test-advanced-table .hds-advanced-table__empty-state')
      .exists();
    assert
      .dom(
        '#data-test-advanced-table .hds-advanced-table__empty-state #data-test-empty-state',
      )
      .exists()
      .hasText('Custom empty state content');
  });
});

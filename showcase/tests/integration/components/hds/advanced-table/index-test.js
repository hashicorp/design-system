/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import {
  render,
  click,
  focus,
  setupOnerror,
  find,
  triggerEvent,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

function getTableGridValues(tableElement) {
  const computedStyle = window.getComputedStyle(tableElement);
  const gridTemplateColumns = computedStyle.getPropertyValue(
    'grid-template-columns',
  );
  const gridValues = gridTemplateColumns
    .split(' ')
    .map((value) => value.trim());

  return gridValues;
}

async function performContextMenuAction(th, key) {
  const contextMenuToggle = th.querySelector('.hds-dropdown-toggle-icon');

  await click(contextMenuToggle);

  return click(`[data-test-context-option-key="${key}"]`);
}

async function simulateRightPointerDrag(handle) {
  await triggerEvent(handle, 'pointerdown', { clientX: 100 });
  await triggerEvent(handle, 'pointermove', { clientX: 130 });
  await triggerEvent(window, 'pointerup');
}

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
    { key: 'artist', label: 'Artist', isSortable: true },
    { key: 'album', label: 'Album', isSortable: true },
    { key: 'year', label: 'Year' },
  ]);
  context.set('sortBy', 'artist');
  context.set('sortOrder', 'asc');
};

const setSelectableTableData = (context) => {
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
    { key: 'artist', label: 'Artist' },
    { key: 'album', label: 'Album' },
    { key: 'year', label: 'Year' },
  ]);
};

const setNestedTableData = (context) => {
  context.set('model', [
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
  ]);
  context.set('columns', [
    { key: 'name', label: 'Name', isExpandable: true },
    { key: 'status', label: 'Status' },
    { key: 'description', label: 'Description' },
  ]);
};

const setResizableColumnsTableData = (context) => {
  context.set('model', [
    { id: '1', col1: 'A', col2: 'B' },
    { id: '2', col1: 'C', col2: 'D' },
  ]);
  context.set('columns', [
    {
      key: 'col1',
      label: 'Col 1',
      width: '120px',
      minWidth: '60px',
      maxWidth: '300px',
    },
    {
      key: 'col2',
      label: 'Col 2',
    },
  ]);
};

const hbsSortableAdvancedTable = hbs`<Hds::AdvancedTable
  @model={{this.model}}
  @sortBy={{this.sortBy}}
  @sortOrder={{this.sortOrder}}
  @onSort={{this.onSort}}
  @columns={{this.columns}}
  @sortedMessageText={{this.sortedMessageText}}
  @caption={{this.caption}}
  id='data-test-advanced-table'
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>`;

const hbsSelectableAdvancedTable = hbs`<Hds::AdvancedTable
  @isSelectable={{true}}
  @model={{this.model}}
  @columns={{this.columns}}
  @hasStickyFirstColumn={{this.hasStickyFirstColumn}}
  id='data-test-selectable-advanced-table'
>
  <:body as |B|>
    <B.Tr @selectionKey={{B.data.id}}>
      <B.Th>{{B.data.artist}}</B.Th>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>`;

const hbsNestedAdvancedTable = hbs`<Hds::AdvancedTable
  @model={{this.model}}
  @columns={{this.columns}}
  id='data-test-nested-advanced-table'
>
  <:body as |B|>
    <B.Tr @selectionKey={{B.data.id}}>
      <B.Th>{{B.data.name}}</B.Th>
      <B.Td>{{B.data.status}}</B.Td>
      <B.Td>{{B.data.description}}</B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>`;

const hbsResizableColumnsAdvancedTable = hbs`<Hds::AdvancedTable
  @model={{this.model}} @columns={{this.columns}} @hasResizableColumns={{true}} id="resize-test-table"
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.col1}}</B.Td>
      <B.Td>{{B.data.col2}}</B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>`;

module('Integration | Component | hds/advanced-table/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    setSortableTableData(this);

    await render(
      hbs`<Hds::AdvancedTable
  id='data-test-advanced-table'
  @model={{this.model}}
  @columns={{this.columns}}
/>`,
    );
    assert
      .dom('#data-test-advanced-table [role="grid"]')
      .hasClass('hds-advanced-table');
  });

  test('it should render with a CSS class appropriate for the @density value', async function (assert) {
    setSortableTableData(this);

    await render(
      hbs`<Hds::AdvancedTable
  id='data-test-advanced-table'
  @model={{this.model}}
  @columns={{this.columns}}
  @density='short'
/>`,
    );

    assert
      .dom('#data-test-advanced-table [role="grid"]')
      .hasClass('hds-advanced-table--density-short');
  });

  test('it should render with a CSS class appropriate if no @density value is set', async function (assert) {
    setSortableTableData(this);

    await render(
      hbs`<Hds::AdvancedTable
  id='data-test-advanced-table'
  @model={{this.model}}
  @columns={{this.columns}}
/>`,
    );
    assert
      .dom('#data-test-advanced-table [role="grid"]')
      .hasClass('hds-advanced-table--density-medium');
  });

  test('it should render with a CSS class appropriate for middle @valign value', async function (assert) {
    setSortableTableData(this);
    this.set('valign', 'middle');

    await render(
      hbs`<Hds::AdvancedTable
  id='data-test-advanced-table'
  @model={{this.model}}
  @columns={{this.columns}}
  @valign={{this.valign}}
/>`,
    );

    assert
      .dom('#data-test-advanced-table [role="grid"]')
      .hasClass('hds-advanced-table--valign-middle');
  });

  test('it should render with a CSS class appropriate baseline @valign value', async function (assert) {
    setSortableTableData(this);
    this.set('valign', 'baseline');

    await render(
      hbs`<Hds::AdvancedTable
  id='data-test-advanced-table'
  @model={{this.model}}
  @columns={{this.columns}}
  @valign={{this.valign}}
/>`,
    );

    assert
      .dom('#data-test-advanced-table [role="grid"]')
      .hasClass('hds-advanced-table--valign-baseline');
  });

  test('it should render with a CSS class appropriate if no @valign value is set', async function (assert) {
    setSortableTableData(this);
    await render(
      hbs`<Hds::AdvancedTable
  id='data-test-advanced-table'
  @model={{this.model}}
  @columns={{this.columns}}
/>`,
    );
    assert
      .dom('#data-test-advanced-table [role="grid"]')
      .hasClass('hds-advanced-table--valign-top');
  });

  test('it throws an assertion if @isStriped and has nested rows', async function (assert) {
    const errorMessage =
      '@isStriped must not be true if there are nested rows.';

    setNestedTableData(this);
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::AdvancedTable
      id='data-test-advanced-table'
      @isStriped={{true}}
      @selectableColumnKey={{this.selectableColumnKey}}
      @onSelectionChange={{this.onSelectionChange}}
      @onSort={{this.onSort}}
      @model={{this.model}}
      @columns={{array (hash key='name' label='Name') (hash key='age' label='Age')}}
    >
      <:body as |B|>
        <B.Tr @selectionKey={{B.data.id}} @isSelected={{B.data.isSelected}}>
          <B.Td>{{B.data.name}}</B.Td>
          <B.Td>{{B.data.age}}</B.Td>
        </B.Tr>
      </:body>
    </Hds::AdvancedTable>`);

    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  test('it throws an assertion if @hasResizableColumns and has nested rows', async function (assert) {
    const errorMessage =
      'Cannot have resizable columns if there are nested rows.';

    setNestedTableData(this);
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::AdvancedTable
      id='data-test-advanced-table'
      @hasResizableColumns={{true}}
      @model={{this.model}}
      @columns={{array (hash key='name' label='Name') (hash key='age' label='Age')}}
    >
      <:body as |B|>
        <B.Tr @selectionKey={{B.data.id}} @isSelected={{B.data.isSelected}}>
          <B.Td>{{B.data.name}}</B.Td>
          <B.Td>{{B.data.age}}</B.Td>
        </B.Tr>
      </:body>
    </Hds::AdvancedTable>`);

    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  test('it should support splattributes', async function (assert) {
    setSortableTableData(this);
    await render(
      hbs`<Hds::AdvancedTable
  id='data-test-advanced-table'
  @model={{this.model}}
  @columns={{this.columns}}
  aria-label='data test table'
/>`,
    );
    assert
      .dom('#data-test-advanced-table')
      .hasAttribute('aria-label', 'data test table');
  });

  test('it should render with a CSS class appropriate for the @hasStickyHeader argument', async function (assert) {
    setSortableTableData(this);

    await render(
      hbs`<Hds::AdvancedTable
  id='data-test-advanced-table'
  @model={{this.model}}
  @columns={{this.columns}}
  @hasStickyHeader={{true}}
  @maxHeight='75px'
>
<:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>`,
    );

    assert
      .dom('#data-test-advanced-table .hds-advanced-table__thead')
      .hasClass('hds-advanced-table__thead--sticky');
  });

  test('it should render the appropriate CSS and add a sticky header when set @maxHeight', async function (assert) {
    setSortableTableData(this);

    await render(
      hbs`<Hds::AdvancedTable
  id='data-test-advanced-table'
  @model={{this.model}}
  @columns={{this.columns}}
  @maxHeight='75px'
>
<:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>`,
    );

    assert
      .dom('#data-test-advanced-table .hds-advanced-table__thead')
      .hasClass('hds-advanced-table__thead--sticky');

    assert
      .dom('#data-test-advanced-table .hds-advanced-table')
      .hasStyle({ maxHeight: '75px' });
  });

  test('it should render the appropriate CSS when set @maxHeight and @hasStickyHeader is set to false', async function (assert) {
    setSortableTableData(this);

    await render(
      hbs`<Hds::AdvancedTable
  id='data-test-advanced-table'
  @model={{this.model}}
  @columns={{this.columns}}
  @hasStickyHeader={{false}}
  @maxHeight='75px'
>
<:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>`,
    );

    assert
      .dom('#data-test-advanced-table .hds-advanced-table__thead')
      .doesNotHaveClass('hds-advanced-table__thead--sticky');

    assert
      .dom('#data-test-advanced-table .hds-advanced-table')
      .hasStyle({ maxHeight: '75px' });
  });

  test('it should render with a CSS class appropriate for the @hasStickyFirstColumn argument', async function (assert) {
    setSortableTableData(this);

    await render(
      hbs`<Hds::AdvancedTable
  id='data-test-advanced-table'
  @model={{this.model}}
  @columns={{this.columns}}
  @hasStickyFirstColumn={{true}}
>
<:body as |B|>
    <B.Tr>
      <B.Th>{{B.data.artist}}</B.Th>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>`,
    );

    assert
      .dom(
        '.hds-advanced-table__th--sort.hds-advanced-table__th--is-sticky-column',
      )
      .exists({ count: 1 });

    assert
      .dom(
        '.hds-advanced-table__th.hds-advanced-table__th--is-sticky-column:not(.hds-advanced-table__th--sort)',
      )
      .exists({ count: 3 });
  });

  test('it should render with a CSS class appropriate for the @hasStickyFirstColumn argument when also selectable', async function (assert) {
    setSelectableTableData(this);
    this.set('hasStickyFirstColumn', true);
    await render(hbsSelectableAdvancedTable);

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

  test('it should render a table based on the data model passed', async function (assert) {
    this.set('model', [
      { key: 'artist', name: 'Test 1', description: 'Test 1 description' },
      { key: 'album', name: 'Test 2', description: 'Test 2 description' },
      { key: 'year', name: 'Test 3', description: 'Test 3 description' },
    ]);

    await render(hbs`<Hds::AdvancedTable
  id='data-advanced-test-table'
  @model={{this.model}}
  @columns={{array
    (hash key='artist' label='components.table.headers.artist')
    (hash key='album' label='components.table.headers.album')
    (hash key='year' label='components.table.headers.year')
  }}
>
  <:body as |B|>
    <B.Tr id={{B.rowIndex}}>
      <B.Td>{{B.data.key}}</B.Td>
      <B.Td>{{B.data.name}}</B.Td>
      <B.Td>{{B.data.description}}</B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>`);

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
    const bodySelector = '.hds-advanced-table__tbody';
    const rowSelector = '.hds-advanced-table__tr';
    const cellSelector = '.hds-advanced-table__td';

    const getBodyContent = () => {
      return Array.from(
        document.querySelectorAll(`${bodySelector} ${rowSelector}`),
      ).map((row) => {
        const cells = row.querySelectorAll(cellSelector);
        return Array.from(cells).map((cell) => cell.textContent.trim());
      });
    };

    this.set('model', [
      { name: 'Bob', age: 20, country: 'USA' },
      { name: 'Alice', age: 25, country: 'UK' },
      { name: 'Charlie', age: 30, country: 'Canada' },
    ]);

    await render(hbs`<Hds::AdvancedTable
  id='data-advanced-test-table'
  @model={{this.model}}
  @columns={{array
    (hash key='name' label='Name')
    (hash key='age' label='Age')
    (hash key='country' label='Country')
  }}
>
  <:body as |B|>
    <B.Tr id={{B.rowIndex}}>
      <B.Td>{{B.data.name}}</B.Td>
      <B.Td>{{B.data.age}}</B.Td>
      <B.Td>{{B.data.country}}</B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>`);

    assert.dom(`${bodySelector} ${rowSelector}`).exists({ count: 3 });
    assert.deepEqual(getBodyContent(), [
      ['Bob', '20', 'USA'],
      ['Alice', '25', 'UK'],
      ['Charlie', '30', 'Canada'],
    ]);

    this.set('model', [{ name: 'Jane', age: 35, country: 'Mexico' }]);
    assert.dom(`${bodySelector} ${rowSelector}`).exists({ count: 1 });
    assert.deepEqual(getBodyContent(), [['Jane', '35', 'Mexico']]);
  });

  test('it should update the table when the columns change', async function (assert) {
    function getColumnLabels() {
      return Array.from(
        document.querySelectorAll(
          '.hds-advanced-table__thead .hds-advanced-table__th',
        ),
      ).map((th) => th.textContent.trim());
    }

    const columns = [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
      { key: 'country', label: 'Country' },
    ];

    this.setProperties({
      columns,
      model: [
        { name: 'Bob', age: 20, country: 'USA' },
        { name: 'Alice', age: 25, country: 'UK' },
        { name: 'Charlie', age: 30, country: 'Canada' },
      ],
    });

    await render(hbs`<Hds::AdvancedTable
  id='data-advanced-test-table'
  @model={{this.model}}
  @columns={{this.columns}}
>
  <:body as |B|>
    <B.Tr id={{B.rowIndex}}>
      <B.Td>{{B.data.name}}</B.Td>
      <B.Td>{{B.data.age}}</B.Td>
      <B.Td>{{B.data.country}}</B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>`);

    assert.deepEqual(getColumnLabels(), ['Name', 'Age', 'Country']);

    this.set(
      'columns',
      columns.map((column) => ({
        ...column,
        label: `Updated ${column.label}`,
      })),
    );

    assert.deepEqual(getColumnLabels(), [
      'Updated Name',
      'Updated Age',
      'Updated Country',
    ]);
  });

  // OPTIONS

  // Sortable

  test('it should render a sortable table when appropriate', async function (assert) {
    setSortableTableData(this);
    await render(hbsSortableAdvancedTable);
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
    setSortableTableData(this);
    // add the tooltip key/value to the first column
    this.columns[0].tooltip = 'More info.';

    await render(hbsSortableAdvancedTable);

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

  test('it throws an assertion if there are selectable columns and has nested rows', async function (assert) {
    const errorMessage =
      'Cannot have sortable columns if there are nested rows. Sortable columns are Name,Age';

    setNestedTableData(this);
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::AdvancedTable
      id='data-test-advanced-table'
      @isSelectable={{true}}
      @selectableColumnKey={{this.selectableColumnKey}}
      @onSelectionChange={{this.onSelectionChange}}
      @onSort={{this.onSort}}
      @model={{this.model}}
      @columns={{array (hash key='name' label='Name' isSortable=true) (hash key='age' label='Age' isSortable=true)}}
    >
      <:body as |B|>
        <B.Tr @selectionKey={{B.data.id}} @isSelected={{B.data.isSelected}}>
          <B.Td>{{B.data.name}}</B.Td>
          <B.Td>{{B.data.age}}</B.Td>
        </B.Tr>
      </:body>
    </Hds::AdvancedTable>`);

    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  test('it throws an assertion if it has `@hasStickyFirstColumn` and has nested rows', async function (assert) {
    const errorMessage =
      'Cannot have a sticky first column if there are nested rows.';

    setNestedTableData(this);
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::AdvancedTable
      id='data-test-advanced-table'
      @hasStickyFirstColumn={{true}}
      @model={{this.model}}
      @columns={{array (hash key='name' label='Name') (hash key='age' label='Age')}}
    >
      <:body as |B|>
        <B.Tr>
          <B.Th>{{B.data.name}}</B.Th>
          <B.Td>{{B.data.age}}</B.Td>
        </B.Tr>
      </:body>
    </Hds::AdvancedTable>`);

    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  test('it throws an assertion if it has `@hasStickyHeader` and does not have @maxHeight', async function (assert) {
    const errorMessage = 'Must set @maxHeight to use @hasStickyHeader.';

    setSortableTableData(this);

    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });

    await render(
      hbs`<Hds::AdvancedTable
  id='data-test-advanced-table'
  @model={{this.model}}
  @columns={{this.columns}}
  @hasStickyHeader={{true}}
>
<:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>`,
    );

    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  // with an empty caption if no caption is provided

  test('it should render a sortable table  and table is unsorted', async function (assert) {
    setSortableTableData(this);
    // unset the sorting applied in the `setSortableTableData`
    this.set('sortBy', undefined);
    this.set('sortOrder', undefined);

    await render(hbsSortableAdvancedTable);

    assert
      .dom('#data-test-advanced-table .hds-advanced-table__th:first-of-type')
      .hasClass('hds-advanced-table__th--sort');
    assert
      .dom('#data-test-advanced-table .hds-advanced-table__caption')
      .hasText('');
  });

  test('it updates the caption correctly after a sort has been performed', async function (assert) {
    setSortableTableData(this);
    // unset the sorting applied in the `setSortableTableData`
    this.set('sortBy', undefined);
    this.set('sortOrder', undefined);
    await render(hbsSortableAdvancedTable);

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
    setSortableTableData(this);
    await render(hbsSortableAdvancedTable);

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
    setSortableTableData(this);
    this.set('sortedMessageText', 'Melanie will sort it');

    await render(hbsSortableAdvancedTable);
    assert
      .dom('#data-test-advanced-table .hds-advanced-table__caption')
      .hasText('Melanie will sort it');
  });

  test('it renders both a custom caption and a custom sortedMessageText if supplied', async function (assert) {
    setSortableTableData(this);
    this.set('caption', 'A custom caption.');
    this.set('sortedMessageText', 'Melanie will sort it!');

    await render(hbsSortableAdvancedTable);
    assert
      .dom('#data-test-advanced-table .hds-advanced-table__caption')
      .hasText('A custom caption. Melanie will sort it!');
  });

  test('it uses a custom sort function if one is supplied', async function (assert) {
    // contrived example; we don’t care _what_ the custom sorting function does, just that it’s used instead of the default.
    // sort based on the second letter of the album name
    const mySortingFunction = (a, b) => {
      if (a.album.charAt(1) < b.album.charAt(1)) {
        return -1;
      } else if (a.album.charAt(1) > b.album.charAt(1)) {
        return 1;
      } else {
        return 0;
      }
    };
    setSortableTableData(this);
    this.set('columns', [
      { key: 'artist', label: 'Artist', isSortable: true },
      {
        key: 'album',
        label: 'Album',
        isSortable: true,
        sortingFunction: mySortingFunction,
      },
      { key: 'year', label: 'Year' },
    ]);

    await render(hbsSortableAdvancedTable);
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
    setSortableTableData(this);
    await render(hbsSortableAdvancedTable);

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
    let sortBy, sortOrder;
    this.set('onSort', (by, ord) => {
      sortBy = by;
      sortOrder = ord;
    });
    setSortableTableData(this);
    await render(hbsSortableAdvancedTable);

    await click(
      '#data-test-advanced-table .hds-advanced-table__th--sort:nth-of-type(1) button',
    );
    assert.strictEqual(sortBy, 'artist');
    assert.strictEqual(sortOrder, 'desc');
    await click(
      '#data-test-advanced-table .hds-advanced-table__th--sort:nth-of-type(1) button',
    );
    assert.strictEqual(sortBy, 'artist');
    assert.strictEqual(sortOrder, 'asc');
  });

  test('it sorts by selected row when `@selectableColumnKey` is provided', async function (assert) {
    const sortSpy = sinon.spy();

    const sortBySelectedSelector =
      '#data-test-advanced-table .hds-advanced-table__thead .hds-advanced-table__th[role="columnheader"] .hds-advanced-table__th-button--sort';

    this.setProperties({
      model: [
        { id: 1, name: 'Bob', age: 1, isSelected: false },
        { id: 2, name: 'Sally', age: 50, isSelected: true },
        { id: 3, name: 'Jim', age: 30, isSelected: false },
      ],
      selectableColumnKey: 'isSelected',
      onSort: sortSpy,
    });
    this.set('onSelectionChange', ({ selectionKey }) => {
      const recordToUpdate = this.model.find(
        (modelRow) => modelRow.id === selectionKey,
      );
      if (recordToUpdate) {
        recordToUpdate.isSelected = !recordToUpdate.isSelected;
      }
    });

    await render(hbs`<Hds::AdvancedTable
  id='data-test-advanced-table'
  @isSelectable={{true}}
  @selectableColumnKey={{this.selectableColumnKey}}
  @onSelectionChange={{this.onSelectionChange}}
  @onSort={{this.onSort}}
  @model={{this.model}}
  @columns={{array (hash key='name' label='Name') (hash key='age' label='Age')}}
>
  <:body as |B|>
    <B.Tr @selectionKey={{B.data.id}} @isSelected={{B.data.isSelected}}>
      <B.Td>{{B.data.name}}</B.Td>
      <B.Td>{{B.data.age}}</B.Td>
    </B.Tr>
  </:body>
</Hds::AdvancedTable>`);

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
      sortSpy.calledWith(this.selectableColumnKey, 'asc'),
      'it invokes the `onSort` callback with the `selectableColumnKey` when a sort is performed on the selectable column',
    );
  });

  // Multi-select

  const selectAllCheckboxSelector =
    '#data-test-selectable-advanced-table .hds-advanced-table__thead .hds-advanced-table__th[role="columnheader"] .hds-advanced-table__checkbox';
  const rowCheckboxesSelector =
    '#data-test-selectable-advanced-table .hds-advanced-table__tbody .hds-advanced-table__th .hds-advanced-table__checkbox';

  // basic multi-select

  test('it renders a multi-select table when isSelectable is set to true for a table with a model', async function (assert) {
    setSelectableTableData(this);
    await render(hbsSelectableAdvancedTable);
    assert.dom(selectAllCheckboxSelector).exists({ count: 1 });
    assert.dom(rowCheckboxesSelector).exists({ count: this.model.length });
  });

  test('it throws an assertion if @isSelectable and has nested rows', async function (assert) {
    const errorMessage =
      '@isSelectable must not be true if there are nested rows.';

    setNestedTableData(this);
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::AdvancedTable
      id='data-test-advanced-table'
      @isSelectable={{true}}
      @selectableColumnKey={{this.selectableColumnKey}}
      @onSelectionChange={{this.onSelectionChange}}
      @onSort={{this.onSort}}
      @model={{this.model}}
      @columns={{array (hash key='name' label='Name') (hash key='age' label='Age')}}
    >
      <:body as |B|>
        <B.Tr @selectionKey={{B.data.id}} @isSelected={{B.data.isSelected}}>
          <B.Td>{{B.data.name}}</B.Td>
          <B.Td>{{B.data.age}}</B.Td>
        </B.Tr>
      </:body>
    </Hds::AdvancedTable>`);

    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  // multi-select functionality

  test('it selects all rows when the "select all" checkbox checked state is triggered', async function (assert) {
    setSelectableTableData(this);
    await render(hbsSelectableAdvancedTable);
    // Default should be unchecked:
    assert.dom(selectAllCheckboxSelector).isNotChecked();
    assert.dom(rowCheckboxesSelector).isNotChecked().exists({ count: 3 });
    // Should change to checked after it is triggered:
    await click(selectAllCheckboxSelector);
    assert.dom(selectAllCheckboxSelector).isChecked();
    assert.dom(rowCheckboxesSelector).isChecked().exists({ count: 3 });
  });

  test('it deselects all rows when the "select all" checkbox unchecked state is triggered', async function (assert) {
    setSelectableTableData(this);
    await render(hbsSelectableAdvancedTable);
    // Trigger checked status:
    await click(selectAllCheckboxSelector);
    // Trigger unchecked state:
    await click(selectAllCheckboxSelector);
    assert.dom(selectAllCheckboxSelector).isNotChecked();
    assert.dom(rowCheckboxesSelector).isNotChecked().exists({ count: 3 });
  });

  test('if some rows are selected but not all, the "select all" checkbox should be in an indeterminate state', async function (assert) {
    setSelectableTableData(this);
    await render(hbsSelectableAdvancedTable);
    const rowCheckboxes = this.element.querySelectorAll(rowCheckboxesSelector);
    const firstRowCheckbox = rowCheckboxes[0];
    // Check checkbox in just the first row:
    await click(firstRowCheckbox);
    assert.dom(selectAllCheckboxSelector).hasProperty('indeterminate', true);
  });

  test('it should invoke the `onSelectionChange` callback when a checkbox is selected', async function (assert) {
    let keys;
    this.set(
      'onSelectionChange',
      ({ selectedRowsKeys }) => (keys = selectedRowsKeys),
    );
    setSelectableTableData(this);
    await render(hbs`
      <Hds::AdvancedTable @isSelectable={{true}} @onSelectionChange={{this.onSelectionChange}} @model={{this.model}}
      @columns={{this.columns}} id="data-test-selectable-advanced-table">
      <:body as |B|>
      <B.Tr @selectionKey={{B.data.id}}>
        <B.Td>{{B.data.artist}}</B.Td>
        <B.Td>{{B.data.album}}</B.Td>
        <B.Td>{{B.data.year}}</B.Td>
      </B.Tr>
    </:body>
      </Hds::AdvancedTable>
    `);
    const rowCheckboxes = this.element.querySelectorAll(rowCheckboxesSelector);
    const firstRowCheckbox = rowCheckboxes[0];
    await click(firstRowCheckbox);
    assert.deepEqual(keys, ['1']);
    await click(selectAllCheckboxSelector);
    assert.deepEqual(keys, ['1', '2', '3']);
    await click(selectAllCheckboxSelector);
    assert.deepEqual(keys, []);
  });

  // multi-select options

  // aria-labels

  test('it renders the expected `aria-label` values for "select all" and rows by default', async function (assert) {
    setSelectableTableData(this);
    await render(hbs`
      <Hds::AdvancedTable
        @isSelectable={{true}}
        @model={{this.model}}
        @columns={{this.columns}}
        id="data-test-selectable-advanced-table"
      >
        <:body as |B|>
          <B.Tr @selectionKey={{B.data.id}}>
            <B.Td>{{B.data.artist}}</B.Td>
            <B.Td>{{B.data.album}}</B.Td>
            <B.Td>{{B.data.year}}</B.Td>
          </B.Tr>
        </:body>
      </Hds::AdvancedTable>
    `);

    assert.dom(selectAllCheckboxSelector).hasAria('label', 'Select all rows');
    assert.dom(rowCheckboxesSelector).hasAria('label', 'Select row');

    await click(selectAllCheckboxSelector);
    await click(rowCheckboxesSelector);

    assert.dom(selectAllCheckboxSelector).hasAria('label', 'Select all rows');
    assert.dom(rowCheckboxesSelector).hasAria('label', 'Select row');
  });

  test('it renders the expected `aria-label` for rows with `@selectionAriaLabelSuffix`', async function (assert) {
    setSelectableTableData(this);
    await render(hbs`
      <Hds::AdvancedTable
        @isSelectable={{true}}
        @model={{this.model}}
        @columns={{this.columns}}
        id="data-test-selectable-advanced-table"
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
      </Hds::AdvancedTable>
    `);

    assert.dom(rowCheckboxesSelector).hasAria('label', 'Select custom suffix');

    await click(rowCheckboxesSelector);

    assert.dom(rowCheckboxesSelector).hasAria('label', 'Select custom suffix');
  });

  const expandRowButtonSelector =
    '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__th[role="rowheader"] .hds-advanced-table__th-button--expand';

  // nesting

  test('it renders a nested table when the model has rows with children key', async function (assert) {
    setNestedTableData(this);
    await render(hbsNestedAdvancedTable);
    assert.dom(expandRowButtonSelector).exists({ count: 3 });
    assert
      .dom(
        '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr',
      )
      .exists({ count: 6 });
  });

  test('it renders children rows when click the expand toggle button', async function (assert) {
    setNestedTableData(this);
    await render(hbsNestedAdvancedTable);

    const rowToggles = this.element.querySelectorAll(expandRowButtonSelector);

    assert
      .dom(
        '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr.hds-advanced-table__tr--hidden',
      )
      .exists({ count: 4 });

    await click(rowToggles[0]);

    assert
      .dom(
        '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr.hds-advanced-table__tr--hidden',
      )
      .exists({ count: 2 });

    await click(rowToggles[1]);

    assert
      .dom(
        '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr.hds-advanced-table__tr--hidden',
      )
      .exists({ count: 1 });
  });

  test('it renders expanded children rows when pass isOpen in the model', async function (assert) {
    setNestedTableData(this);
    this.set('model', [
      {
        id: 1,
        name: 'Policy set 1',
        status: 'PASS',
        description: '',
        isOpen: true,
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
        isOpen: true,
        children: [
          {
            id: 21,
            name: 'test-advisory-pass.sentinel',
            status: 'PASS',
            description: 'Sample description for this thing.',
            isOpen: true,
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
    ]);
    await render(hbsNestedAdvancedTable);
    assert.dom(expandRowButtonSelector).exists({ count: 3 });
    assert
      .dom(
        '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr',
      )
      .exists({ count: 6 });
  });

  test('it renders an expand all button when pass isExpandable to the columns', async function (assert) {
    setNestedTableData(this);
    this.set('model', [
      {
        id: 1,
        name: 'Policy set 1',
        status: 'PASS',
        description: '',
        isOpen: true,
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
    ]);
    await render(hbsNestedAdvancedTable);

    const expandAllButton = document.querySelector(
      '#data-test-nested-advanced-table .hds-advanced-table__thead .hds-advanced-table__th .hds-advanced-table__th-button--expand',
    );

    assert
      .dom(
        '#data-test-nested-advanced-table .hds-advanced-table__thead .hds-advanced-table__th .hds-advanced-table__th-button--expand',
      )
      .exists({ count: 1 });

    assert
      .dom(
        '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr.hds-advanced-table__tr--hidden',
      )
      .exists({ count: 2 });
    assert.dom(expandAllButton).hasAria('expanded', 'false');

    await click(expandAllButton);

    assert
      .dom(
        '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr.hds-advanced-table__tr--hidden',
      )
      .doesNotExist();
    assert.dom(expandAllButton).hasAria('expanded', 'true');

    await click(expandAllButton);

    assert
      .dom(
        '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr.hds-advanced-table__tr--hidden',
      )
      .exists({ count: 4 });
    assert.dom(expandAllButton).hasAria('expanded', 'false');
  });

  test('the expand all button state updates when expand buttons are clicked', async function (assert) {
    setNestedTableData(this);
    await render(hbsNestedAdvancedTable);

    const rowToggles = Array.from(
      this.element.querySelectorAll(expandRowButtonSelector),
    );
    const expandAllButton = document.querySelector(
      '#data-test-nested-advanced-table .hds-advanced-table__thead .hds-advanced-table__th .hds-advanced-table__th-button--expand',
    );

    assert.dom(expandAllButton).hasAria('expanded', 'false');

    for (let i = 0; i < rowToggles.length; i++) {
      await click(rowToggles[i]);

      if (i < rowToggles.length - 1) {
        assert.dom(expandAllButton).hasAria('expanded', 'false');
      }
    }

    assert.dom(expandAllButton).hasAria('expanded', 'true');
  });

  test('it should allow resizing columns with the resize handle (pointer events)', async function (assert) {
    setResizableColumnsTableData(this);
    await render(hbsResizableColumnsAdvancedTable);

    const table = find('.hds-advanced-table');
    const originalGridValues = getTableGridValues(table);

    assert
      .dom('.hds-advanced-table__th-resize-handle')
      .exists({ count: 1 }, 'There is one resize handle (not on last column)');

    const handle = find('.hds-advanced-table__th-resize-handle'); // get the first handle

    // Simulate pointer drag to the right (increase width)
    await simulateRightPointerDrag(handle);

    const newGridValues = getTableGridValues(table);
    assert.notEqual(
      newGridValues,
      originalGridValues,
      'Grid values changed after drag',
    );
  });

  test('it should allow resizing columns with the resize handle (keyboard events)', async function (assert) {
    setResizableColumnsTableData(this);
    await render(hbsResizableColumnsAdvancedTable);

    const table = find('.hds-advanced-table');
    const originalGridValues = getTableGridValues(table);

    const handle = find('.hds-advanced-table__th-resize-handle');

    // Focus and send ArrowRight key
    await focus(handle);
    await triggerKeyEvent(handle, 'keydown', 'ArrowRight');

    let newGridValues = getTableGridValues(table);
    assert.notDeepEqual(
      newGridValues,
      originalGridValues,
      'Grid values changed after ArrowRight',
    );

    // Send ArrowLeft key
    await triggerKeyEvent(handle, 'keydown', 'ArrowLeft');
    newGridValues = getTableGridValues(table);
    assert.deepEqual(
      newGridValues,
      originalGridValues,
      'Grid values reverted after ArrowLeft',
    );
  });

  test('it should not allow resizing columns below their minimum width (pointer events)', async function (assert) {
    setResizableColumnsTableData(this);
    await render(hbsResizableColumnsAdvancedTable);

    const table = find('.hds-advanced-table');
    const originalGridValues = getTableGridValues(table);

    const handle = find('.hds-advanced-table__th-resize-handle');

    // Try to resize column to a very small width (well below minWidth of 60px)
    await triggerEvent(handle, 'pointerdown', { clientX: 100 });
    await triggerEvent(window, 'pointermove', { clientX: 1 });
    await triggerEvent(window, 'pointerup');

    const newGridValues = getTableGridValues(table);
    assert.notEqual(
      newGridValues,
      originalGridValues,
      'Grid values changed after pointer drag',
    );

    const firstColumnGridValue = newGridValues[0];

    assert.ok(
      parseInt(firstColumnGridValue, 10) >= 60,
      `Column width respects minimum width constraint (actual: ${firstColumnGridValue}, min: 60px)`,
    );
  });

  test('it should not allow resizing columns above their maximum width (pointer events)', async function (assert) {
    setResizableColumnsTableData(this);
    await render(hbsResizableColumnsAdvancedTable);

    const table = find('.hds-advanced-table');
    const originalGridValues = getTableGridValues(table);

    const handle = find('.hds-advanced-table__th-resize-handle');

    // Try to resize column to a very large width (well below minWidth of 60px)
    await triggerEvent(handle, 'pointerdown', { clientX: 100 });
    await triggerEvent(window, 'pointermove', { clientX: 10000 });
    await triggerEvent(window, 'pointerup');

    // Check the new width
    const newGridValues = getTableGridValues(table);
    assert.notEqual(
      newGridValues,
      originalGridValues,
      'Grid values changed after pointer drag',
    );

    const firstColumnGridValue = newGridValues[0];

    assert.ok(
      parseInt(firstColumnGridValue, 10) <= 300,
      `Column width respects maximum width constraint (actual: ${firstColumnGridValue}px, max: 300px)`,
    );
  });

  test('it should not allow resizing columns below their minimum width (keyboard events)', async function (assert) {
    setResizableColumnsTableData(this);
    await render(hbsResizableColumnsAdvancedTable);

    const table = find('.hds-advanced-table');
    const originalGridValues = getTableGridValues(table);

    const handle = find('.hds-advanced-table__th-resize-handle');

    // Focus handle and press ArrowLeft multiple times to try going below min width
    await focus(handle);

    for (let i = 0; i < 10; i++) {
      // moves left 10px each time
      await triggerKeyEvent(handle, 'keydown', 'ArrowLeft');
    }

    const newGridValues = getTableGridValues(table);
    assert.notEqual(
      newGridValues,
      originalGridValues,
      'Grid values changed after ArrowLeft',
    );

    const firstColumnGridValue = newGridValues[0];

    assert.ok(
      parseInt(firstColumnGridValue, 10) >= 60,
      `Column width respects minimum width constraint with keyboard events (actual: ${firstColumnGridValue}, min: 60px)`,
    );
  });

  test('it should not allow resizing columns above their maximum width (keyboard events)', async function (assert) {
    setResizableColumnsTableData(this);
    await render(hbsResizableColumnsAdvancedTable);

    const table = find('.hds-advanced-table');
    const originalGridValues = getTableGridValues(table);

    const handle = find('.hds-advanced-table__th-resize-handle');

    // Focus handle and press ArrowLeft multiple times to try going below min width
    await focus(handle);

    for (let i = 0; i < 10; i++) {
      // moves right 10px each time
      await triggerKeyEvent(handle, 'keydown', 'ArrowRight');
    }

    const newGridValues = getTableGridValues(table);
    assert.notEqual(
      newGridValues,
      originalGridValues,
      'Grid values changed after ArrowRight',
    );

    const firstColumnGridValue = newGridValues[0];

    assert.ok(
      parseInt(firstColumnGridValue, 10) <= 300,
      `Column width respects maximum width constraint with keyboard events (actual: ${firstColumnGridValue}px, max: 300px)`,
    );
  });

  test('it should show the context menu when resizing is enabled', async function (assert) {
    setResizableColumnsTableData(this);
    await render(hbsResizableColumnsAdvancedTable);

    const th = find('.hds-advanced-table__th'); // find the first header cell

    assert.ok(
      th.querySelector('.hds-advanced-table__th-context-menu'),
      'context menu exists',
    );

    const contextMenuToggle = th.querySelector('.hds-dropdown-toggle-icon');
    await click(contextMenuToggle);

    assert.dom('[data-test-context-option-key="reset-column-width"]').exists();
  });

  test('it should resize the column to the initial width when resetting column width', async function (assert) {
    setResizableColumnsTableData(this);
    await render(hbsResizableColumnsAdvancedTable);

    const table = find('.hds-advanced-table');
    const originalGridValues = getTableGridValues(table);

    const handle = find('.hds-advanced-table__th-resize-handle');
    const th = handle.closest('.hds-advanced-table__th');

    await simulateRightPointerDrag(handle);

    let newGridValues = getTableGridValues(table);

    assert.notEqual(
      newGridValues,
      originalGridValues,
      'Grid values changed after drag',
    );

    await performContextMenuAction(th, 'reset-column-width');

    newGridValues = getTableGridValues(table);
    assert.deepEqual(
      newGridValues,
      originalGridValues,
      'Grid values reset to initial state after resetting column width',
    );
  });

  test('it should focus the resize handle when the "resize column" context menu option is clicked', async function (assert) {
    setResizableColumnsTableData(this);
    await render(hbsResizableColumnsAdvancedTable);

    const handle = find('.hds-advanced-table__th-resize-handle');
    const th = handle.closest('.hds-advanced-table__th');

    await performContextMenuAction(th, 'resize-column');

    assert.ok(handle === document.activeElement, 'Resize handle is focused');
  });

  test('it should call `onColumnResize` when a column is resized by dragging', async function (assert) {
    setResizableColumnsTableData(this);
    const onColumnResizeSpy = sinon.spy();
    this.set('onColumnResize', onColumnResizeSpy);

    await render(hbs`
      <Hds::AdvancedTable
        @model={{this.model}}
        @columns={{this.columns}}
        @hasResizableColumns={{true}}
        @onColumnResize={{this.onColumnResize}}
        id="resize-test-table"
      >
        <:body as |B|>
          <B.Tr>
            <B.Td>{{B.data.col1}}</B.Td>
            <B.Td>{{B.data.col2}}</B.Td>
          </B.Tr>
        </:body>
      </Hds::AdvancedTable>
    `);

    const handle = find('.hds-advanced-table__th-resize-handle');

    await focus(handle);

    await triggerKeyEvent(handle, 'keydown', 'ArrowRight');

    assert.ok(onColumnResizeSpy.calledOnce, 'onColumnResize was called');
  });

  test('it should call `onColumnResize` when a column is resized by keyboard', async function (assert) {
    setResizableColumnsTableData(this);
    const onColumnResizeSpy = sinon.spy();
    this.set('onColumnResize', onColumnResizeSpy);

    await render(hbs`
      <Hds::AdvancedTable
        @model={{this.model}}
        @columns={{this.columns}}
        @hasResizableColumns={{true}}
        @onColumnResize={{this.onColumnResize}}
        id="resize-test-table"
      >
        <:body as |B|>
          <B.Tr>
            <B.Td>{{B.data.col1}}</B.Td>
            <B.Td>{{B.data.col2}}</B.Td>
          </B.Tr>
        </:body>
      </Hds::AdvancedTable>
    `);

    const handle = find('.hds-advanced-table__th-resize-handle');

    // Simulate pointer drag to the right (increase width)
    await simulateRightPointerDrag(handle);

    assert.ok(onColumnResizeSpy.calledOnce, 'onColumnResize was called');
  });

  test('it should call `onColumnResize` when a column width is reset', async function (assert) {
    setResizableColumnsTableData(this);
    const onColumnResizeSpy = sinon.spy((key) => {
      console.log('Column resized', key);
    });
    this.set('onColumnResize', onColumnResizeSpy);

    await render(hbs`
      <Hds::AdvancedTable
        @model={{this.model}}
        @columns={{this.columns}}
        @hasResizableColumns={{true}}
        @onColumnResize={{this.onColumnResize}}
        id="resize-test-table"
      >
        <:body as |B|>
          <B.Tr>
            <B.Td>{{B.data.col1}}</B.Td>
            <B.Td>{{B.data.col2}}</B.Td>
          </B.Tr>
        </:body>
      </Hds::AdvancedTable>
    `);

    const handle = find('.hds-advanced-table__th-resize-handle');

    await simulateRightPointerDrag(handle);

    assert.ok(onColumnResizeSpy.calledOnce, 'onColumnResize was called');

    await performContextMenuAction(
      handle.closest('.hds-advanced-table__th'),
      'reset-column-width',
    );
    assert.ok(
      onColumnResizeSpy.calledTwice,
      'onColumnResize was called again after resetting column width',
    );
  });
});

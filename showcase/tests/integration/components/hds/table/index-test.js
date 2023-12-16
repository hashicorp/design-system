/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
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
    { key: 'artist', label: 'Artist', isSortable: true },
    { key: 'album', label: 'Album', isSortable: true },
    { key: 'year', label: 'Year' },
  ]);
  context.set('sortBy', 'artist');
  context.set('sortOrder', 'asc');
};

const hbsSortableTable = hbs`
<Hds::Table
  @model={{this.model}}
  @sortBy={{this.sortBy}}
  @sortOrder={{this.sortOrder}}
  @onSort={{this.onSort}}
  @columns={{this.columns}}
  @sortedMessageText={{this.sortedMessageText}}
  @caption={{this.caption}}
  id="data-test-table"
>
  <:body as |B|>
    <B.Tr>
      <B.Td>{{B.data.artist}}</B.Td>
      <B.Td>{{B.data.album}}</B.Td>
      <B.Td>{{B.data.year}}</B.Td>
    </B.Tr>
  </:body>
</Hds::Table>
`;

module('Integration | Component | hds/table/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Table id="data-test-table"/>`);
    assert.dom('#data-test-table').hasClass('hds-table');
  });

  test('it should render with a CSS class appropriate for the @density value', async function (assert) {
    await render(hbs`<Hds::Table @density="short" id="data-test-table" />`);
    assert.dom('#data-test-table').hasClass('hds-table--density-short');
  });

  test('it should render with a CSS class appropriate if no @density value is set', async function (assert) {
    await render(hbs`<Hds::Table id="data-test-table"/>`);
    assert.dom('#data-test-table').hasClass('hds-table--density-medium');
  });

  test('it should render with a CSS class appropriate for the @valign value', async function (assert) {
    await render(hbs`<Hds::Table @valign="middle" id="data-test-table" />`);
    assert.dom('#data-test-table').hasClass('hds-table--valign-middle');
  });

  test('it should render with a CSS class appropriate if no @valign value is set', async function (assert) {
    await render(hbs`<Hds::Table id="data-test-table"/>`);
    assert.dom('#data-test-table').hasClass('hds-table--valign-top');
  });

  test('it should support splattributes', async function (assert) {
    await render(
      hbs`<Hds::Table id="data-test-table" aria-label="data test table" />`
    );
    assert
      .dom('#data-test-table')
      .hasAttribute('aria-label', 'data test table');
  });

  test('it should render the table with manual data passed and no model defined', async function (assert) {
    await render(hbs`
      <Hds::Table id="data-test-table">
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
      </Hds::Table>
    `);

    assert.dom('#data-test-table tr th:first-of-type').hasText('Cell Header 1');
    assert
      .dom('#data-test-table tr td:first-of-type')
      .hasText('Cell Content 1 1');
  });

  test('it should render a table based on the data model passed', async function (assert) {
    this.set('model', [
      { key: 'artist', name: 'Test 1', description: 'Test 1 description' },
      { key: 'album', name: 'Test 2', description: 'Test 2 description' },
      { key: 'year', name: 'Test 3', description: 'Test 3 description' },
    ]);

    await render(hbs`
      <Hds::Table id="data-test-table" @model={{this.model}} @columns={{array
        (hash key='artist' label='components.table.headers.artist')
        (hash key='album' label='components.table.headers.album')
        (hash key='year' label='components.table.headers.year')
      }}>
        <:body as |B|>
          <B.Tr>
            <B.Td>{{B.data.key}}</B.Td>
            <B.Td>{{B.data.name}}</B.Td>
            <B.Td>{{B.data.description}}</B.Td>
          </B.Tr>
        </:body>
      </Hds::Table>
    `);

    assert
      .dom('#data-test-table tr:first-of-type td:nth-of-type(2n)')
      .hasText('Test 1');
    assert
      .dom('#data-test-table tr:last-of-type td:last-of-type')
      .hasText('Test 3 description');
  });

  test('it should render caption if @caption is defined', async function (assert) {
    this.set('model', [
      { id: 1, name: 'Test 1', description: 'Test 1 description' },
      { id: 2, name: 'Test 2', description: 'Test 2 description' },
      { id: 3, name: 'Test 3', description: 'Test 3 description' },
    ]);

    await render(hbs`
      <Hds::Table id="data-test-table" @model={{this.model}} @caption="a test caption">
        <:head as |H|>
          <H.Tr>
            <H.Th>Id</H.Th>
            <H.Th>Name</H.Th>
            <H.Th>Description</H.Th>
          </H.Tr>
        </:head>
        <:body as |B|>
          <B.Tr>
            <B.Td>{{B.data.id}}</B.Td>
            <B.Td>{{B.data.name}}</B.Td>
            <B.Td>{{B.data.description}}</B.Td>
          </B.Tr>
        </:body>
      </Hds::Table>
    `);

    assert.dom('#data-test-table caption').hasText('a test caption');
  });

  test('it should render a sortable table when appropriate', async function (assert) {
    setSortableTableData(this);
    await render(hbsSortableTable);
    assert
      .dom('#data-test-table th:first-of-type')
      .hasClass('hds-table__th-sort');
    assert.dom('#data-test-table th:first-of-type').hasText('Artist');
  });

  test('it should render a sortable table with an empty caption if no caption is provided and table is unsorted', async function (assert) {
    setSortableTableData(this);
    // unset the sorting applied in the `setSortableTableData`
    this.set('sortBy', undefined);
    this.set('sortOrder', undefined);

    await render(hbsSortableTable);

    assert
      .dom('#data-test-table th:first-of-type')
      .hasClass('hds-table__th-sort');
    assert.dom('#data-test-table caption').hasText('');
  });

  test('it sorts the rows asc by default when the sort button is clicked on an unsorted column', async function (assert) {
    setSortableTableData(this);
    await render(hbsSortableTable);

    assert.dom('#data-test-table td:nth-of-type(1)').hasText('Melanie');

    await click('#data-test-table .hds-table__th-sort:nth-of-type(1) button');
    assert.dom('#data-test-table td:nth-of-type(1)').hasText('The Beatles');
  });

  test('it updates the caption correctly after a sort has been performed', async function (assert) {
    setSortableTableData(this);
    // unset the sorting applied in the `setSortableTableData`
    this.set('sortBy', undefined);
    this.set('sortOrder', undefined);
    await render(hbsSortableTable);

    assert.dom('#data-test-table td:nth-of-type(1)').hasText('Nick Drake');

    await click('#data-test-table .hds-table__th-sort:nth-of-type(1) button');
    assert.dom('#data-test-table td:nth-of-type(1)').hasText('Melanie');
    assert
      .dom('#data-test-table caption')
      .hasText('Sorted by artist ascending');

    await click('#data-test-table .hds-table__th-sort:nth-of-type(1) button');
    assert.dom('#data-test-table td:nth-of-type(1)').hasText('The Beatles');
    assert
      .dom('#data-test-table caption')
      .hasText('Sorted by artist descending');
  });

  test('it renders a custom sortedMessageText if supplied', async function (assert) {
    setSortableTableData(this);
    this.set('sortedMessageText', 'Melanie will sort it');

    await render(hbsSortableTable);
    assert.dom('#data-test-table caption').hasText('Melanie will sort it');
  });

  test('it renders both a custom caption and a custom sortedMessageText if supplied', async function (assert) {
    setSortableTableData(this);
    this.set('caption', 'A custom caption.');
    this.set('sortedMessageText', 'Melanie will sort it!');

    await render(hbsSortableTable);
    assert
      .dom('#data-test-table caption')
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

    await render(hbsSortableTable);
    // let’s just check that the table is pre-sorted the way we expect (artist, ascending)
    assert.dom('#data-test-table td:nth-of-type(1)').hasText('Melanie');

    await click('#data-test-table .hds-table__th-sort:nth-of-type(2) button');
    assert
      .dom('#data-test-table tbody td:nth-of-type(2)')
      .hasText('Candles in the Rain');
  });

  test('it updates the `aria-sort` attribute value when a sort is performed', async function (assert) {
    setSortableTableData(this);
    await render(hbsSortableTable);

    await click('#data-test-table .hds-table__th-sort:nth-of-type(1) button');
    assert
      .dom('#data-test-table .hds-table__th-sort:nth-of-type(1)')
      .hasAria('sort', 'descending');
    await click('#data-test-table .hds-table__th-sort:nth-of-type(1) button');
    assert
      .dom('#data-test-table .hds-table__th-sort:nth-of-type(1)')
      .hasAria('sort', 'ascending');
  });

  test('it invokes the `onSort` callback when a sort is performed', async function (assert) {
    let sortBy, sortOrder;
    this.set('onSort', (by, ord) => {
      sortBy = by;
      sortOrder = ord;
    });
    setSortableTableData(this);
    await render(hbsSortableTable);

    await click('#data-test-table .hds-table__th-sort:nth-of-type(1) button');
    assert.strictEqual(sortBy, 'artist');
    assert.strictEqual(sortOrder, 'desc');
    await click('#data-test-table .hds-table__th-sort:nth-of-type(1) button');
    assert.strictEqual(sortBy, 'artist');
    assert.strictEqual(sortOrder, 'asc');
  });
});

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import HdsAdvancedTableColumn, {
  DEFAULT_MAX_WIDTH,
  DEFAULT_MIN_WIDTH,
} from '@hashicorp/design-system-components/components/hds/advanced-table/models/column';

module('Unit | Component | hds/advanced-table/models/column', function () {
  test('initializes with default properties when minimal args provided', function (assert) {
    const column = new HdsAdvancedTableColumn({
      column: { label: 'Test Column' },
    });

    assert.strictEqual(column.label, 'Test Column', 'sets the label property');
    assert.strictEqual(column.align, 'left', 'defaults to left alignment');
    assert.false(column.isExpandable, 'defaults isExpandable to false');
    assert.strictEqual(
      column.isSortable,
      false,
      'isSortable is false when not provided',
    );
    assert.strictEqual(
      column.isVisuallyHidden,
      false,
      'isVisuallyHidden is false when not provided',
    );
    assert.strictEqual(
      column.key,
      undefined,
      'key is undefined when not provided',
    );
    assert.strictEqual(
      column.minWidth,
      DEFAULT_MIN_WIDTH,
      'minWidth is set to the default value when width is not provided',
    );
    assert.strictEqual(
      column.maxWidth,
      DEFAULT_MAX_WIDTH,
      'maxWidth is set to the default value when width is not provided',
    );
    assert.strictEqual(
      column.tooltip,
      undefined,
      'tooltip is undefined when not provided',
    );
    assert.strictEqual(
      column.width,
      undefined,
      'width is undefined when not provided',
    );
  });

  test('initializes with all provided properties', function (assert) {
    const sortFn = (a, b) => a - b;
    const column = new HdsAdvancedTableColumn({
      column: {
        label: 'Full Column',
        align: 'center',
        isExpandable: true,
        isSortable: true,
        isVisuallyHidden: true,
        key: 'test-column',
        tooltip: 'Column tooltip',
        sortingFunction: sortFn,
      },
    });

    assert.strictEqual(column.label, 'Full Column', 'sets the label property');
    assert.strictEqual(column.align, 'center', 'sets the alignment');
    assert.true(column.isExpandable, 'sets isExpandable');
    assert.true(column.isSortable, 'sets isSortable');
    assert.true(column.isVisuallyHidden, 'sets isVisuallyHidden');
    assert.strictEqual(column.key, 'test-column', 'sets the key');
    assert.strictEqual(column.tooltip, 'Column tooltip', 'sets the tooltip');
    assert.strictEqual(
      column.sortingFunction,
      sortFn,
      'sets the sorting function',
    );
  });

  test('handles width values properly', function (assert) {
    const column = new HdsAdvancedTableColumn({
      column: {
        label: 'Width Column',
        width: '200px',
        minWidth: '100px',
        maxWidth: '300px',
      },
    });

    assert.strictEqual(column.width, '200px', 'sets the width');
    assert.strictEqual(column.minWidth, '100px', 'sets the minWidth');
    assert.strictEqual(column.maxWidth, '300px', 'sets the maxWidth');
    assert.strictEqual(column.pxWidth, 200, 'converts width to number');
    assert.strictEqual(column.pxMinWidth, 100, 'converts minWidth to number');
    assert.strictEqual(column.pxMaxWidth, 300, 'converts maxWidth to number');
  });

  test('uses default min/max width when only width is provided', function (assert) {
    const column = new HdsAdvancedTableColumn({
      column: {
        label: 'Width Only',
        width: '200px',
      },
    });

    assert.strictEqual(column.width, '200px', 'sets the width');
    assert.strictEqual(column.minWidth, '150px', 'sets default minWidth');
    assert.strictEqual(column.maxWidth, '800px', 'sets default maxWidth');
  });

  test('pxWidth setter updates width property', function (assert) {
    const column = new HdsAdvancedTableColumn({
      column: {
        label: 'Width Column',
        width: '200px',
      },
    });

    column.pxWidth = 250;
    assert.strictEqual(column.width, '250px', 'updates width with px suffix');
    assert.strictEqual(
      column.pxWidth,
      250,
      'pxWidth getter returns updated value',
    );
  });

  test('isPxSize utility function works correctly', function (assert) {
    const column = new HdsAdvancedTableColumn({
      column: { label: 'Test' },
    });

    // Setting valid px values
    column.width = '100px';
    assert.strictEqual(
      column.pxWidth,
      100,
      'returns number for valid px value',
    );

    column.width = '100.5px';
    assert.strictEqual(column.pxWidth, 100.5, 'handles decimal px values');

    column.width = '-50px';
    assert.strictEqual(column.pxWidth, -50, 'handles negative px values');

    // Setting non-px values
    column.width = '100%';
    assert.strictEqual(
      column.pxWidth,
      undefined,
      'returns undefined for percentage values',
    );

    column.width = '10em';
    assert.strictEqual(
      column.pxWidth,
      undefined,
      'returns undefined for em values',
    );

    column.width = 'auto';
    assert.strictEqual(column.pxWidth, undefined, 'returns undefined for auto');

    column.width = undefined;
    assert.strictEqual(
      column.pxWidth,
      undefined,
      'returns undefined when width is undefined',
    );
  });

  test('setPxWidth respects min/max constraints', function (assert) {
    const column = new HdsAdvancedTableColumn({
      column: {
        label: 'Constrained Width',
        width: '200px',
        minWidth: '150px',
        maxWidth: '250px',
      },
    });

    column.setPxWidth(100);
    assert.strictEqual(
      column.width,
      '150px',
      'respects minimum width constraint',
    );

    column.setPxWidth(300);
    assert.strictEqual(
      column.width,
      '250px',
      'respects maximum width constraint',
    );

    column.setPxWidth(200);
    assert.strictEqual(
      column.width,
      '200px',
      'sets exact width when within constraints',
    );
  });

  test('restoreWidth sets width back to original value', function (assert) {
    const column = new HdsAdvancedTableColumn({
      column: {
        label: 'Restore Test',
        width: '200px',
      },
    });

    assert.strictEqual(column.width, '200px', 'initial width is set');

    column.setPxWidth(300);
    assert.strictEqual(column.width, '300px', 'width is updated');

    column.restoreWidth();
    assert.strictEqual(
      column.width,
      '200px',
      'width is restored to original value',
    );
  });

  test('index getter returns correct column position', function (assert) {
    // Create mock table with multiple columns
    const mockTable = {
      columns: [
        new HdsAdvancedTableColumn({
          column: { label: 'First', key: 'first' },
          table: null,
        }),
        new HdsAdvancedTableColumn({
          column: { label: 'Second', key: 'second' },
          table: null,
        }),
        new HdsAdvancedTableColumn({
          column: { label: 'Third', key: 'third' },
          table: null,
        }),
      ],
    };

    // Set table reference for each column
    mockTable.columns.forEach((col) => (col.table = mockTable));

    assert.strictEqual(
      mockTable.columns[0].index,
      0,
      'first column has index 0',
    );
    assert.strictEqual(
      mockTable.columns[1].index,
      1,
      'second column has index 1',
    );
    assert.strictEqual(
      mockTable.columns[2].index,
      2,
      'third column has index 2',
    );
  });

  test('index getter returns -1 when table has no columns', function (assert) {
    const mockTable = { columns: [] };
    const column = new HdsAdvancedTableColumn({
      column: { label: 'Test', key: 'test' },
      table: mockTable,
    });

    assert.strictEqual(column.index, -1, 'returns -1 when no columns exist');
  });

  test('index getter returns -1 when column key does not exist in table', function (assert) {
    const mockTable = {
      columns: [
        new HdsAdvancedTableColumn({
          column: { label: 'Other', key: 'other' },
          table: null,
        }),
      ],
    };
    mockTable.columns[0].table = mockTable;

    const column = new HdsAdvancedTableColumn({
      column: { label: 'Test', key: 'nonexistent' },
      table: mockTable,
    });

    assert.strictEqual(
      column.index,
      -1,
      'returns -1 when column key not found',
    );
  });

  test('isFirst getter identifies first column correctly', function (assert) {
    const mockTable = {
      columns: [
        new HdsAdvancedTableColumn({
          column: { label: 'First', key: 'first' },
          table: null,
        }),
        new HdsAdvancedTableColumn({
          column: { label: 'Second', key: 'second' },
          table: null,
        }),
      ],
    };

    mockTable.columns.forEach((col) => (col.table = mockTable));

    assert.true(
      mockTable.columns[0].isFirst,
      'first column returns true for isFirst',
    );
    assert.false(
      mockTable.columns[1].isFirst,
      'second column returns false for isFirst',
    );
  });

  test('isFirst getter returns false when index is -1', function (assert) {
    const mockTable = { columns: [] };
    const column = new HdsAdvancedTableColumn({
      column: { label: 'Test', key: 'test' },
      table: mockTable,
    });

    assert.false(column.isFirst, 'returns false when index is -1');
  });

  test('isLast getter identifies last column correctly', function (assert) {
    const mockTable = {
      columns: [
        new HdsAdvancedTableColumn({
          column: { label: 'First', key: 'first' },
          table: null,
        }),
        new HdsAdvancedTableColumn({
          column: { label: 'Second', key: 'second' },
          table: null,
        }),
        new HdsAdvancedTableColumn({
          column: { label: 'Third', key: 'third' },
          table: null,
        }),
      ],
    };

    mockTable.columns.forEach((col) => (col.table = mockTable));

    assert.false(
      mockTable.columns[0].isLast,
      'first column returns false for isLast',
    );
    assert.false(
      mockTable.columns[1].isLast,
      'middle column returns false for isLast',
    );
    assert.true(
      mockTable.columns[2].isLast,
      'last column returns true for isLast',
    );
  });

  test('isLast getter returns false when index is -1', function (assert) {
    const mockTable = { columns: [] };
    const column = new HdsAdvancedTableColumn({
      column: { label: 'Test', key: 'test' },
      table: mockTable,
    });

    assert.false(column.isLast, 'returns false when index is -1');
  });

  test('siblings getter returns correct previous and next columns', function (assert) {
    const mockTable = {
      columns: [
        new HdsAdvancedTableColumn({
          column: { label: 'First', key: 'first' },
          table: null,
        }),
        new HdsAdvancedTableColumn({
          column: { label: 'Second', key: 'second' },
          table: null,
        }),
        new HdsAdvancedTableColumn({
          column: { label: 'Third', key: 'third' },
          table: null,
        }),
      ],
    };

    mockTable.columns.forEach((col) => (col.table = mockTable));

    // Test first column siblings
    const firstSiblings = mockTable.columns[0].siblings;
    assert.strictEqual(
      firstSiblings.previous,
      undefined,
      'first column has no previous sibling',
    );
    assert.strictEqual(
      firstSiblings.next,
      mockTable.columns[1],
      'first column next is second column',
    );

    // Test middle column siblings
    const middleSiblings = mockTable.columns[1].siblings;
    assert.strictEqual(
      middleSiblings.previous,
      mockTable.columns[0],
      'middle column previous is first column',
    );
    assert.strictEqual(
      middleSiblings.next,
      mockTable.columns[2],
      'middle column next is third column',
    );

    // Test last column siblings
    const lastSiblings = mockTable.columns[2].siblings;
    assert.strictEqual(
      lastSiblings.previous,
      mockTable.columns[1],
      'last column previous is second column',
    );
    assert.strictEqual(
      lastSiblings.next,
      undefined,
      'last column has no next sibling',
    );
  });

  test('siblings getter returns empty object when index is -1', function (assert) {
    const mockTable = { columns: [] };
    const column = new HdsAdvancedTableColumn({
      column: { label: 'Test', key: 'test' },
      table: mockTable,
    });

    const siblings = column.siblings;
    assert.deepEqual(siblings, {}, 'returns empty object when index is -1');
  });

  test('siblings getter works with single column', function (assert) {
    const mockTable = {
      columns: [
        new HdsAdvancedTableColumn({
          column: { label: 'Only', key: 'only' },
          table: null,
        }),
      ],
    };

    mockTable.columns[0].table = mockTable;

    const siblings = mockTable.columns[0].siblings;
    assert.strictEqual(
      siblings.previous,
      undefined,
      'single column has no previous sibling',
    );
    assert.strictEqual(
      siblings.next,
      undefined,
      'single column has no next sibling',
    );
  });
});

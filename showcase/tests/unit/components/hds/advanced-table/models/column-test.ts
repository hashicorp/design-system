/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import HdsAdvancedTableColumn, {
  DEFAULT_MAX_WIDTH,
  DEFAULT_MIN_WIDTH,
  DEFAULT_WIDTH,
} from '@hashicorp/design-system-components/components/hds/advanced-table/models/column';
import type { HdsAdvancedTableColumn as HdsAdvancedTableColumnType } from '@hashicorp/design-system-components/components/hds/advanced-table/types';
import HdsAdvancedTableModel from '@hashicorp/design-system-components/components/hds/advanced-table/models/table';

// the table and column models are pretty intertwined, so to test we need to use a table model to create instances of the column model
module('Unit | Component | hds/advanced-table/models/column', function () {
  test('initializes with default properties when minimal args provided', function (assert) {
    const columnObject = {
      label: 'Test Column',
    };

    const table = new HdsAdvancedTableModel({
      model: [],
      columns: [columnObject],
    });

    const column = new HdsAdvancedTableColumn({
      column: columnObject,
      table,
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
    assert.ok(
      typeof column.key === 'string',
      'key defaults to a uuid when not provided',
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
      DEFAULT_WIDTH,
      'width is set to the default when not provided',
    );
  });

  test('initializes with all provided properties', function (assert) {
    const sortFn = (a: unknown, b: unknown): number =>
      (a as number) - (b as number);

    const columnObject: HdsAdvancedTableColumnType = {
      label: 'Full Column',
      align: 'center',
      // @ts-expect-error - testing all options, including non-valid combinations
      isExpandable: true,
      isSortable: true,
      isVisuallyHidden: true,
      key: 'test-column',
      tooltip: 'Column tooltip',
      sortingFunction: sortFn,
    };

    const table = new HdsAdvancedTableModel({
      model: [],
      columns: [columnObject],
    });

    const column = new HdsAdvancedTableColumn({
      column: columnObject,
      table,
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
    const columnObject: HdsAdvancedTableColumnType = {
      label: 'Width Column',
      width: '200px',
      minWidth: '100px',
      maxWidth: '300px',
    };

    const table = new HdsAdvancedTableModel({
      model: [],
      columns: [columnObject],
    });

    const column = new HdsAdvancedTableColumn({
      column: columnObject,
      table,
    });

    assert.strictEqual(column.width, '200px', 'sets the width');
    assert.strictEqual(column.minWidth, '100px', 'sets the minWidth');
    assert.strictEqual(column.maxWidth, '300px', 'sets the maxWidth');
    assert.strictEqual(column.pxWidth, 200, 'converts width to number');
    assert.strictEqual(column.pxMinWidth, 100, 'converts minWidth to number');
    assert.strictEqual(column.pxMaxWidth, 300, 'converts maxWidth to number');
  });

  test('uses default min/max width when only width is provided', function (assert) {
    const columnObject = {
      label: 'Width Only',
      width: '200px',
    };

    const table = new HdsAdvancedTableModel({
      model: [],
      columns: [columnObject],
    });

    const column = new HdsAdvancedTableColumn({
      column: columnObject,
      table,
    });

    assert.strictEqual(column.width, '200px', 'sets the width');
    assert.strictEqual(column.minWidth, '150px', 'sets default minWidth');
    assert.strictEqual(column.maxWidth, '800px', 'sets default maxWidth');
  });

  test('pxWidth setter updates width property', function (assert) {
    const columnObject = {
      label: 'Width Only',
      width: '200px',
    };

    const table = new HdsAdvancedTableModel({
      model: [],
      columns: [columnObject],
    });

    const column = new HdsAdvancedTableColumn({
      column: columnObject,
      table,
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
    const thElement = document.createElement('div');
    thElement.style.width = '100px';
    document.body.appendChild(thElement);

    const columnObject: HdsAdvancedTableColumnType = {
      label: 'Test',
    };

    const table = new HdsAdvancedTableModel({
      model: [],
      columns: [columnObject],
    });

    const column = new HdsAdvancedTableColumn({
      column: columnObject,
      table,
    });

    column.thElement = thElement;

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
      100,
      'returns the width of the thElement',
    );

    column.width = '10em';
    assert.strictEqual(
      column.pxWidth,
      100,
      'returns the width of the thElement',
    );

    column.width = 'auto';
    assert.strictEqual(
      column.pxWidth,
      100,
      'returns the width of the thElement',
    );

    // @ts-expect-error - testing invalid value (width is always a string)
    column.width = undefined;
    assert.strictEqual(
      column.pxWidth,
      100,
      'returns the width of the thElement',
    );
  });

  test('setPxTransientWidth respects min/max constraints', function (assert) {
    const columnObject: HdsAdvancedTableColumnType = {
      label: 'Constrained Width',
      width: '200px',
      minWidth: '150px',
      maxWidth: '250px',
    };

    const table = new HdsAdvancedTableModel({
      model: [],
      columns: [columnObject],
    });

    const column = new HdsAdvancedTableColumn({
      column: columnObject,
      table,
    });

    column.setPxTransientWidth(100);
    assert.strictEqual(
      column.transientWidth,
      '150px',
      'respects minimum width constraint',
    );

    column.setPxTransientWidth(300);
    assert.strictEqual(
      column.transientWidth,
      '250px',
      'respects maximum width constraint',
    );

    column.setPxTransientWidth(200);
    assert.strictEqual(
      column.transientWidth,
      '200px',
      'sets exact width when within constraints',
    );
  });

  test('restoreWidth sets width back to original value', function (assert) {
    const table = new HdsAdvancedTableModel({
      model: [],
      columns: [
        {
          label: 'Restore Test',
          width: '200px',
        },
        {
          label: 'First',
          key: 'first',
        },
        {
          label: 'Second',
          key: 'second',
        },
        {
          label: 'Third',
          key: 'third',
        },
        {
          label: 'Restore Test',
          width: '200px',
        },
      ],
    });

    const column = table.columns[0];

    if (column) {
      assert.strictEqual(column.width, '200px', 'initial width is set');

      column.pxWidth = 300;
      assert.strictEqual(column.width, '300px', 'width is updated');

      column.restoreWidth();
      assert.strictEqual(
        column.width,
        '200px',
        'width is restored to original value',
      );
    }
  });

  test('index getter returns correct column position', function (assert) {
    const table = new HdsAdvancedTableModel({
      model: [],
      columns: [
        {
          label: 'First',
          key: 'first',
        },
        {
          label: 'Second',
          key: 'second',
        },
        {
          label: 'Third',
          key: 'third',
        },
        {
          label: 'Restore Test',
          width: '200px',
        },
      ],
    });

    if (table.columns[0] && table.columns[1] && table.columns[2]) {
      assert.strictEqual(table.columns[0].index, 0, 'first column has index 0');
      assert.strictEqual(
        table.columns[1].index,
        1,
        'second column has index 1',
      );
      assert.strictEqual(table.columns[2].index, 2, 'third column has index 2');
    }
  });

  test('index getter returns -1 when table has no columns', function (assert) {
    const table = new HdsAdvancedTableModel({ columns: [], model: [] });
    const column = new HdsAdvancedTableColumn({
      column: { label: 'Test', key: 'test' },
      table: table,
    });

    assert.strictEqual(column.index, -1, 'returns -1 when no columns exist');
  });

  test('index getter returns -1 when column key does not exist in table', function (assert) {
    const table = new HdsAdvancedTableModel({
      columns: [{ label: 'Other', key: 'other' }],
      model: [],
    });

    const column = new HdsAdvancedTableColumn({
      column: { label: 'Test', key: 'nonexistent' },
      table,
    });

    assert.strictEqual(
      column.index,
      -1,
      'returns -1 when column key not found',
    );
  });

  test('isFirst getter identifies first column correctly', function (assert) {
    const table = new HdsAdvancedTableModel({
      columns: [
        { label: 'First', key: 'first' },
        { label: 'Second', key: 'second' },
      ],
      model: [],
    });

    if (table.columns[0] && table.columns[1]) {
      assert.true(
        table.columns[0].isFirst,
        'first column returns true for isFirst',
      );
      assert.false(
        table.columns[1].isFirst,
        'second column returns false for isFirst',
      );
    }
  });

  test('isFirst getter returns false when index is -1', function (assert) {
    const table = new HdsAdvancedTableModel({
      columns: [{ label: 'Other', key: 'other' }],
      model: [],
    });

    const column = new HdsAdvancedTableColumn({
      column: { label: 'Test', key: 'nonexistent' },
      table,
    });

    assert.false(column.isFirst, 'returns false when index is -1');
  });

  test('isLast getter identifies last column correctly', function (assert) {
    const table = new HdsAdvancedTableModel({
      columns: [
        { label: 'First', key: 'first' },
        { label: 'Second', key: 'second' },
        { label: 'Third', key: 'third' },
      ],
      model: [],
    });

    if (table.columns[0] && table.columns[1] && table.columns[2]) {
      assert.false(
        table.columns[0].isLast,
        'first column returns false for isLast',
      );
      assert.false(
        table.columns[1].isLast,
        'middle column returns false for isLast',
      );
      assert.true(
        table.columns[2].isLast,
        'last column returns true for isLast',
      );
    }
  });

  test('isLast getter returns false when index is -1', function (assert) {
    const table = new HdsAdvancedTableModel({
      columns: [{ label: 'Other', key: 'other' }],
      model: [],
    });

    const column = new HdsAdvancedTableColumn({
      column: { label: 'Test', key: 'nonexistent' },
      table,
    });

    assert.false(column.isLast, 'returns false when index is -1');
  });

  test('siblings getter returns correct previous and next columns', function (assert) {
    const table = new HdsAdvancedTableModel({
      columns: [
        { label: 'First', key: 'first' },
        { label: 'Second', key: 'second' },
        { label: 'Third', key: 'third' },
      ],
      model: [],
    });

    if (table.columns[0] && table.columns[1] && table.columns[2]) {
      // Test first column siblings
      const firstSiblings = table.columns[0].siblings;
      assert.strictEqual(
        firstSiblings.previous,
        undefined,
        'first column has no previous sibling',
      );
      assert.strictEqual(
        firstSiblings.next,
        table.columns[1],
        'first column next is second column',
      );

      // Test middle column siblings
      const middleSiblings = table.columns[1].siblings;
      assert.strictEqual(
        middleSiblings.previous,
        table.columns[0],
        'middle column previous is first column',
      );
      assert.strictEqual(
        middleSiblings.next,
        table.columns[2],
        'middle column next is third column',
      );

      // Test last column siblings
      const lastSiblings = table.columns[2].siblings;
      assert.strictEqual(
        lastSiblings.previous,
        table.columns[1],
        'last column previous is second column',
      );
      assert.strictEqual(
        lastSiblings.next,
        undefined,
        'last column has no next sibling',
      );
    }
  });

  test('siblings getter returns empty object when index is -1', function (assert) {
    const table = new HdsAdvancedTableModel({
      columns: [{ label: 'Other', key: 'other' }],
      model: [],
    });

    const column = new HdsAdvancedTableColumn({
      column: { label: 'Test', key: 'nonexistent' },
      table,
    });

    const siblings = column.siblings;
    assert.deepEqual(siblings, {}, 'returns empty object when index is -1');
  });

  test('siblings getter works with single column', function (assert) {
    const table = new HdsAdvancedTableModel({
      columns: [{ label: 'Only', key: 'only' }],
      model: [],
    });

    if (table.columns[0]) {
      const siblings = table.columns[0].siblings;
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
    }
  });
});

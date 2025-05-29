import { module, test } from 'qunit';
import sinon from 'sinon';
import HdsAdvancedTableColumn from '@hashicorp/design-system-components/components/hds/advanced-table/models/column';

module('Unit | Component | hds/advanced-table/models/column', function () {
  test('initializes with default properties when minimal args provided', function (assert) {
    const column = new HdsAdvancedTableColumn({
      column: { label: 'Test Column' },
    });

    assert.strictEqual(column.label, 'Test Column', 'sets the label property');
    assert.strictEqual(column.align, 'left', 'defaults to left alignment');
    assert.false(column.isExpandable, 'defaults isExpandable to false');
    assert.false(column.isResizable, 'defaults isResizable to false');
    assert.strictEqual(
      column.isSortable,
      undefined,
      'isSortable is undefined when not provided',
    );
    assert.strictEqual(
      column.isVisuallyHidden,
      undefined,
      'isVisuallyHidden is undefined when not provided',
    );
    assert.strictEqual(
      column.key,
      undefined,
      'key is undefined when not provided',
    );
    assert.strictEqual(
      column.minWidth,
      undefined,
      'minWidth is undefined when width is not provided',
    );
    assert.strictEqual(
      column.maxWidth,
      undefined,
      'maxWidth is undefined when width is not provided',
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
        isResizable: false,
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
    assert.false(column.isResizable, 'sets isResizable');
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

  test('setPxWidth calls resize callback when key is present', function (assert) {
    const resizeSpy = sinon.spy();

    const column = new HdsAdvancedTableColumn({
      column: {
        label: 'Callback Test',
        width: '150px',
        key: 'test-key',
      },
      onColumnResize: resizeSpy,
    });

    column.setPxWidth(200);

    assert.ok(
      resizeSpy.calledOnceWith('test-key', '200px'),
      'resize callback was called when key is present',
    );
  });

  test('setPxWidth does not call resize callback when key is missing', function (assert) {
    const resizeSpy = sinon.spy();

    const column = new HdsAdvancedTableColumn({
      column: {
        label: 'No Key',
        width: '150px',
      },
      onColumnResize: resizeSpy,
    });

    column.setPxWidth(200);

    assert.false(
      resizeSpy.called,
      'resize callback was not called when key is missing',
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
});

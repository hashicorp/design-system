/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { array, hash, get } from '@ember/helper';
import {
  click,
  find,
  findAll,
  focus,
  render,
  settled,
  triggerEvent,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { performContextMenuAction, waitForLayout } from '../utils';
import { TrackedObject } from 'tracked-built-ins';
import sinon from 'sinon';
import style from 'ember-style-modifier';
import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import { setupRenderingTest } from 'showcase/tests/helpers';

import type { HdsAdvancedTableColumn } from '@hashicorp/design-system-components/components/hds/advanced-table/types';

const POINTER_DRAG_START_X = 100;

function assertReportedPixelWidth(
  assert: Assert,
  spy: sinon.SinonSpy,
  selector: string,
  label: string,
) {
  const [reportedKey, reportedWidth] = spy.lastCall.args as [
    string,
    string | undefined,
  ];
  const rendered = findOrThrow(selector).offsetWidth;

  assert.strictEqual(reportedKey, 'col1', `${label}: reports the column key`);
  assert.ok(
    reportedWidth !== undefined && /^\d+px$/.test(reportedWidth),
    `${label}: reports a pixel width (got ${JSON.stringify(reportedWidth)})`,
  );
  assert.ok(
    Math.abs(parseInt(reportedWidth ?? '', 10) - rendered) <= 1,
    `${label}: reported width matches the rendered width (reported ${reportedWidth}, rendered ${rendered}px)`,
  );
}

function findOrThrow(selector: string): HTMLElement {
  const element = find(selector);

  if (element === null) {
    throw new Error(`expected to find "${selector}" but nothing was found`);
  }

  return element as HTMLElement;
}

function findAtOrThrow(selector: string, index: number): HTMLElement {
  const elements = findAll(selector);
  const element = elements[index];

  if (element === undefined) {
    throw new Error(
      `expected an element at index ${index} matching "${selector}" but found ${elements.length}`,
    );
  }

  return element as HTMLElement;
}

function gridValuesAreEqual(
  newGridValues: string[],
  originalGridValues: string[],
) {
  if (newGridValues.length === 0 || originalGridValues.length === 0) {
    return false;
  }

  if (newGridValues.length !== originalGridValues.length) {
    return false;
  }

  return newGridValues.every((newGridValue, index) => {
    const newGridValueInt = parseInt(newGridValue, 10);

    if (!originalGridValues[index]) {
      return false;
    }

    const originalGridValueInt = parseInt(originalGridValues[index], 10);

    // Allow for small pixel differences due to CSS grid subpixel rendering in different environments
    return Math.abs(newGridValueInt - originalGridValueInt) <= 1;
  });
}

function columnWidth(tableSelector: string, index: number): number {
  const headerCells = findAll(
    `${tableSelector} .hds-advanced-table__thead .hds-advanced-table__th`,
  );
  const headerCell = headerCells[index];

  if (headerCell === undefined) {
    throw new Error(
      `expected a header cell at index ${index} in "${tableSelector}" but found ${headerCells.length}`,
    );
  }

  return (headerCell as HTMLElement).offsetWidth;
}

function getTableGridValues(tableElement: Element) {
  const computedStyle = window.getComputedStyle(tableElement);
  const gridTemplateColumns = computedStyle.getPropertyValue(
    'grid-template-columns',
  );
  const gridValues = gridTemplateColumns
    .split(' ')
    .map((value) => value.trim());

  return gridValues;
}

async function simulatePointerDrag(
  handle: Element,
  toX: number,
  fromX: number = POINTER_DRAG_START_X,
) {
  await triggerEvent(handle, 'pointerdown', {
    clientX: fromX,
    button: 0,
  });
  await triggerEvent(handle, 'pointermove', { clientX: toX, buttons: 1 });
  await triggerEvent(window, 'pointerup', { button: 0 });

  await waitForLayout();
}

async function simulateRightPointerDrag(handle: Element) {
  return simulatePointerDrag(handle, POINTER_DRAG_START_X + 30);
}

async function simulateLeftPointerDrag(handle: Element) {
  return simulatePointerDrag(handle, POINTER_DRAG_START_X - 30);
}

const DEFAULT_RESIZABLE_COLUMNS: HdsAdvancedTableColumn[] = [
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
];

const DEFAULT_RESIZABLE_MODEL = [
  { id: '1', col1: 'A', col2: 'B' },
  { id: '2', col1: 'C', col2: 'D' },
];

const createResizableTable = async (options: {
  onColumnResize?: (key: string) => void;
}) => {
  await render(
    <template>
      <div {{style width="1000px"}}>
        <HdsAdvancedTable
          @model={{DEFAULT_RESIZABLE_MODEL}}
          @columns={{DEFAULT_RESIZABLE_COLUMNS}}
          @hasResizableColumns={{true}}
          @onColumnResize={{options.onColumnResize}}
          id="resize-test-table"
        >
          <:body as |B|>
            <B.Tr>
              <B.Td>{{get B.data "col1"}}</B.Td>
              <B.Td>{{get B.data "col2"}}</B.Td>
            </B.Tr>
          </:body>
        </HdsAdvancedTable></div>
    </template>,
  );

  await waitForLayout();
};

module('Integration | Component | hds/advanced-table/index', function (hooks) {
  setupRenderingTest(hooks);

  module('column resizing', function () {
    test('it should allow resizing columns with the resize handle (pointer events)', async function (assert) {
      await createResizableTable({});

      const table = findOrThrow('.hds-advanced-table');
      const originalGridValues = getTableGridValues(table);

      assert
        .dom('.hds-advanced-table__th-resize-handle')
        .exists(
          { count: 1 },
          'There is one resize handle (not on last column)',
        );

      const handle = findOrThrow('.hds-advanced-table__th-resize-handle'); // get the first handle

      // Simulate pointer drag to the right (increase width)
      await simulateRightPointerDrag(handle);

      const newGridValues = getTableGridValues(table);
      assert.notDeepEqual(
        newGridValues,
        originalGridValues,
        'Grid values changed after drag',
      );
    });

    test('it should allow resizing columns with the resize handle (keyboard events)', async function (assert) {
      await createResizableTable({});

      const table = findOrThrow('.hds-advanced-table');
      const originalGridValues = getTableGridValues(table);

      const handle = findOrThrow('.hds-advanced-table__th-resize-handle');

      // Focus and send ArrowRight key
      await focus(handle);
      await triggerKeyEvent(handle, 'keydown', 'ArrowRight');

      const afterRightGridValues = getTableGridValues(table);

      assert.notOk(
        gridValuesAreEqual(originalGridValues, afterRightGridValues),
        'Grid values are not equal after ArrowRight',
      );

      // ArrowRight should grow the first column
      assert.ok(
        parseInt(afterRightGridValues[0] ?? '0', 10) >
          parseInt(originalGridValues[0] ?? '0', 10),
        'First column grew after ArrowRight',
      );

      // Send ArrowLeft key
      await triggerKeyEvent(handle, 'keydown', 'ArrowLeft');

      await waitForLayout();

      const afterLeftGridValues = getTableGridValues(table);

      // an exact pixel round-trip is not guaranteed once the table fills its
      // container, but ArrowLeft must still shrink the column again
      assert.ok(
        parseInt(afterLeftGridValues[0] ?? '0', 10) <
          parseInt(afterRightGridValues[0] ?? '0', 10),
        'First column shrank again after ArrowLeft',
      );
    });

    test('it should not allow resizing columns below their minimum width (pointer events)', async function (assert) {
      await createResizableTable({});

      const table = findOrThrow('.hds-advanced-table');
      const originalGridValues = getTableGridValues(table);

      const handle = findOrThrow('.hds-advanced-table__th-resize-handle');

      // Try to resize column to a very small width (well below minWidth of 60px)
      await simulatePointerDrag(handle, 1);

      const newGridValues = getTableGridValues(table);
      assert.notDeepEqual(
        newGridValues,
        originalGridValues,
        'Grid values changed after pointer drag',
      );

      const [firstColumnGridValue = ''] = newGridValues;

      assert.ok(
        parseInt(firstColumnGridValue, 10) >= 60,
        `Column width respects minimum width constraint (actual: ${firstColumnGridValue}, min: 60px)`,
      );
    });

    test('it should not allow resizing columns above their maximum width (pointer events)', async function (assert) {
      await createResizableTable({});

      const table = findOrThrow('.hds-advanced-table');
      const originalGridValues = getTableGridValues(table);

      const handle = findOrThrow('.hds-advanced-table__th-resize-handle');

      // Try to resize column to a very large width (well above maxWidth of 300px)
      await simulatePointerDrag(handle, 10000);

      // Check the new width
      const newGridValues = getTableGridValues(table);
      assert.notDeepEqual(
        newGridValues,
        originalGridValues,
        'Grid values changed after pointer drag',
      );

      const [firstColumnGridValue = ''] = newGridValues;

      assert.ok(
        parseInt(firstColumnGridValue, 10) <= 300,
        `Column width respects maximum width constraint (actual: ${firstColumnGridValue}px, max: 300px)`,
      );
    });

    test('it should not allow resizing columns below their minimum width (keyboard events)', async function (assert) {
      await createResizableTable({});

      const table = findOrThrow('.hds-advanced-table');
      const originalGridValues = getTableGridValues(table);

      const handle = findOrThrow('.hds-advanced-table__th-resize-handle');

      // Focus handle and press ArrowLeft multiple times to try going below min width
      await focus(handle);

      for (let i = 0; i < 10; i++) {
        // moves left 10px each time
        await triggerKeyEvent(handle, 'keydown', 'ArrowLeft');
      }

      await waitForLayout();

      const newGridValues = getTableGridValues(table);
      assert.notDeepEqual(
        newGridValues,
        originalGridValues,
        'Grid values changed after ArrowLeft',
      );

      const [firstColumnGridValue = ''] = newGridValues;

      assert.ok(
        parseInt(firstColumnGridValue, 10) >= 60,
        `Column width respects minimum width constraint with keyboard events (actual: ${firstColumnGridValue}, min: 60px)`,
      );
    });

    test('it should not allow resizing columns above their maximum width (keyboard events)', async function (assert) {
      await createResizableTable({});

      const table = findOrThrow('.hds-advanced-table');
      const originalGridValues = getTableGridValues(table);

      const handle = findOrThrow('.hds-advanced-table__th-resize-handle');

      // Focus handle and press ArrowRight multiple times to try going above max width
      await focus(handle);

      for (let i = 0; i < 10; i++) {
        // moves right 10px each time
        await triggerKeyEvent(handle, 'keydown', 'ArrowRight');
      }

      await waitForLayout();

      const newGridValues = getTableGridValues(table);
      assert.notDeepEqual(
        newGridValues,
        originalGridValues,
        'Grid values changed after ArrowRight',
      );

      const [firstColumnGridValue = ''] = newGridValues;

      assert.ok(
        parseInt(firstColumnGridValue, 10) <= 300,
        `Column width respects maximum width constraint with keyboard events (actual: ${firstColumnGridValue}px, max: 300px)`,
      );
    });

    test('it should show the context menu when resizing is enabled', async function (assert) {
      await createResizableTable({});

      const th = findOrThrow('.hds-advanced-table__th'); // find the first header cell

      assert.ok(
        th.querySelector('.hds-advanced-table__th-context-menu'),
        'context menu exists',
      );

      await click(
        findOrThrow('.hds-advanced-table__th .hds-dropdown-toggle-icon'),
      );

      assert
        .dom('[data-test-context-option-key="reset-column-width"]')
        .exists();
    });

    test('it should resize the column to the initial width when resetting column width', async function (assert) {
      await createResizableTable({});

      const table = findOrThrow('.hds-advanced-table');
      const originalGridValues = getTableGridValues(table);

      const handle = findOrThrow('.hds-advanced-table__th-resize-handle');
      const th = findOrThrow('.hds-advanced-table__th');

      await simulateRightPointerDrag(handle);

      const newGridValues = getTableGridValues(table);

      assert.notOk(
        gridValuesAreEqual(originalGridValues, newGridValues),
        'Grid values are not equal after resizing',
      );

      await performContextMenuAction(th, 'reset-column-width');
      await waitForLayout();

      // asserted directly rather than against the initial grid snapshot, which a
      // transient scroll bar at render time can skew
      const resetTable = findOrThrow('.hds-advanced-table');
      const firstColumn = findOrThrow('.hds-advanced-table__th');

      assert.ok(
        Math.abs(firstColumn.offsetWidth - 120) <= 1,
        `first column reset to its initial 120px width (actual ${firstColumn.offsetWidth})`,
      );
      assert.ok(
        Math.abs(
          resetTable.offsetWidth -
            (resetTable.parentElement as HTMLElement).offsetWidth,
        ) <= 1,
        'table fills its container after reset',
      );
    });

    test('it should restore a column with no explicit width to its original share when reset', async function (assert) {
      await createResizableTable({});

      const table = findOrThrow('.hds-advanced-table');
      const originalGridValues = getTableGridValues(table);

      const handle = findOrThrow('.hds-advanced-table__th-resize-handle');

      // drag col1 left so it shrinks and col2 (no explicit width) grows
      await simulateLeftPointerDrag(handle);

      assert.notOk(
        gridValuesAreEqual(originalGridValues, getTableGridValues(table)),
        'grid changed after resize',
      );

      const col2Th = findAtOrThrow('.hds-advanced-table__th', 1);

      assert.ok(
        col2Th.querySelector('.hds-dropdown-toggle-icon'),
        'col2 has a context menu toggle',
      );

      await performContextMenuAction(col2Th, 'reset-column-width');
      await waitForLayout();

      await performContextMenuAction(
        findAtOrThrow('.hds-advanced-table__th', 0),
        'reset-column-width',
      );
      await waitForLayout();

      assert.ok(
        gridValuesAreEqual(getTableGridValues(table), originalGridValues),
        'resetting every column restores the original grid',
      );
    });

    test('resetting a column width is idempotent', async function (assert) {
      await render(
        <template>
          <div {{style width="900px"}}>
            <HdsAdvancedTable
              id="reset-table"
              @columns={{array
                (hash key="a" label="A")
                (hash key="b" label="B")
                (hash key="c" label="C")
              }}
              @model={{array
                (hash a="a1" b="b1" c="c1")
                (hash a="a2" b="b2" c="c2")
              }}
              @hasResizableColumns={{true}}
            >
              <:body as |B|>
                <B.Tr>
                  <B.Td>{{get B.data "a"}}</B.Td>
                  <B.Td>{{get B.data "b"}}</B.Td>
                  <B.Td>{{get B.data "c"}}</B.Td>
                </B.Tr>
              </:body>
            </HdsAdvancedTable>
          </div>
        </template>,
      );

      await waitForLayout();

      const widths = () =>
        [0, 1, 2].map((index) => columnWidth('#reset-table', index));
      const resetEveryColumn = async () => {
        for (const index of [0, 1, 2]) {
          await performContextMenuAction(
            findAtOrThrow('#reset-table .hds-advanced-table__th', index),
            'reset-column-width',
          );
          await waitForLayout();
        }
      };

      const originalWidths = widths();

      await simulatePointerDrag(
        findOrThrow('#reset-table .hds-advanced-table__th-resize-handle'),
        250,
      );

      assert.notDeepEqual(
        widths(),
        originalWidths,
        'the drag actually changed the column widths',
      );

      await resetEveryColumn();

      const afterFirstPass = widths();

      assert.deepEqual(
        afterFirstPass,
        originalWidths,
        'resetting every column returns the table to its original layout',
      );

      await resetEveryColumn();

      assert.deepEqual(
        widths(),
        afterFirstPass,
        'resetting already-reset columns leaves every width unchanged',
      );
    });

    test('it should focus the resize handle when the "resize column" context menu option is clicked', async function (assert) {
      await createResizableTable({});

      const handle = findOrThrow('.hds-advanced-table__th-resize-handle');
      const th = findOrThrow('.hds-advanced-table__th');

      await performContextMenuAction(th, 'resize-column');

      assert.ok(handle === document.activeElement, 'Resize handle is focused');
    });

    test('it should call `onColumnResize` when a column is resized by keyboard', async function (assert) {
      const onColumnResizeSpy = sinon.spy();
      await createResizableTable({
        onColumnResize: onColumnResizeSpy,
      });

      const handle = findOrThrow('.hds-advanced-table__th-resize-handle');

      await focus(handle);
      await triggerKeyEvent(handle, 'keydown', 'ArrowRight');
      await waitForLayout();

      assert.ok(onColumnResizeSpy.calledOnce, 'onColumnResize was called');
      assertReportedPixelWidth(
        assert,
        onColumnResizeSpy,
        '.hds-advanced-table__th',
        'keyboard',
      );
    });

    test('it should call `onColumnResize` when a column is resized by dragging', async function (assert) {
      const onColumnResizeSpy = sinon.spy();
      await createResizableTable({
        onColumnResize: onColumnResizeSpy,
      });

      const handle = findOrThrow('.hds-advanced-table__th-resize-handle');

      // Simulate pointer drag to the right (increase width)
      await simulateRightPointerDrag(handle);

      assert.ok(onColumnResizeSpy.calledOnce, 'onColumnResize was called');
      assertReportedPixelWidth(
        assert,
        onColumnResizeSpy,
        '.hds-advanced-table__th',
        'drag',
      );
    });

    test('it should call `onColumnResize` when a column width is reset', async function (assert) {
      const onColumnResizeSpy = sinon.spy();

      await createResizableTable({
        onColumnResize: onColumnResizeSpy,
      });

      const handle = findOrThrow('.hds-advanced-table__th-resize-handle');

      await simulateRightPointerDrag(handle);

      assert.ok(onColumnResizeSpy.calledOnce, 'onColumnResize was called');

      await performContextMenuAction(
        findOrThrow('.hds-advanced-table__th'),
        'reset-column-width',
      );

      await waitForLayout();

      assert.strictEqual(
        onColumnResizeSpy.callCount,
        2,
        'the reset reported the column it restored',
      );
      assertReportedPixelWidth(
        assert,
        onColumnResizeSpy,
        '.hds-advanced-table__th',
        'reset',
      );
    });

    // Resize behavior tests
    test('columns will grow to fill available space when width is not explicitly set', async function (assert) {
      const context = new TrackedObject({
        width: '300px',
      });

      await render(
        <template>
          <div id="resize-test-container" {{style width=context.width}}>
            <HdsAdvancedTable
              id="data-test-advanced-table"
              @columns={{array
                (hash key="name" label="Name")
                (hash key="biography" label="Biography")
                (hash key="occupation" label="Occupation")
                (hash key="age" label="Age")
                (hash key="hair" label="Hair Color")
                (hash key="eyes" label="Eye Color")
                (hash key="salary" label="Salary")
              }}
              @model={{array
                (hash
                  name="John Jacob Jingleheimer Schmidt"
                  biography="A long biography text that should cause overflow. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  occupation="Professional Name Repeater"
                  age=42
                  hair="Brown"
                  eyes="Blue"
                  salary=1000000
                )
              }}
            >
              <:body as |B|>
                <B.Tr>
                  <B.Td>{{get B.data "name"}}</B.Td>
                  <B.Td>{{get B.data "biography"}}</B.Td>
                  <B.Td>{{get B.data "occupation"}}</B.Td>
                  <B.Td>{{get B.data "age"}}</B.Td>
                  <B.Td>{{get B.data "hair"}}</B.Td>
                  <B.Td>{{get B.data "eyes"}}</B.Td>
                  <B.Td>{{get B.data "salary"}}</B.Td>
                </B.Tr>
              </:body>
            </HdsAdvancedTable>
          </div>
        </template>,
      );

      const table = findOrThrow('#data-test-advanced-table');
      const container = findOrThrow('#resize-test-container');

      assert.ok(
        table.offsetWidth >= container.offsetWidth,
        'Table width is greater than the container width',
      );

      context.width = '100%';
      await settled();

      assert.strictEqual(
        table.offsetWidth,
        container.offsetWidth,
        'Table width grows to fit container width',
      );
    });

    test('a resized column keeps the table filling its container when the container grows', async function (assert) {
      const context = new TrackedObject({ width: '600px' });

      await render(
        <template>
          <div id="repro-container" {{style width=context.width}}>
            <HdsAdvancedTable
              id="repro-table"
              @columns={{array
                (hash key="name" label="Name")
                (hash key="type" label="Type")
                (hash key="status" label="Status")
              }}
              @model={{array
                (hash name="Alpha" type="One" status="Active")
                (hash name="Beta" type="Two" status="Inactive")
              }}
              @hasResizableColumns={{true}}
            >
              <:body as |B|>
                <B.Tr>
                  <B.Td>{{get B.data "name"}}</B.Td>
                  <B.Td>{{get B.data "type"}}</B.Td>
                  <B.Td>{{get B.data "status"}}</B.Td>
                </B.Tr>
              </:body>
            </HdsAdvancedTable>
          </div>
        </template>,
      );

      await waitForLayout();

      const handle = findOrThrow(
        '#repro-table .hds-advanced-table__th-resize-handle',
      );
      await simulateRightPointerDrag(handle);
      await waitForLayout();

      context.width = '1000px';
      await settled();
      await waitForLayout();

      const table = findOrThrow('#repro-table');
      const container = findOrThrow('#repro-container');

      assert.ok(
        Math.abs(table.offsetWidth - container.offsetWidth) <= 1,
        `table still fills its container after it grows (table=${table.offsetWidth}, container=${container.offsetWidth})`,
      );
    });

    test('a resized column keeps the table filling its container when the container shrinks', async function (assert) {
      const context = new TrackedObject({ width: '1000px' });

      await render(
        <template>
          <div id="shrink-container" {{style width=context.width}}>
            <HdsAdvancedTable
              id="shrink-table"
              @columns={{array
                (hash key="name" label="Name")
                (hash key="type" label="Type")
                (hash key="status" label="Status")
              }}
              @model={{array
                (hash name="Alpha" type="One" status="Active")
                (hash name="Beta" type="Two" status="Inactive")
              }}
              @hasResizableColumns={{true}}
            >
              <:body as |B|>
                <B.Tr>
                  <B.Td>{{get B.data "name"}}</B.Td>
                  <B.Td>{{get B.data "type"}}</B.Td>
                  <B.Td>{{get B.data "status"}}</B.Td>
                </B.Tr>
              </:body>
            </HdsAdvancedTable>
          </div>
        </template>,
      );

      await waitForLayout();

      const handle = findOrThrow(
        '#shrink-table .hds-advanced-table__th-resize-handle',
      );
      await simulateRightPointerDrag(handle);
      await waitForLayout();

      // 600px leaves room for all three columns above the 150px default
      // minimum, so nothing is clamped and the table can still fit exactly
      context.width = '600px';
      await settled();
      await waitForLayout();

      const table = findOrThrow('#shrink-table');
      const container = findOrThrow('#shrink-container');

      assert.ok(
        Math.abs(table.offsetWidth - container.offsetWidth) <= 1,
        `table still fits its container after it shrinks (table=${table.offsetWidth}, container=${container.offsetWidth})`,
      );
    });

    test('resizing chains across columns when a neighbor reaches its minimum width', async function (assert) {
      // four columns at ~250px each (min 150): dragging 300px is more than any
      // single neighbor can give up, so the change must chain across the columns
      await render(
        <template>
          <div {{style width="1000px"}}>
            <HdsAdvancedTable
              id="chain-table"
              @columns={{array
                (hash key="a" label="A")
                (hash key="b" label="B")
                (hash key="c" label="C")
                (hash key="d" label="D")
              }}
              @model={{array
                (hash a="a1" b="b1" c="c1" d="d1")
                (hash a="a2" b="b2" c="c2" d="d2")
              }}
              @hasResizableColumns={{true}}
            >
              <:body as |B|>
                <B.Tr>
                  <B.Td>{{get B.data "a"}}</B.Td>
                  <B.Td>{{get B.data "b"}}</B.Td>
                  <B.Td>{{get B.data "c"}}</B.Td>
                  <B.Td>{{get B.data "d"}}</B.Td>
                </B.Tr>
              </:body>
            </HdsAdvancedTable>
          </div>
        </template>,
      );

      await waitForLayout();

      const handle = findOrThrow(
        '#chain-table .hds-advanced-table__th-resize-handle',
      );

      await simulatePointerDrag(handle, 400);

      assert.ok(
        columnWidth('#chain-table', 1) <= 152,
        `second column reached its minimum width (actual ${columnWidth('#chain-table', 1)})`,
      );
      // the change chains past the immediate neighbor to the third column
      assert.ok(
        columnWidth('#chain-table', 2) < 240,
        `third column also shrank, proving the chain continued (actual ${columnWidth('#chain-table', 2)})`,
      );
    });

    test('repeated keyboard resizes leave the untouched columns alone', async function (assert) {
      await render(
        <template>
          <div {{style width="1000px"}}>
            <HdsAdvancedTable
              id="kbd-table"
              @columns={{array
                (hash key="a" label="A")
                (hash key="b" label="B")
                (hash key="c" label="C")
                (hash key="d" label="D")
              }}
              @model={{array
                (hash a="a1" b="b1" c="c1" d="d1")
                (hash a="a2" b="b2" c="c2" d="d2")
              }}
              @hasResizableColumns={{true}}
            >
              <:body as |B|>
                <B.Tr>
                  <B.Td>{{get B.data "a"}}</B.Td>
                  <B.Td>{{get B.data "b"}}</B.Td>
                  <B.Td>{{get B.data "c"}}</B.Td>
                  <B.Td>{{get B.data "d"}}</B.Td>
                </B.Tr>
              </:body>
            </HdsAdvancedTable>
          </div>
        </template>,
      );

      await waitForLayout();

      const startFirst = columnWidth('#kbd-table', 0);

      // the handle on column B's right edge, so column A sits outside the
      // gesture entirely. columns to its RIGHT are expected to move — they
      // cascade once column C reaches its minimum — but column A must not.
      const handle = findAtOrThrow(
        '#kbd-table .hds-advanced-table__th-resize-handle',
        1,
      );

      await focus(handle);

      // each keypress is a full begin/commit cycle, so any per-commit error
      // compounds; twelve of them make a sub-pixel drift plainly visible
      const trace: number[] = [];

      for (let index = 0; index < 12; index++) {
        await triggerKeyEvent(handle, 'keydown', 'ArrowRight');
        await waitForLayout();

        trace.push(columnWidth('#kbd-table', 0));
      }

      assert.strictEqual(
        columnWidth('#kbd-table', 0),
        startFirst,
        `the column left of the boundary never moved (trace ${JSON.stringify(trace)})`,
      );
      assert.ok(
        columnWidth('#kbd-table', 1) > startFirst,
        'the resized column actually grew',
      );
    });

    test('the resize handle exposes accurate aria values after a resize', async function (assert) {
      await createResizableTable({});

      const handle = findOrThrow('.hds-advanced-table__th-resize-handle');

      await simulateRightPointerDrag(handle);

      const th = findOrThrow('.hds-advanced-table__th');
      const renderedWidth = th.offsetWidth;
      const valueNow = parseInt(handle.getAttribute('aria-valuenow') ?? '', 10);
      const valueMax = parseInt(handle.getAttribute('aria-valuemax') ?? '', 10);

      assert.ok(
        valueNow > 0 && Math.abs(valueNow - renderedWidth) <= 2,
        `aria-valuenow reflects the rendered pixel width (valuenow ${valueNow}, rendered ${renderedWidth})`,
      );
      assert.ok(
        valueMax >= valueNow,
        `aria-valuemax is present and not below the current value (max ${valueMax}, now ${valueNow})`,
      );
      assert.dom(handle).hasAttribute('aria-valuetext', `${valueNow}px`);
    });
  });
});

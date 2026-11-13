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
  waitUntil,
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

async function waitForInitialTableLayout(selector: string) {
  await waitForLayout();

  const table = findOrThrow(selector);

  // These short fixtures should not have the transient scrollbar seen during measurement.
  await waitUntil(() => table.scrollHeight <= table.clientHeight, {
    timeoutMessage: `${selector} still has vertical overflow before capturing baseline widths`,
  });
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

// measures every column mid-drag and again after release, to catch widths
// that jump when the drag is committed
async function measureDragAndRelease(
  tableSelector: string,
  handleIndex: number,
  deltaX: number,
): Promise<{ duringDrag: number[]; afterRelease: number[] }> {
  const handle = findAtOrThrow(
    `${tableSelector} .hds-advanced-table__th-resize-handle`,
    handleIndex,
  );
  const measure = () =>
    findAll(
      `${tableSelector} .hds-advanced-table__thead .hds-advanced-table__th`,
    ).map((th) => (th as HTMLElement).offsetWidth);

  await triggerEvent(handle, 'pointerdown', {
    clientX: POINTER_DRAG_START_X,
    button: 0,
  });
  await triggerEvent(handle, 'pointermove', {
    clientX: POINTER_DRAG_START_X + deltaX,
    buttons: 1,
  });
  await waitForLayout();

  const duringDrag = measure();

  await triggerEvent(window, 'pointerup', { button: 0 });
  await waitForLayout();

  return { duringDrag, afterRelease: measure() };
}

function assertWidthsKeptOnRelease(
  assert: Assert,
  {
    duringDrag,
    afterRelease,
  }: { duringDrag: number[]; afterRelease: number[] },
) {
  const summary = `during ${duringDrag.join(', ')}, after ${afterRelease.join(', ')}`;

  duringDrag.forEach((width, index) => {
    assert.ok(
      Math.abs((afterRelease[index] ?? 0) - width) <= 1,
      `column ${index} keeps its dragged width (${summary})`,
    );
  });
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

  await waitForInitialTableLayout('#resize-test-table');
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

      await waitForInitialTableLayout('#reset-table');

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

    test('a flexible column keeps its content width when the table overflows', async function (assert) {
      await render(
        <template>
          <div {{style width="500px"}}>
            <HdsAdvancedTable
              id="of-table"
              @columns={{array
                (hash key="a" label="A" width="300px")
                (hash key="b" label="B" width="300px")
                (hash key="c" label="C")
              }}
              @model={{array
                (hash a="a1" b="b1" c="/var/log/boundary_session.log")
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

      const flexible = columnWidth('#of-table', 2);

      assert.ok(
        flexible > 160,
        `flexible column kept its content width instead of collapsing to the 150px minimum (actual ${flexible})`,
      );

      // growing the second column takes width from the flexible column, which
      // must not collapse to its floor on release while the table overflows
      const widths = await measureDragAndRelease('#of-table', 1, 10);

      assert.ok(
        Math.abs((widths.duringDrag[2] ?? 0) - (flexible - 10)) <= 1,
        `precondition: the flexible column shrank by the dragged amount (during ${widths.duringDrag.join(', ')})`,
      );
      assertWidthsKeptOnRelease(assert, widths);
    });

    test('all-flexible columns keep their dragged widths on release when the table overflows', async function (assert) {
      await render(
        <template>
          <div {{style width="400px"}}>
            <HdsAdvancedTable
              id="flex-of-table"
              @columns={{array
                (hash key="a" label="A")
                (hash key="b" label="B")
                (hash key="c" label="C")
              }}
              @model={{array
                (hash
                  a="/var/log/boundary_session.log"
                  b="/var/log/boundary_session.log"
                  c="/var/log/boundary_session.log"
                )
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

      const table = findOrThrow('#flex-of-table .hds-advanced-table');
      const thead = findOrThrow('#flex-of-table .hds-advanced-table__thead');

      assert.ok(
        thead.offsetWidth > table.clientWidth,
        `precondition: the columns make the table overflow (columns ${thead.offsetWidth}, clientWidth ${table.clientWidth})`,
      );

      assertWidthsKeptOnRelease(
        assert,
        await measureDragAndRelease('#flex-of-table', 0, 10),
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

    test('dragging to the maximum does not snap back on release when neighbors have wide content', async function (assert) {
      // the neighbors' content is wider than the 150px minimum, so the drag
      // squeezes them below their content width
      await render(
        <template>
          <div {{style width="1000px"}}>
            <HdsAdvancedTable
              id="max-table"
              @columns={{array
                (hash key="a" label="A")
                (hash key="b" label="B")
                (hash key="c" label="C")
              }}
              @model={{array
                (hash
                  a="a1"
                  b="/var/log/boundary_session.log"
                  c="/var/log/boundary_session.log"
                )
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

      const handle = findOrThrow(
        '#max-table .hds-advanced-table__th-resize-handle',
      );

      await triggerEvent(handle, 'pointerdown', {
        clientX: POINTER_DRAG_START_X,
        button: 0,
      });
      await triggerEvent(handle, 'pointermove', {
        clientX: 5000,
        buttons: 1,
      });
      await waitForLayout();

      const duringDrag = [0, 1, 2].map((index) =>
        columnWidth('#max-table', index),
      );

      await triggerEvent(window, 'pointerup', { button: 0 });
      await waitForLayout();

      const afterRelease = [0, 1, 2].map((index) =>
        columnWidth('#max-table', index),
      );

      const summary = `during ${duringDrag.join(', ')}, after ${afterRelease.join(', ')}`;

      assert.ok(
        Math.abs((duringDrag[1] ?? 0) - 150) <= 1 &&
          Math.abs((duringDrag[2] ?? 0) - 150) <= 1,
        `neighbors are squeezed to their minimum during the drag (${summary})`,
      );
      // the flexible tracks may fill a few subpixels the pixel widths left over,
      // but the dragged column must not jump back down
      assert.ok(
        (afterRelease[0] ?? 0) >= (duringDrag[0] ?? 0) - 1,
        `dragged column does not shrink on release (${summary})`,
      );
      [1, 2].forEach((index) => {
        assert.ok(
          Math.abs((afterRelease[index] ?? 0) - 150) <= 1,
          `column ${index} stays at its minimum after release (${summary})`,
        );
      });
    });

    test('only resized flexible columns get the resize minimum, and restoring a column removes it', async function (assert) {
      await render(
        <template>
          <div {{style width="1000px"}}>
            <HdsAdvancedTable
              id="restore-table"
              @columns={{array
                (hash key="a" label="A")
                (hash key="b" label="B")
              }}
              @model={{array (hash a="a1" b="/var/log/boundary_session.log")}}
              @hasResizableColumns={{true}}
            >
              <:body as |B|>
                <B.Tr>
                  <B.Td>{{get B.data "a"}}</B.Td>
                  <B.Td>{{get B.data "b"}}</B.Td>
                </B.Tr>
              </:body>
            </HdsAdvancedTable>
          </div>
        </template>,
      );

      await waitForLayout();

      const grid = findOrThrow('#restore-table .hds-advanced-table');
      const minmaxTrackCount = () =>
        (grid.style.gridTemplateColumns.match(/minmax\(150px,/g) ?? []).length;

      assert.strictEqual(
        minmaxTrackCount(),
        0,
        'untouched columns keep their content-based minimum',
      );

      await simulatePointerDrag(
        findOrThrow('#restore-table .hds-advanced-table__th-resize-handle'),
        5000,
      );
      await waitForLayout();

      assert.strictEqual(
        minmaxTrackCount(),
        2,
        `both resized columns use the resize minimum (${grid.style.gridTemplateColumns})`,
      );
      assert.ok(
        Math.abs(columnWidth('#restore-table', 1) - 150) <= 1,
        `the squeezed column stays at its minimum (actual ${columnWidth('#restore-table', 1)})`,
      );

      await performContextMenuAction(
        findAtOrThrow('#restore-table .hds-advanced-table__th', 1),
        'reset-column-width',
      );
      await waitForLayout();

      assert.strictEqual(
        minmaxTrackCount(),
        1,
        `the restored column no longer uses the resize minimum (${grid.style.gridTemplateColumns})`,
      );
    });

    test('resizing does not shift columns outside the resized pair by sub-pixel amounts', async function (assert) {
      // 1003px makes the 1fr tracks fractional
      await render(
        <template>
          <div {{style width="1003px"}}>
            <HdsAdvancedTable
              id="jitter-table"
              @columns={{array
                (hash key="a" label="A")
                (hash key="b" label="B")
                (hash key="c" label="C")
                (hash key="d" label="D")
              }}
              @model={{array (hash a="a1" b="b1" c="c1" d="d1")}}
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

      await waitForInitialTableLayout('#jitter-table');

      // exact rects, unlike `offsetWidth`, expose sub-pixel movement
      const rects = () =>
        findAll(
          '#jitter-table .hds-advanced-table__thead .hds-advanced-table__th',
        ).map((th) => {
          const { left, width } = th.getBoundingClientRect();

          return { left, width };
        });
      const assertUnchanged = (
        expected: { left: number; width: number }[],
        indexes: number[],
        label: string,
      ) => {
        const actual = rects();

        indexes.forEach((index) => {
          assert.deepEqual(
            actual[index],
            expected[index],
            `${label}: column ${index} did not move`,
          );
        });
      };

      const initial = rects();
      const handle = findAtOrThrow(
        '#jitter-table .hds-advanced-table__th-resize-handle',
        1,
      );

      await triggerEvent(handle, 'pointerdown', {
        clientX: POINTER_DRAG_START_X,
        button: 0,
      });
      await waitForLayout();

      assertUnchanged(initial, [0, 1, 2, 3], 'on pointerdown');

      // fractional coordinates, as reported on high-density displays
      for (const clientX of [100.4, 100.9, 101.3, 102.7]) {
        await triggerEvent(handle, 'pointermove', { clientX, buttons: 1 });
        await waitForLayout();

        assertUnchanged(initial, [0, 3], `at clientX ${clientX}`);
      }

      await triggerEvent(handle, 'pointermove', {
        clientX: POINTER_DRAG_START_X,
        buttons: 1,
      });
      await triggerEvent(window, 'pointerup', { button: 0 });
      await waitForLayout();

      assertUnchanged(initial, [0, 1, 2, 3], 'after releasing at the start');
    });

    test('reversing a drag past the minimum width grows the column immediately', async function (assert) {
      await createResizableTable({});

      const handle = findOrThrow('.hds-advanced-table__th-resize-handle');

      await triggerEvent(handle, 'pointerdown', {
        clientX: POINTER_DRAG_START_X,
        button: 0,
      });
      await triggerEvent(handle, 'pointermove', { clientX: 0, buttons: 1 });
      await waitForLayout();
      await triggerEvent(handle, 'pointermove', { clientX: 10, buttons: 1 });
      await waitForLayout();

      assert.ok(
        columnWidth('#resize-test-table', 0) > 60,
        `column grows right away after reversing (actual ${columnWidth('#resize-test-table', 0)})`,
      );

      await triggerEvent(window, 'pointerup', { button: 0 });
      await waitForLayout();
    });

    test('a column whose content pushed it past its share keeps the dragged widths on release', async function (assert) {
      await render(
        <template>
          <div {{style width="1000px"}}>
            <HdsAdvancedTable
              id="share-table"
              @columns={{array
                (hash key="a" label="A")
                (hash key="b" label="B")
              }}
              @model={{array
                (hash
                  a="a1"
                  b="/var/log/boundary_sessions_2026_11_04_worker_0001_session_0123456789abcdef.log"
                )
              }}
              @hasResizableColumns={{true}}
            >
              <:body as |B|>
                <B.Tr>
                  <B.Td>{{get B.data "a"}}</B.Td>
                  <B.Td>{{get B.data "b"}}</B.Td>
                </B.Tr>
              </:body>
            </HdsAdvancedTable>
          </div>
        </template>,
      );

      await waitForLayout();

      const startWidths = [0, 1].map((index) =>
        columnWidth('#share-table', index),
      );

      assert.ok(
        (startWidths[1] ?? 0) - (startWidths[0] ?? 0) > 100,
        `precondition: the content makes the 1fr columns unequal (${startWidths.join(', ')})`,
      );

      assertWidthsKeptOnRelease(
        assert,
        await measureDragAndRelease('#share-table', 0, 10),
      );
    });

    test('resizing again after the container shrinks moves the columns by the resized amount', async function (assert) {
      const context = new TrackedObject({ width: '1000px' });

      await render(
        <template>
          <div {{style width=context.width}}>
            <HdsAdvancedTable
              id="reshrink-table"
              @columns={{array
                (hash key="a" label="A")
                (hash key="b" label="B")
                (hash key="c" label="C")
              }}
              @model={{array (hash a="a1" b="b1" c="c1")}}
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

      const handle = findOrThrow(
        '#reshrink-table .hds-advanced-table__th-resize-handle',
      );

      // squeeze the other two columns close to their minimum
      await simulatePointerDrag(handle, POINTER_DRAG_START_X + 300);

      // the remaining columns' shares now fall below their minimum, so they
      // are held at it and the first column takes up the slack
      context.width = '600px';
      await settled();
      await waitForLayout();

      const before = [0, 1, 2].map((index) =>
        columnWidth('#reshrink-table', index),
      );

      await focus(handle);
      await triggerKeyEvent(handle, 'keydown', 'ArrowLeft');
      await waitForLayout();

      const after = [0, 1, 2].map((index) =>
        columnWidth('#reshrink-table', index),
      );
      const summary = `before ${before.join(', ')}, after ${after.join(', ')}`;

      assert.ok(
        Math.abs((before[0] ?? 0) - (after[0] ?? 0) - 10) <= 1,
        `the first column shrank by one step (${summary})`,
      );
      assert.ok(
        Math.abs((after[1] ?? 0) - (before[1] ?? 0) - 10) <= 1,
        `its neighbor grew by one step (${summary})`,
      );
      assert.ok(
        Math.abs((after[2] ?? 0) - (before[2] ?? 0)) <= 1,
        `the last column did not move (${summary})`,
      );
    });

    test('a flexible column that starts below its minimum keeps its resized width', async function (assert) {
      await render(
        <template>
          <div {{style width="300px"}}>
            <HdsAdvancedTable
              id="narrow-table"
              @columns={{array
                (hash key="a" label="A" width="200px")
                (hash key="b" label="B")
              }}
              @model={{array (hash a="a1" b="b1")}}
              @hasResizableColumns={{true}}
            >
              <:body as |B|>
                <B.Tr>
                  <B.Td>{{get B.data "a"}}</B.Td>
                  <B.Td>{{get B.data "b"}}</B.Td>
                </B.Tr>
              </:body>
            </HdsAdvancedTable>
          </div>
        </template>,
      );

      await waitForLayout();

      const table = findOrThrow('#narrow-table .hds-advanced-table');
      const startFlexible = columnWidth('#narrow-table', 1);

      assert.ok(
        startFlexible < 140,
        `precondition: the flexible column starts below its 150px minimum (actual ${startFlexible})`,
      );

      await simulatePointerDrag(
        findOrThrow('#narrow-table .hds-advanced-table__th-resize-handle'),
        POINTER_DRAG_START_X - 10,
      );
      await waitForLayout();

      const flexible = columnWidth('#narrow-table', 1);

      assert.ok(
        Math.abs(flexible - (startFlexible + 10)) <= 1,
        `the flexible column grew by the dragged amount instead of jumping to its minimum (start ${startFlexible}, actual ${flexible})`,
      );
      assert.ok(
        table.scrollWidth <= table.clientWidth + 1,
        `the table does not overflow (scrollWidth ${table.scrollWidth}, clientWidth ${table.clientWidth})`,
      );
    });

    test('keyboard resizing scrolls the table to keep the handle visible', async function (assert) {
      await render(
        <template>
          <div {{style width="400px"}}>
            <HdsAdvancedTable
              id="scroll-table"
              @columns={{array
                (hash key="a" label="A" width="300px")
                (hash key="b" label="B" width="300px")
                (hash key="c" label="C" width="300px")
              }}
              @model={{array (hash a="a1" b="b1" c="c1")}}
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

      const table = findOrThrow('#scroll-table .hds-advanced-table');
      const handle = findAtOrThrow(
        '#scroll-table .hds-advanced-table__th-resize-handle',
        1,
      );

      await focus(handle);

      // focusing may scroll on its own, so start from the left edge
      table.scrollLeft = 0;
      await waitForLayout();

      await triggerKeyEvent(handle, 'keydown', 'ArrowRight');
      await waitForLayout();

      const handleRect = handle.getBoundingClientRect();
      const tableRect = table.getBoundingClientRect();

      assert.ok(
        table.scrollLeft > 0,
        `the table scrolled horizontally (scrollLeft ${table.scrollLeft})`,
      );
      assert.ok(
        handleRect.right <= tableRect.right + 1,
        `the handle is within the table's visible area (handle right ${handleRect.right}, table right ${tableRect.right})`,
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

      await waitForInitialTableLayout('#kbd-table');

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

    test('resizing follows the rendered column order after `@columns` is replaced in a different order', async function (assert) {
      const columnA: HdsAdvancedTableColumn = {
        key: 'a',
        label: 'A',
        width: '200px',
        minWidth: '50px',
      };
      const columnB: HdsAdvancedTableColumn = {
        key: 'b',
        label: 'B',
        width: '250px',
        minWidth: '50px',
      };
      const columnC: HdsAdvancedTableColumn = {
        key: 'c',
        label: 'C',
        width: '300px',
        minWidth: '50px',
      };
      const context = new TrackedObject({
        columns: [columnA, columnB, columnC],
      });

      await render(
        <template>
          <div {{style width="1000px"}}>
            <HdsAdvancedTable
              id="replaced-order-table"
              @columns={{context.columns}}
              @model={{array (hash id="1" a="A" b="B" c="C")}}
              @hasResizableColumns={{true}}
              @isSelectable={{true}}
            >
              <:body as |B|>
                <B.Tr @selectionKey={{get B.data "id"}}>
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

      context.columns = [columnC, columnA, columnB];
      await settled();
      await waitForLayout();

      // the first header cell holds the checkboxes
      const headers = ['C', 'A', 'B'].map((label, index) => {
        const th = findAtOrThrow(
          '#replaced-order-table .hds-advanced-table__thead .hds-advanced-table__th',
          index + 1,
        );

        assert
          .dom(th)
          .hasText(
            label,
            `precondition: column ${label} renders at position ${index + 1}`,
          );

        return th;
      });

      await simulatePointerDrag(
        findAtOrThrow(
          '#replaced-order-table .hds-advanced-table__th-resize-handle',
          0,
        ),
        POINTER_DRAG_START_X + 30,
      );

      const [widthC, widthA, widthB] = headers.map((th) => th.offsetWidth);

      assert.ok(
        Math.abs((widthC ?? 0) - 330) <= 1,
        `the dragged column C grows by the drag (got ${widthC}px)`,
      );
      assert.ok(
        Math.abs((widthA ?? 0) - 170) <= 1,
        `its rendered neighbor A gives up the width (got ${widthA}px)`,
      );
      assert.ok(
        Math.abs((widthB ?? 0) - 250) <= 1,
        `column B keeps its width (got ${widthB}px)`,
      );
    });

    test('resized columns keep their widths on release in an overflowing table after its first column is removed', async function (assert) {
      const longText = '/var/log/boundary_session.log';
      const allColumns: HdsAdvancedTableColumn[] = [
        { key: 'a', label: 'A' },
        { key: 'b', label: 'B' },
        { key: 'c', label: 'C' },
        { key: 'd', label: 'D' },
      ];
      const context = new TrackedObject({ columns: allColumns });

      await render(
        <template>
          <div {{style width="400px"}}>
            <HdsAdvancedTable
              id="removed-first-table"
              @columns={{context.columns}}
              @model={{array
                (hash a=longText b=longText c=longText d=longText)
              }}
              @hasResizableColumns={{true}}
            >
              <:body as |B|>
                <B.Tr>
                  {{#each context.columns}}
                    <B.Td>{{longText}}</B.Td>
                  {{/each}}
                </B.Tr>
              </:body>
            </HdsAdvancedTable>
          </div>
        </template>,
      );

      await waitForLayout();

      context.columns = allColumns.slice(1);
      await settled();
      await waitForLayout();

      const table = findOrThrow('#removed-first-table .hds-advanced-table');
      const thead = findOrThrow(
        '#removed-first-table .hds-advanced-table__thead',
      );

      assert.dom('#removed-first-table .hds-advanced-table__th').exists({
        count: 3,
      });
      assert.ok(
        thead.offsetWidth > table.clientWidth,
        `precondition: the columns make the table overflow (columns ${thead.offsetWidth}, clientWidth ${table.clientWidth})`,
      );

      assertWidthsKeptOnRelease(
        assert,
        await measureDragAndRelease('#removed-first-table', 0, 10),
      );
    });

    test('resizing only fixed columns keeps the weights of the flexible columns', async function (assert) {
      const context = new TrackedObject({ width: '700px' });

      await render(
        <template>
          <div {{style width=context.width}}>
            <HdsAdvancedTable
              id="fixed-pair-table"
              @columns={{array
                (hash key="a" label="A" width="200px")
                (hash key="b" label="B" width="200px")
                (hash key="c" label="C")
                (hash key="d" label="D")
              }}
              @model={{array
                (hash a="A" b="B" c="/var/log/boundary_session.log" d="D")
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

      assert.ok(
        columnWidth('#fixed-pair-table', 2) -
          columnWidth('#fixed-pair-table', 3) >
          10,
        `precondition: content makes the flexible columns unequal (c ${columnWidth('#fixed-pair-table', 2)}px, d ${columnWidth('#fixed-pair-table', 3)}px)`,
      );

      await simulatePointerDrag(
        findAtOrThrow(
          '#fixed-pair-table .hds-advanced-table__th-resize-handle',
          0,
        ),
        POINTER_DRAG_START_X + 20,
      );

      context.width = '1400px';
      await settled();
      await waitForLayout();

      const widthC = columnWidth('#fixed-pair-table', 2);
      const widthD = columnWidth('#fixed-pair-table', 3);

      assert.ok(
        Math.abs(widthC - widthD) <= 1,
        `the flexible columns share the extra space equally again (c ${widthC}px, d ${widthD}px)`,
      );
    });
  });
});

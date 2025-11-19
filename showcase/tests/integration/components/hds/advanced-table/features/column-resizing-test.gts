/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { array, hash, get } from '@ember/helper';
import {
  click,
  find,
  focus,
  render,
  settled,
  triggerEvent,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';
import sinon from 'sinon';
import style from 'ember-style-modifier';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableColumn } from '@hashicorp/design-system-components/components/hds/advanced-table/types';

import { setupRenderingTest } from 'showcase/tests/helpers';

function gridValuesAreEqual(
  newGridValues: string[],
  originalGridValues: string[],
) {
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

function getTableGridValues(tableElement: Element | null) {
  if (!tableElement) {
    return [];
  }

  const computedStyle = window.getComputedStyle(tableElement);
  const gridTemplateColumns = computedStyle.getPropertyValue(
    'grid-template-columns',
  );
  const gridValues = gridTemplateColumns
    .split(' ')
    .map((value) => value.trim());

  return gridValues;
}

async function performContextMenuAction(th: Element | null, key: string) {
  const contextMenuToggle = th?.querySelector('.hds-dropdown-toggle-icon');

  if (contextMenuToggle) {
    await click(contextMenuToggle);
    return click(`[data-test-context-option-key="${key}"]`);
  }
}

async function simulateRightPointerDrag(handle: Element | null) {
  if (!handle) return;

  await triggerEvent(handle, 'pointerdown', { clientX: 100, button: 0 });
  await triggerEvent(handle, 'pointermove', { clientX: 130, buttons: 1 });
  await triggerEvent(window, 'pointerup', { button: 0 });
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
  return await render(
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
              {{! @glint-expect-error }}
              <B.Td>{{get B.data "col1"}}</B.Td>
              {{! @glint-expect-error }}
              <B.Td>{{get B.data "col2"}}</B.Td>
            </B.Tr>
          </:body>
        </HdsAdvancedTable></div>
    </template>,
  );
};

module('Integration | Component | hds/advanced-table/index', function (hooks) {
  setupRenderingTest(hooks);

  module('column resizing', function () {
    test('it should allow resizing columns with the resize handle (pointer events)', async function (assert) {
      await createResizableTable({});

      const table = find('.hds-advanced-table');
      const originalGridValues = getTableGridValues(table);

      assert
        .dom('.hds-advanced-table__th-resize-handle')
        .exists(
          { count: 1 },
          'There is one resize handle (not on last column)',
        );

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
      await createResizableTable({});

      const table = find('.hds-advanced-table');
      const originalGridValues = getTableGridValues(table);

      const handle = find('.hds-advanced-table__th-resize-handle');

      if (handle) {
        // Focus and send ArrowRight key
        await focus(handle);
        await triggerKeyEvent(handle, 'keydown', 'ArrowRight');

        let newGridValues = getTableGridValues(table);

        assert.notOk(
          gridValuesAreEqual(originalGridValues, newGridValues),
          'Grid values are not equal after ArrowRight',
        );

        // Send ArrowLeft key
        await triggerKeyEvent(handle, 'keydown', 'ArrowLeft');

        newGridValues = getTableGridValues(table);

        assert.ok(
          gridValuesAreEqual(originalGridValues, newGridValues),
          'Grid values are equal after ArrowLeft',
        );
      }
    });

    test('it should not allow resizing columns below their minimum width (pointer events)', async function (assert) {
      await createResizableTable({});

      const table = find('.hds-advanced-table');
      const originalGridValues = getTableGridValues(table);

      const handle = find('.hds-advanced-table__th-resize-handle');

      if (handle) {
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

        if (firstColumnGridValue) {
          assert.ok(
            parseInt(firstColumnGridValue, 10) >= 60,
            `Column width respects minimum width constraint (actual: ${firstColumnGridValue}, min: 60px)`,
          );
        }
      }
    });

    test('it should not allow resizing columns above their maximum width (pointer events)', async function (assert) {
      await createResizableTable({});

      const table = find('.hds-advanced-table');
      const originalGridValues = getTableGridValues(table);

      const handle = find('.hds-advanced-table__th-resize-handle');

      if (handle) {
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

        if (firstColumnGridValue) {
          assert.ok(
            parseInt(firstColumnGridValue, 10) <= 300,
            `Column width respects maximum width constraint (actual: ${firstColumnGridValue}px, max: 300px)`,
          );
        }
      }
    });

    test('it should not allow resizing columns below their minimum width (keyboard events)', async function (assert) {
      await createResizableTable({});

      const table = find('.hds-advanced-table');
      const originalGridValues = getTableGridValues(table);

      const handle = find('.hds-advanced-table__th-resize-handle');

      if (handle) {
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

        if (firstColumnGridValue) {
          assert.ok(
            parseInt(firstColumnGridValue, 10) >= 60,
            `Column width respects minimum width constraint with keyboard events (actual: ${firstColumnGridValue}, min: 60px)`,
          );
        }
      }
    });

    test('it should not allow resizing columns above their maximum width (keyboard events)', async function (assert) {
      await createResizableTable({});

      const table = find('.hds-advanced-table');
      const originalGridValues = getTableGridValues(table);

      const handle = find('.hds-advanced-table__th-resize-handle');

      if (handle) {
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

        if (firstColumnGridValue) {
          assert.ok(
            parseInt(firstColumnGridValue, 10) <= 300,
            `Column width respects maximum width constraint with keyboard events (actual: ${firstColumnGridValue}px, max: 300px)`,
          );
        }
      }
    });

    test('it should show the context menu when resizing is enabled', async function (assert) {
      await createResizableTable({});

      const th = find('.hds-advanced-table__th'); // find the first header cell

      if (th) {
        assert.ok(
          th.querySelector('.hds-advanced-table__th-context-menu'),
          'context menu exists',
        );

        const contextMenuToggle = th.querySelector('.hds-dropdown-toggle-icon');

        if (contextMenuToggle) {
          await click(contextMenuToggle);

          assert
            .dom('[data-test-context-option-key="reset-column-width"]')
            .exists();
        }
      }
    });

    test('it should resize the column to the initial width when resetting column width', async function (assert) {
      await createResizableTable({});

      const table = find('.hds-advanced-table');
      const originalGridValues = getTableGridValues(table);

      const handle = find('.hds-advanced-table__th-resize-handle');
      const th = handle?.closest('.hds-advanced-table__th');

      await simulateRightPointerDrag(handle);

      let newGridValues = getTableGridValues(table);

      assert.notOk(
        gridValuesAreEqual(originalGridValues, newGridValues),
        'Grid values are not equal after resizing',
      );

      if (th) {
        await performContextMenuAction(th, 'reset-column-width');

        newGridValues = getTableGridValues(table);
        assert.ok(
          gridValuesAreEqual(originalGridValues, newGridValues),
          'Grid values reset to initial state after resetting column width',
        );
      }
    });

    test('it should focus the resize handle when the "resize column" context menu option is clicked', async function (assert) {
      await createResizableTable({});

      const handle = find('.hds-advanced-table__th-resize-handle');
      const th = handle?.closest('.hds-advanced-table__th');

      if (th) {
        await performContextMenuAction(th, 'resize-column');
        assert.ok(
          handle === document.activeElement,
          'Resize handle is focused',
        );
      }
    });

    test('it should call `onColumnResize` when a column is resized by dragging', async function (assert) {
      const onColumnResizeSpy = sinon.spy();
      await createResizableTable({
        onColumnResize: onColumnResizeSpy,
      });

      const handle = find('.hds-advanced-table__th-resize-handle');

      if (handle) {
        await focus(handle);
        await triggerKeyEvent(handle, 'keydown', 'ArrowRight');

        assert.ok(onColumnResizeSpy.calledOnce, 'onColumnResize was called');
      }
    });

    test('it should call `onColumnResize` when a column is resized by keyboard', async function (assert) {
      const onColumnResizeSpy = sinon.spy();
      await createResizableTable({
        onColumnResize: onColumnResizeSpy,
      });

      const handle = find('.hds-advanced-table__th-resize-handle');

      // Simulate pointer drag to the right (increase width)
      await simulateRightPointerDrag(handle);

      assert.ok(onColumnResizeSpy.calledOnce, 'onColumnResize was called');
    });

    test('it should call `onColumnResize` when a column width is reset', async function (assert) {
      const onColumnResizeSpy = sinon.spy((key) => {
        console.log('Column resized', key);
      });

      await createResizableTable({
        onColumnResize: onColumnResizeSpy,
      });

      const handle = find('.hds-advanced-table__th-resize-handle');

      await simulateRightPointerDrag(handle);

      assert.ok(onColumnResizeSpy.calledOnce, 'onColumnResize was called');

      if (handle) {
        await performContextMenuAction(
          handle.closest('.hds-advanced-table__th'),
          'reset-column-width',
        );
        assert.ok(
          onColumnResizeSpy.calledTwice,
          'onColumnResize was called again after resetting column width',
        );
      }
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
                  {{! @glint-expect-error }}
                  <B.Td>{{get B.data "name"}}</B.Td>
                  {{! @glint-expect-error }}
                  <B.Td>{{get B.data "biography"}}</B.Td>
                  {{! @glint-expect-error }}
                  <B.Td>{{get B.data "occupation"}}</B.Td>
                  {{! @glint-expect-error }}
                  <B.Td>{{get B.data "age"}}</B.Td>
                  {{! @glint-expect-error }}
                  <B.Td>{{get B.data "hair"}}</B.Td>
                  {{! @glint-expect-error }}
                  <B.Td>{{get B.data "eyes"}}</B.Td>
                  {{! @glint-expect-error }}
                  <B.Td>{{get B.data "salary"}}</B.Td>
                </B.Tr>
              </:body>
            </HdsAdvancedTable>
          </div>
        </template>,
      );

      const table = find('#data-test-advanced-table');
      const container = find('#resize-test-container');

      if (table && container) {
        const tableAsHTMLElement = table as HTMLElement;
        const containerAsHTMLElement = container as HTMLElement;

        assert.ok(
          tableAsHTMLElement.offsetWidth >= containerAsHTMLElement.offsetWidth,
          'Table width is greater than the container width',
        );

        context.width = '100%';
        await settled();

        assert.ok(
          tableAsHTMLElement.offsetWidth === containerAsHTMLElement.offsetWidth,
          'Table width grows to fit container width',
        );
      }
    });
  });
});

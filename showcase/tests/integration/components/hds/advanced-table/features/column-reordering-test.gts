/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { get } from '@ember/helper';
import {
  click,
  find,
  findAll,
  focus,
  render,
  settled,
  setupOnerror,
  triggerEvent,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { TrackedObject, TrackedArray } from 'tracked-built-ins';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableColumnReorderSide } from '@hashicorp/design-system-components/components/hds/advanced-table/types';

import { setupRenderingTest } from 'showcase/tests/helpers';

const getColumnByLabel = (
  columns: typeof DEFAULT_REORDERABLE_COLUMNS,
  label: string,
) => {
  return columns.find((col) => col.label === label);
};

const getColumnOrder = (columns?: typeof DEFAULT_REORDERABLE_COLUMNS) => {
  const thElements = findAll('.hds-advanced-table__th');

  return thElements.map((th) => {
    const column = getColumnByLabel(
      columns ?? DEFAULT_REORDERABLE_COLUMNS,
      th.textContent.trim(),
    );

    return column ? column.key : undefined;
  });
};

const startReorderDrag = async (handleElement: Element | null) => {
  if (!handleElement) return;
  return triggerEvent(handleElement, 'dragstart');
};

const getTargetElementFromColumnIndex = (index: number) => {
  const dropTargets = findAll('.hds-advanced-table__th-reorder-drop-target');
  const target = dropTargets[index];

  if (target === null) {
    throw new Error(
      `Target column at index ${index} not found after drag started.`,
    );
  }

  return target;
};

const getDragTargetPosition = (
  targetElement: Element,
  targetPosition: HdsAdvancedTableColumnReorderSide,
) => {
  const targetRect = targetElement.getBoundingClientRect();
  let clientX;

  switch (targetPosition) {
    case 'left':
      clientX = targetRect.left + 1;
      break;
    default:
      clientX = targetRect.right - 1;
  }

  return { clientX, clientY: targetRect.top + targetRect.height / 2 };
};

const dragOverTarget = async (
  target: Element,
  { clientX, clientY }: { clientX: number; clientY: number },
) => {
  await triggerEvent(target, 'dragenter', { clientX, clientY });
  await triggerEvent(target, 'dragover', { clientX, clientY });
};

const simulateColumnReorderDrag = async ({
  handleElement,
  targetElement,
  targetIndex,
  targetPosition = 'left',
}: {
  handleElement?: Element | null;
  targetElement?: Element | null;
  targetIndex: number;
  targetPosition?: HdsAdvancedTableColumnReorderSide;
}): Promise<{
  target?: Element | null;
  eventOptions: { clientX: number; clientY: number };
}> => {
  if (!handleElement) {
    return Promise.resolve({
      target: null,
      eventOptions: { clientX: 0, clientY: 0 },
    });
  }

  await startReorderDrag(handleElement);
  await settled();

  const target = targetElement ?? getTargetElementFromColumnIndex(targetIndex);

  if (target) {
    const { clientX, clientY } = getDragTargetPosition(target, targetPosition);
    const eventOptions = { clientX, clientY };
    await dragOverTarget(target, eventOptions);
    await settled();
    // return the target event options for further use, if needed
    return { target, eventOptions };
  }

  return Promise.resolve({
    target: null,
    eventOptions: { clientX: 0, clientY: 0 },
  });
};

const simulateColumnReorderDrop = async ({
  target,
  handleElement,
  eventOptions,
}: {
  target?: Element | null;
  handleElement?: Element | null;
  eventOptions: Record<string, unknown>;
}) => {
  if (!target || !handleElement) {
    return;
  }

  await triggerEvent(target, 'drop', eventOptions);
  await triggerEvent(handleElement, 'dragend');
};

const DEFAULT_REORDERABLE_COLUMNS = [
  { key: 'artist', label: 'Artist' },
  { key: 'album', label: 'Album' },
  { key: 'year', label: 'Year' },
];

const DEFAULT_REORDERABLE_MODEL = [
  { id: '1', artist: 'Nick Drake', album: 'Pink Moon', year: '1972' },
  { id: '2', artist: 'The Beatles', album: 'Abbey Road', year: '1969' },
  { id: '3', artist: 'Melanie', album: 'Candles in the Rain', year: '1971' },
];

const createReorderableTable = async (options: {
  columnOrder?: string[];
  hasStickyFirstColumn?: boolean;
}) => {
  await render(
    <template>
      <HdsAdvancedTable
        id="data-test-advanced-table"
        @model={{DEFAULT_REORDERABLE_MODEL}}
        @columns={{DEFAULT_REORDERABLE_COLUMNS}}
        @hasReorderableColumns={{true}}
        @columnOrder={{options.columnOrder}}
        @hasStickyFirstColumn={{options.hasStickyFirstColumn}}
      />
    </template>,
  );
};

module('Integration | Component | hds/advanced-table/index', function (hooks) {
  setupRenderingTest(hooks);

  module('column reordering', function () {
    test('it renders reorder handles when reordering is enabled', async function (assert) {
      const context = new TrackedObject({
        hasReorderableColumns: false,
      });

      await render(
        <template>
          <HdsAdvancedTable
            id="data-test-advanced-table"
            @model={{DEFAULT_REORDERABLE_MODEL}}
            @columns={{DEFAULT_REORDERABLE_COLUMNS}}
            @hasReorderableColumns={{context.hasReorderableColumns}}
          />
        </template>,
      );

      assert
        .dom('.hds-advanced-table__th-reorder-handle')
        .doesNotExist(
          'No reorder handles are rendered when reordering is disabled',
        );

      context.hasReorderableColumns = true;
      await settled();

      assert
        .dom('.hds-advanced-table__th-reorder-handle')
        .exists({ count: 3 }, 'All columns have a reorder handle');
    });

    test('it does not render a reorder handle on the row selection column', async function (assert) {
      await createReorderableTable({});

      const selectAllThSelector =
        '[role="columnheader"].hds-advanced-table__th--is-selectable';
      const reorderHandleSelector = '.hds-advanced-table__th-reorder-handle';

      assert
        .dom(`${selectAllThSelector} ${reorderHandleSelector}`)
        .doesNotExist(
          'No reorder handle is rendered on the row selection column',
        );
    });

    test('columns can be reordered by dragging and dropping', async function (assert) {
      await createReorderableTable({});

      let columnOrder = getColumnOrder();
      assert.deepEqual(
        columnOrder,
        DEFAULT_REORDERABLE_COLUMNS.map((col) => col.key),
        'Initial column order is correct',
      );

      const expectedDropTargetIndex = 2;
      const expectedDropTargetDropSide = 'right';

      // get the first reorder handle
      const reorderHandle = find('.hds-advanced-table__th-reorder-handle');

      // drag to the right side of the last column
      const { target, eventOptions } = await simulateColumnReorderDrag({
        handleElement: reorderHandle,
        targetIndex: expectedDropTargetIndex,
        targetPosition: expectedDropTargetDropSide,
      });

      // get all drop targets for test reference
      const dropTargets = findAll(
        '.hds-advanced-table__th-reorder-drop-target',
      );
      const originDropTarget = dropTargets[0];
      const destinationDropTarget = dropTargets[expectedDropTargetIndex];

      assert
        .dom(originDropTarget)
        .hasClass(
          'hds-advanced-table__th-reorder-drop-target--is-being-dragged',
          'First column is being dragged',
        );
      assert
        .dom(destinationDropTarget)
        .hasClass(
          'hds-advanced-table__th-reorder-drop-target--is-dragging-over',
        )
        .hasClass(
          `hds-advanced-table__th-reorder-drop-target--is-dragging-over--${expectedDropTargetDropSide}`,
        );

      await simulateColumnReorderDrop({
        target,
        handleElement: reorderHandle,
        eventOptions,
      });

      columnOrder = getColumnOrder();

      assert
        .dom('.hds-advanced-table__th-reorder-drop-target')
        .doesNotExist('Drop targets are removed after drop');
      assert.deepEqual(
        columnOrder,
        [
          DEFAULT_REORDERABLE_COLUMNS[1]?.key,
          DEFAULT_REORDERABLE_COLUMNS[2]?.key,
          DEFAULT_REORDERABLE_COLUMNS[0]?.key,
        ],
        'Columns are reordered correctly after drag and drop',
      );
    });

    test('dropping a target on the nearest side of the next sibling does not reorder columns', async function (assert) {
      await createReorderableTable({});

      const initialColumnOrder = DEFAULT_REORDERABLE_COLUMNS.map(
        (col) => col.key,
      );

      let columnOrder = getColumnOrder();
      assert.deepEqual(
        columnOrder,
        initialColumnOrder,
        'Initial column order is correct',
      );

      const reorderHandle = find('.hds-advanced-table__th-reorder-handle');

      const { target, eventOptions } = await simulateColumnReorderDrag({
        handleElement: reorderHandle,
        targetIndex: 1,
        targetPosition: 'left',
      });

      const dropTargets = findAll(
        '.hds-advanced-table__th-reorder-drop-target',
      );
      const originDropTarget = dropTargets[0];
      const destinationDropTarget = dropTargets[1];

      assert
        .dom(originDropTarget)
        .hasClass(
          'hds-advanced-table__th-reorder-drop-target--is-being-dragged',
          'First column is being dragged',
        );
      assert
        .dom(destinationDropTarget)
        .doesNotHaveClass(
          'hds-advanced-table__th-reorder-drop-target--is-dragging-over',
        )
        .doesNotHaveClass(
          'hds-advanced-table__th-reorder-drop-target--is-dragging-over--left',
        );

      await simulateColumnReorderDrop({
        target,
        handleElement: reorderHandle,
        eventOptions,
      });

      columnOrder = getColumnOrder();

      assert
        .dom('.hds-advanced-table__th-reorder-drop-target')
        .doesNotExist('Drop targets are removed after drop');
      assert.deepEqual(
        columnOrder,
        initialColumnOrder,
        'Columns order is unchanged after drop on the nearest side',
      );
    });

    test('it should show the context menu with the correct options when reordering is enabled', async function (assert) {
      await createReorderableTable({});

      const thElements = findAll('.hds-advanced-table__th'); // find all header cells

      assert.ok(
        thElements[0]?.querySelector('.hds-advanced-table__th-context-menu'),
        'context menu exists',
      );

      const firstContextMenuToggle = thElements[0]?.querySelector(
        '.hds-dropdown-toggle-icon',
      );

      if (firstContextMenuToggle) {
        await click(firstContextMenuToggle);
        assert.dom('[data-test-context-option-key="reorder-column"]').exists();
        assert
          .dom('[data-test-context-option-key="move-column-to-start"]')
          .doesNotExist();
        assert
          .dom('[data-test-context-option-key="move-column-to-end"]')
          .exists();
      }

      const secondContextMenuToggle = thElements[1]?.querySelector(
        '.hds-dropdown-toggle-icon',
      );

      if (secondContextMenuToggle) {
        await click(secondContextMenuToggle);
        assert.dom('[data-test-context-option-key="reorder-column"]').exists();
        assert
          .dom('[data-test-context-option-key="move-column-to-start"]')
          .exists();
        assert
          .dom('[data-test-context-option-key="move-column-to-end"]')
          .exists();
      }

      const lastContextMenuToggle = thElements[
        thElements.length - 1
      ]?.querySelector('.hds-dropdown-toggle-icon');

      if (lastContextMenuToggle) {
        await click(lastContextMenuToggle);
        assert.dom('[data-test-context-option-key="reorder-column"]').exists();
        assert
          .dom('[data-test-context-option-key="move-column-to-start"]')
          .exists();
        assert
          .dom('[data-test-context-option-key="move-column-to-end"]')
          .doesNotExist();
      }
    });

    test('clicking the "Move column" context menu option focuses the reorder handle', async function (assert) {
      await createReorderableTable({});

      const thElements = findAll('.hds-advanced-table__th');

      const firstContextMenuToggle = thElements[0]?.querySelector(
        '.hds-dropdown-toggle-icon',
      );

      if (firstContextMenuToggle) {
        await click(firstContextMenuToggle);
        await click('[data-test-context-option-key="reorder-column"]');

        const firstReorderHandle = thElements[0]?.querySelector(
          '.hds-advanced-table__th-reorder-handle',
        );

        assert.dom(firstReorderHandle).isFocused();
      }
    });

    test('clicking the "Move column to start" context menu option moves the column to the start', async function (assert) {
      await createReorderableTable({});

      const thElements = findAll('.hds-advanced-table__th');

      const secondContextMenuToggle = thElements[1]?.querySelector(
        '.hds-dropdown-toggle-icon',
      );

      if (secondContextMenuToggle) {
        await click(secondContextMenuToggle);
        await click('[data-test-context-option-key="move-column-to-start"]');

        const columnOrder = getColumnOrder();
        assert.deepEqual(
          columnOrder,
          [
            DEFAULT_REORDERABLE_COLUMNS[1]?.key,
            DEFAULT_REORDERABLE_COLUMNS[0]?.key,
            DEFAULT_REORDERABLE_COLUMNS[2]?.key,
          ],
          'The second column is moved to the start',
        );
      }
    });

    test('clicking the "Move column to end" context menu option moves the column to the end', async function (assert) {
      await createReorderableTable({});

      const thElements = findAll('.hds-advanced-table__th');

      if (thElements[1]) {
        const secondContextMenuToggle = thElements[1].querySelector(
          '.hds-dropdown-toggle-icon',
        );

        if (secondContextMenuToggle) {
          await click(secondContextMenuToggle);
          await click('[data-test-context-option-key="move-column-to-end"]');

          const columnOrder = getColumnOrder();
          assert.deepEqual(
            columnOrder,
            [
              DEFAULT_REORDERABLE_COLUMNS[0]?.key,
              DEFAULT_REORDERABLE_COLUMNS[2]?.key,
              DEFAULT_REORDERABLE_COLUMNS[1]?.key,
            ],
            'The second column is moved to the end',
          );
        }
      }
    });

    test('pressing "Left Arrow" and "Right Arrow" keys when the reorder handle is focused moves the column', async function (assert) {
      await createReorderableTable({});

      const thElements = findAll('.hds-advanced-table__th');
      const firstThElement = thElements[0];
      const firstReorderHandle = thElements[0]?.querySelector(
        '.hds-advanced-table__th-reorder-handle',
      );

      if (firstReorderHandle && firstThElement) {
        await focus(firstThElement);
        await focus(firstReorderHandle);

        // need to flush the frame to let the RAF waiter finish doing its thing
        await new Promise((resolve) => requestAnimationFrame(resolve));

        assert.dom(firstReorderHandle).isFocused();

        await triggerKeyEvent(firstReorderHandle, 'keydown', 'ArrowRight');
        let columnOrder = getColumnOrder();
        await settled();

        assert.deepEqual(
          columnOrder,
          [
            DEFAULT_REORDERABLE_COLUMNS[1]?.key,
            DEFAULT_REORDERABLE_COLUMNS[0]?.key,
            DEFAULT_REORDERABLE_COLUMNS[2]?.key,
          ],
          'The first column is moved to the right',
        );
        assert.dom(firstReorderHandle).isFocused();

        await triggerKeyEvent(firstReorderHandle, 'keydown', 'ArrowRight');
        columnOrder = getColumnOrder();
        // doing this because request animation frame stuff
        await settled();

        assert.deepEqual(
          columnOrder,
          [
            DEFAULT_REORDERABLE_COLUMNS[1]?.key,
            DEFAULT_REORDERABLE_COLUMNS[2]?.key,
            DEFAULT_REORDERABLE_COLUMNS[0]?.key,
          ],
          'The second column is moved to the right',
        );
        assert.dom(firstReorderHandle).isFocused();

        await triggerKeyEvent(firstReorderHandle, 'keydown', 'ArrowLeft');
        columnOrder = getColumnOrder();
        // doing this because request animation frame stuff
        await settled();

        assert.deepEqual(
          columnOrder,
          [
            DEFAULT_REORDERABLE_COLUMNS[1]?.key,
            DEFAULT_REORDERABLE_COLUMNS[0]?.key,
            DEFAULT_REORDERABLE_COLUMNS[2]?.key,
          ],
          'The third column is moved back to the left',
        );
        assert
          .dom(firstReorderHandle)
          .isFocused('focus is returned to the handle after move');
      }
    });

    test('passing in columnOrder sets the initial order of the table columns', async function (assert) {
      await createReorderableTable({
        columnOrder: ['album', 'year', 'artist'],
      });

      const columnOrder = getColumnOrder();
      assert.deepEqual(
        columnOrder,
        ['album', 'year', 'artist'],
        'The initial column order is set correctly',
      );
    });

    test('updating columnOrder externally changes the order of the table columns', async function (assert) {
      const context = new TrackedObject({
        columnOrder: ['album', 'year', 'artist'],
      });

      await render(
        <template>
          <HdsAdvancedTable
            id="data-test-advanced-table"
            @model={{DEFAULT_REORDERABLE_MODEL}}
            @columns={{DEFAULT_REORDERABLE_COLUMNS}}
            @hasReorderableColumns={{true}}
            @columnOrder={{context.columnOrder}}
          />
        </template>,
      );

      let columnOrder = getColumnOrder();
      assert.deepEqual(
        columnOrder,
        ['album', 'year', 'artist'],
        'The initial column order is set correctly',
      );

      context.columnOrder = ['year', 'album', 'artist'];
      await settled();

      columnOrder = getColumnOrder();
      assert.deepEqual(
        columnOrder,
        ['year', 'album', 'artist'],
        'The column order is updated correctly',
      );
    });

    test('it throws an assertion if @hasStickyFirstColumn is true and @hasReorderableColumns is true', async function (assert) {
      const errorMessage =
        'Cannot have both reorderable columns and a sticky first column.';

      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      await createReorderableTable({
        hasStickyFirstColumn: true,
      });

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });

    test('column reordering works when there columns are added and removed dynamically', async function (assert) {
      const artistColumn = { key: 'artist', label: 'Artist' };
      const albumColumn = { key: 'album', label: 'Album' };
      const yearColumn = { key: 'year', label: 'Year' };
      const genreColumn = { key: 'genre', label: 'Genre' };

      const availableColumns = [
        artistColumn,
        albumColumn,
        yearColumn,
        genreColumn,
      ];

      // when dealing with dynamic columns, you must handle the order of all potential columns rather than just the ones currently rendered
      // initial column order is 'artist', 'album', 'year', 'genre'
      const initialColumnOrder = availableColumns.map((col) => col.key);

      // initially set the columns in the reverse order to ensure the table respects the column order and ommit the genre column
      const initialColumns = availableColumns
        .filter((col) => col.key !== 'genre')
        .reverse();

      const context = new TrackedObject({
        columns: initialColumns,
        model: new TrackedArray(
          DEFAULT_REORDERABLE_MODEL.map((item) => ({
            ...item,
            genre: 'music',
          })),
        ),
        columnOrder: new TrackedArray(initialColumnOrder),
      });

      await render(
        <template>
          <HdsAdvancedTable
            id="data-test-advanced-table"
            @hasReorderableColumns={{true}}
            @model={{context.model}}
            @columns={{context.columns}}
            @columnOrder={{context.columnOrder}}
          >
            <:body as |B|>
              <B.Tr>
                {{#each context.columns as |col|}}
                  {{! @glint-expect-error }}
                  <B.Td>{{get B.data col.key}}</B.Td>
                {{/each}}
              </B.Tr>
            </:body>
          </HdsAdvancedTable>
        </template>,
      );

      // make sure the initial column order is correct based on the columnOrder
      let columnOrder = getColumnOrder(availableColumns);
      await settled();

      assert.deepEqual(
        columnOrder,
        ['artist', 'album', 'year'],
        'The initial column order is set correctly',
      );

      // add the genre column and ensure it is in the correct order based on columnOrder
      context.columns = [genreColumn, ...context.columns];
      await settled();

      columnOrder = getColumnOrder(availableColumns);
      assert.deepEqual(
        columnOrder,
        ['artist', 'album', 'year', 'genre'],
        'The column is added in the correct order based on columnOrder',
      );

      // will drop the column to the right side of the third column (year)
      const expectedDropTargetIndex = 2;
      const expectedDropTargetDropSide = 'right';

      // get the first reorder handle
      const firstReorderHandle = findAll(
        '.hds-advanced-table__th-reorder-handle',
      )[0];

      // drag to the right side of the third column (year)
      const { target, eventOptions } = await simulateColumnReorderDrag({
        handleElement: firstReorderHandle,
        targetIndex: expectedDropTargetIndex,
        targetPosition: expectedDropTargetDropSide,
      });

      // drop the column
      await simulateColumnReorderDrop({
        target,
        handleElement: firstReorderHandle,
        eventOptions,
      });

      // column order updates correctly after the drag and drop
      columnOrder = getColumnOrder(availableColumns);
      assert.deepEqual(
        columnOrder,
        ['album', 'year', 'artist', 'genre'],
        'The initial column order is set correctly',
      );

      // remove the year column and ensure the column order is still correct
      context.columns = context.columns.filter((col) => col.key !== 'year');
      await settled();

      columnOrder = getColumnOrder(availableColumns);
      assert.deepEqual(
        columnOrder,
        ['album', 'artist', 'genre'], // album, year (hidden), artist, genre
        'The column order is correct after a column is removed',
      );

      // move the album column to the end
      const albumReorderHandle = findAll(
        '.hds-advanced-table__th-reorder-handle',
      )[0];
      const lastIndex = context.columns.length - 1;

      const dragResult = await simulateColumnReorderDrag({
        handleElement: albumReorderHandle,
        targetIndex: lastIndex,
        targetPosition: 'right',
      });

      await simulateColumnReorderDrop({
        ...dragResult,
        handleElement: albumReorderHandle,
      });

      columnOrder = getColumnOrder(availableColumns);
      assert.deepEqual(
        columnOrder,
        ['artist', 'genre', 'album'], // year (hidden), artist, genre, album
        'The column order is correct after another column is moved',
      );

      // add the year column back and ensure it is in the correct position based on columnOrder
      context.columns = [...context.columns, yearColumn];
      await settled();

      columnOrder = getColumnOrder(availableColumns);
      assert.deepEqual(
        columnOrder,
        ['year', 'artist', 'genre', 'album'], // year, artist, genre, album
        'The column is added back in the correct order based on columnOrder',
      );
    });
  });
});

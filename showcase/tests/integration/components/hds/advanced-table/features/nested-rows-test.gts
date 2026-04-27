/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import {
  click,
  findAll,
  focus,
  render,
  setupOnerror,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { get } from '@ember/helper';
import type { Target } from '@ember/test-helpers';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

const DEFAULT_NESTED_MODEL = [
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
];

const DEFAULT_NESTED_COLUMNS = [
  { key: 'name', label: 'Name', isExpandable: true },
  { key: 'status', label: 'Status' },
  { key: 'description', label: 'Description' },
];

const createNestedTable = async (options: {
  hasReorderableColumns?: boolean;
  isStriped?: boolean;
  hasResizableColumns?: boolean;
  hasStickyFirstColumn?: boolean;
  isSelectable?: boolean;
  isSortable?: boolean;
  model?: Record<string, unknown>[];
}) => {
  const columns = DEFAULT_NESTED_COLUMNS.map((col) => {
    if (options.isSortable) {
      return { ...col, isSortable: true };
    }
    return { ...col };
  });

  const model = options.model ?? DEFAULT_NESTED_MODEL;

  return await render(
    <template>
      <HdsAdvancedTable
        @model={{model}}
        @columns={{columns}}
        @hasReorderableColumns={{options.hasReorderableColumns}}
        @isStriped={{options.isStriped}}
        @hasResizableColumns={{options.hasResizableColumns}}
        @hasStickyFirstColumn={{options.hasStickyFirstColumn}}
        @isSelectable={{options.isSelectable}}
        id="data-test-nested-advanced-table"
      >
        <:body as |B|>
          {{! @glint-expect-error }}
          <B.Tr @selectionKey={{get B.data "id"}}>
            {{! @glint-expect-error }}
            <B.Th>{{get B.data "name"}}</B.Th>
            {{! @glint-expect-error }}
            <B.Td>{{get B.data "status"}}</B.Td>
            {{! @glint-expect-error }}
            <B.Td>{{get B.data "description"}}</B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>
    </template>,
  );
};

module('Integration | Component | hds/advanced-table/index', function (hooks) {
  setupRenderingTest(hooks);

  module('nested rows', function () {
    test('it throws an assertion if @hasReorderableColumns and has nested rows', async function (assert) {
      const errorMessage =
        'Cannot have reorderable columns if there are nested rows.';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      await createNestedTable({
        hasReorderableColumns: true,
      });

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });

    test('it throws an assertion if @isStriped and has nested rows', async function (assert) {
      const errorMessage =
        '@isStriped must not be true if there are nested rows.';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      await createNestedTable({
        isStriped: true,
      });

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });

    test('it throws an assertion if @hasResizableColumns and has nested rows', async function (assert) {
      const errorMessage =
        'Cannot have resizable columns if there are nested rows.';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      await createNestedTable({
        hasResizableColumns: true,
      });

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });

    test('it throws an assertion if there are sortable columns and has nested rows', async function (assert) {
      const errorMessage =
        'Cannot have sortable columns if there are nested rows. Sortable columns are Name,Status,Description';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      await createNestedTable({
        isSortable: true,
      });

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });

    test('it throws an assertion if it has `@hasStickyFirstColumn` and has nested rows', async function (assert) {
      const errorMessage =
        'Cannot have a sticky first column if there are nested rows.';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      await createNestedTable({
        hasStickyFirstColumn: true,
      });

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });

    test('it throws an assertion if @isSelectable and has nested rows', async function (assert) {
      const errorMessage =
        '@isSelectable must not be true if there are nested rows.';
      assert.expect(2);
      setupOnerror(function (error) {
        assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
      });

      await createNestedTable({
        isSelectable: true,
      });

      assert.throws(function () {
        throw new Error(errorMessage);
      });
    });

    const expandRowButtonSelector =
      '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__th[role="rowheader"] .hds-advanced-table__th-button--expand';

    test('it renders a nested table when the model has rows with children key', async function (assert) {
      await createNestedTable({});
      assert.dom(expandRowButtonSelector).exists({ count: 3 });
      assert
        .dom(
          '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr',
        )
        .exists({ count: 6 });
    });

    test('it renders children rows when click the expand toggle button', async function (assert) {
      await createNestedTable({});

      const rowToggles = findAll(expandRowButtonSelector);

      assert
        .dom(
          '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr.hds-advanced-table__tr--hidden',
        )
        .exists({ count: 4 });

      if (rowToggles[0]) {
        await click(rowToggles[0]);

        assert
          .dom(
            '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr.hds-advanced-table__tr--hidden',
          )
          .exists({ count: 2 });
      }

      if (rowToggles[1]) {
        await click(rowToggles[1]);

        assert
          .dom(
            '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr.hds-advanced-table__tr--hidden',
          )
          .exists({ count: 1 });
      }
    });

    test('it renders expanded children rows when pass isOpen in the model', async function (assert) {
      const model = [
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
      ];

      await createNestedTable({ model });

      assert.dom(expandRowButtonSelector).exists({ count: 3 });
      assert
        .dom(
          '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr',
        )
        .exists({ count: 6 });
    });

    test('it renders an expand all button when pass isExpandable to the columns', async function (assert) {
      const model = [
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
      ];

      await createNestedTable({ model });

      const expandAllButton = document.querySelector(
        '#data-test-nested-advanced-table .hds-advanced-table__thead .hds-advanced-table__th .hds-advanced-table__th-button--expand',
      );

      if (expandAllButton) {
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
      }
    });

    test('the expand all button state updates when expand buttons are clicked', async function (assert) {
      await createNestedTable({});

      const rowToggles = findAll(expandRowButtonSelector);
      const expandAllButton = document.querySelector(
        '#data-test-nested-advanced-table .hds-advanced-table__thead .hds-advanced-table__th .hds-advanced-table__th-button--expand',
      );

      assert.dom(expandAllButton).hasAria('expanded', 'false');

      for (let i = 0; i < rowToggles.length; i++) {
        await click(rowToggles[i] as Target);

        if (i < rowToggles.length - 1) {
          assert.dom(expandAllButton).hasAria('expanded', 'false');
        }
      }

      assert.dom(expandAllButton).hasAria('expanded', 'true');
    });

    test('it keeps grid keyboard navigation working when nested rows are expanded and collapsed', async function (assert) {
      await createNestedTable({});

      const visibleRowSelector =
        '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr:not(.hds-advanced-table__tr--hidden)';
      const visibleRowHeaderSelector =
        '#data-test-nested-advanced-table .hds-advanced-table__tbody .hds-advanced-table__tr:not(.hds-advanced-table__tr--hidden) .hds-advanced-table__th[role="rowheader"]';

      const getActiveRow = () => {
        return document
          .querySelector('[data-active-item]')
          ?.closest('.hds-advanced-table__tr');
      };

      const getRowHeaderText = (row: Element | undefined | null) => {
        return row
          ?.querySelector('.hds-advanced-table__th[role="rowheader"]')
          ?.textContent?.trim();
      };

      const visibleRowsBeforeExpand = findAll(visibleRowSelector);
      const visibleRowHeadersBeforeExpand = findAll(visibleRowHeaderSelector);
      const firstVisibleRowHeader = visibleRowHeadersBeforeExpand[0];
      const secondVisibleRowBeforeExpand = visibleRowsBeforeExpand[1];

      if (firstVisibleRowHeader && secondVisibleRowBeforeExpand) {
        await focus(firstVisibleRowHeader);
        await triggerKeyEvent(firstVisibleRowHeader, 'keydown', 'ArrowDown');

        assert.strictEqual(
          getRowHeaderText(getActiveRow()),
          getRowHeaderText(secondVisibleRowBeforeExpand),
          'ArrowDown moves to next visible row before expansion',
        );
      }

      const expandToggles = findAll(expandRowButtonSelector);
      const firstExpandToggle = expandToggles[0];

      if (firstExpandToggle) {
        await click(firstExpandToggle);
      }

      const visibleRowsAfterExpand = findAll(visibleRowSelector);
      const visibleRowHeadersAfterExpand = findAll(visibleRowHeaderSelector);
      const firstVisibleRowHeaderAfterExpand = visibleRowHeadersAfterExpand[0];
      const secondVisibleRowAfterExpand = visibleRowsAfterExpand[1];
      const thirdVisibleRowAfterExpand = visibleRowsAfterExpand[2];

      if (
        firstVisibleRowHeaderAfterExpand &&
        secondVisibleRowAfterExpand &&
        thirdVisibleRowAfterExpand
      ) {
        await focus(firstVisibleRowHeaderAfterExpand);
        await triggerKeyEvent(
          firstVisibleRowHeaderAfterExpand,
          'keydown',
          'ArrowDown',
        );

        assert.strictEqual(
          getRowHeaderText(getActiveRow()),
          getRowHeaderText(secondVisibleRowAfterExpand),
          'ArrowDown moves to first child row after expansion',
        );

        const activeRowAfterFirstArrowDown = getActiveRow();

        if (activeRowAfterFirstArrowDown) {
          await triggerKeyEvent(
            activeRowAfterFirstArrowDown,
            'keydown',
            'ArrowDown',
          );
        }

        assert.strictEqual(
          getRowHeaderText(getActiveRow()),
          getRowHeaderText(thirdVisibleRowAfterExpand),
          'ArrowDown continues through newly visible rows after expansion',
        );
      }

      const expandTogglesAfterExpand = findAll(expandRowButtonSelector);
      const firstExpandToggleAfterExpand = expandTogglesAfterExpand[0];

      if (firstExpandToggleAfterExpand) {
        await click(firstExpandToggleAfterExpand);
      }

      const visibleRowsAfterCollapse = findAll(visibleRowSelector);
      const visibleRowHeadersAfterCollapse = findAll(visibleRowHeaderSelector);
      const firstVisibleRowHeaderAfterCollapse =
        visibleRowHeadersAfterCollapse[0];
      const secondVisibleRowAfterCollapse = visibleRowsAfterCollapse[1];
      const thirdVisibleRowAfterCollapse = visibleRowsAfterCollapse[2];

      if (
        firstVisibleRowHeaderAfterCollapse &&
        secondVisibleRowAfterCollapse &&
        thirdVisibleRowAfterCollapse
      ) {
        await focus(firstVisibleRowHeaderAfterCollapse);
        await triggerKeyEvent(
          firstVisibleRowHeaderAfterCollapse,
          'keydown',
          'ArrowDown',
        );

        assert.strictEqual(
          getRowHeaderText(getActiveRow()),
          getRowHeaderText(secondVisibleRowAfterCollapse),
          'ArrowDown moves to next visible parent row after collapse',
        );

        const activeRowAfterCollapseFirstArrowDown = getActiveRow();

        if (activeRowAfterCollapseFirstArrowDown) {
          await triggerKeyEvent(
            activeRowAfterCollapseFirstArrowDown,
            'keydown',
            'ArrowDown',
          );
        }

        assert.strictEqual(
          getRowHeaderText(getActiveRow()),
          getRowHeaderText(thirdVisibleRowAfterCollapse),
          'ArrowDown skips collapsed descendants and continues to next visible row',
        );
      }
    });
  });
});

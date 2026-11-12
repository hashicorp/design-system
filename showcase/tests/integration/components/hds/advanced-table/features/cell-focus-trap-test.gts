/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { get } from '@ember/helper';
import {
  click,
  find,
  focus,
  render,
  triggerKeyEvent,
} from '@ember/test-helpers';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

const MODEL = [{ id: '1', artist: 'Nick Drake' }];
const COLUMNS = [{ key: 'artist', label: 'Artist', isSortable: true }];

// both cell types trap focus the same way: the header cell has the sort button,
// the body cell a button of its own
const CELLS = [
  { name: 'Th', selector: '.hds-advanced-table__th' },
  { name: 'Td', selector: '.hds-advanced-table__td' },
];

// focus-trap returns focus in a `setTimeout`, which `settled()` doesn't wait for
const waitForReturnFocus = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

const renderTable = async () => {
  await render(
    <template>
      <HdsAdvancedTable @model={{MODEL}} @columns={{COLUMNS}}>
        <:body as |B|>
          <B.Tr>
            <B.Td>
              <button type="button">Edit {{get B.data "artist"}}</button>
            </B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>
      <input id="outside-input" aria-label="Outside input" />
      <button id="outside-button" type="button">
        <span id="outside-button-label">Outside button</span>
      </button>
      <p id="outside-text">Outside text</p>
    </template>,
  );
};

// focuses the cell and presses Enter, which traps focus on its first button
const trapFocusInCell = async (selector: string) => {
  const cell = find(selector) as HTMLElement;
  const button = cell.querySelector('button') as HTMLElement;

  await focus(cell);
  await triggerKeyEvent(cell, 'keydown', 'Enter');

  return { cell, button };
};

module('Integration | Component | hds/advanced-table/index', function (hooks) {
  setupRenderingTest(hooks);

  for (const { name, selector } of CELLS) {
    test(`${name}: clicking inside a focusable element outside the cell leaves focus on that element`, async function (assert) {
      await renderTable();
      const { cell } = await trapFocusInCell(selector);

      // pressing the label focuses the button in the same task, before
      // focus-trap returns focus. `click()` only focuses the target itself, and
      // `triggerEvent` waits in between, so dispatch both here
      find('#outside-button-label')?.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, cancelable: true }),
      );
      (find('#outside-button') as HTMLElement).focus();
      await waitForReturnFocus();

      assert.dom('#outside-button').isFocused();
      assert.dom(cell).isNotFocused();
    });

    test(`${name}: clicking a focusable element outside the cell leaves focus on it`, async function (assert) {
      await renderTable();
      const { cell, button } = await trapFocusInCell(selector);
      assert.dom(button).isFocused();

      await click('#outside-input');
      await waitForReturnFocus();

      assert.dom('#outside-input').isFocused();
      assert.dom(cell).hasAttribute('tabindex', '0');
      assert.dom(button).hasAttribute('tabindex', '-1');
    });

    test(`${name}: clicking a non-focusable element outside the cell returns focus to the cell`, async function (assert) {
      await renderTable();
      const { cell, button } = await trapFocusInCell(selector);
      assert.dom(button).isFocused();

      await click('#outside-text');
      await waitForReturnFocus();

      assert.dom(cell).isFocused();
      assert.dom(button).hasAttribute('tabindex', '-1');
    });

    test(`${name}: pressing Escape returns focus to the cell`, async function (assert) {
      await renderTable();
      const { cell, button } = await trapFocusInCell(selector);
      assert.dom(button).isFocused();

      await triggerKeyEvent(button, 'keydown', 'Escape');
      await waitForReturnFocus();

      assert.dom(cell).isFocused();
      assert.dom(button).hasAttribute('tabindex', '-1');
    });
  }
});

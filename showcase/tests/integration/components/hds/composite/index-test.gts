/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, focus, settled, triggerKeyEvent } from '@ember/test-helpers';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { TrackedObject } from 'tracked-built-ins';

import {
  HdsButton,
  HdsComposite,
} from '@hashicorp/design-system-components/components';

module('Integration | Component | hds/composite/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it sets the first enabled item as active by default', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <HdsComposite as |composite|>
          <div {{composite.composite}}>
            <HdsButton {{composite.item}} id="item-1">Item 1</HdsButton>
            <HdsButton {{composite.item}} id="item-2">Item 2</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    assert.dom('[data-active-item]').hasAttribute('id', 'item-1');
    assert.dom('#item-1').hasAttribute('tabindex', '0');
    assert.dom('#item-2').hasAttribute('tabindex', '-1');
  });

  test('it sets aria-disabled on disabled items', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <HdsComposite as |composite|>
          <div {{composite.composite}}>
            <HdsButton {{composite.item disabled=true}} id="item-1">Item 1</HdsButton>
            <HdsButton {{composite.item}} id="item-2">Item 2</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    assert.dom('[data-active-item]').hasAttribute('id', 'item-2');
    assert.dom('#item-1').hasAttribute('aria-disabled', 'true');
    assert.dom('#item-2').doesNotHaveAttribute('aria-disabled');
  });

  test('it moves focus with arrow keys (horizontal)', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |composite|>
          <div {{composite.composite}} id="composite-root">
            <HdsButton {{composite.item}} id="item-1">Item 1</HdsButton>
            <HdsButton {{composite.item}} id="item-2">Item 2</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#item-1');
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowRight');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-2');

    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowLeft');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-1');
  });

  test('it moves focus with arrow keys (vertical)', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <HdsComposite @orientation="vertical" as |composite|>
          <div {{composite.composite}} id="composite-root">
            <HdsButton {{composite.item}} id="item-1">Item 1</HdsButton>
            <HdsButton {{composite.item}} id="item-2">Item 2</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#item-1');
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowDown');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-2');

    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowUp');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-1');
  });

  test('it wraps focus if @loop is true', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <HdsComposite @orientation="horizontal" @loop={{true}} as |composite|>
          <div {{composite.composite}} id="composite-root">
            <HdsButton {{composite.item}} id="item-1">Item 1</HdsButton>
            <HdsButton {{composite.item}} id="item-2">Item 2</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#item-2');
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowRight');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-1');

    await focus('#item-1');
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowLeft');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-2');
  });

  test('it loops only horizontally in a 2D grid when @loop="horizontal"', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <HdsComposite @loop="horizontal" as |c|>
          <div role="grid" {{c.composite}} id="composite-grid">
            <div role="row" {{c.group}}>
              <HdsButton {{c.item}} id="A1">A1</HdsButton>
              <HdsButton {{c.item}} id="A2">A2</HdsButton>
            </div>
            <div role="row" {{c.group}}>
              <HdsButton {{c.item}} id="B1">B1</HdsButton>
              <HdsButton {{c.item}} id="B2">B2</HdsButton>
            </div>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#A2');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowRight');
    assert.dom('[data-active-item]').hasAttribute('id', 'A1');

    await focus('#B1');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowLeft');
    assert.dom('[data-active-item]').hasAttribute('id', 'B2');

    // should not loop vertically
    await focus('#B1');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowDown');
    assert.dom('[data-active-item]').hasAttribute('id', 'B1');
  });

  test('it loops only vertically in a 2D grid when @loop="vertical"', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <HdsComposite @loop="vertical" as |c|>
          <div role="grid" {{c.composite}} id="composite-grid">
            <div role="row" {{c.group}}>
              <HdsButton {{c.item}} id="A1">A1</HdsButton>
              <HdsButton {{c.item}} id="A2">A2</HdsButton>
            </div>
            <div role="row" {{c.group}}>
              <HdsButton {{c.item}} id="B1">B1</HdsButton>
              <HdsButton {{c.item}} id="B2">B2</HdsButton>
            </div>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#B1');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowDown');
    assert.dom('[data-active-item]').hasAttribute('id', 'A1');

    await focus('#A2');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowUp');
    assert.dom('[data-active-item]').hasAttribute('id', 'B2');

    // should not loop horizontally
    await focus('#A2');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowRight');
    assert.dom('[data-active-item]').hasAttribute('id', 'A2');
  });

  test('it wraps to the next/prev row in a 2D grid when @wrap="horizontal"', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <HdsComposite @wrap="horizontal" as |c|>
          <div role="grid" {{c.composite}} id="composite-grid">
            <div role="row" {{c.group}}>
              <HdsButton {{c.item}} id="A1">A1</HdsButton>
              <HdsButton {{c.item}} id="A2">A2</HdsButton>
            </div>
            <div role="row" {{c.group}}>
              <HdsButton {{c.item}} id="B1">B1</HdsButton>
              <HdsButton {{c.item}} id="B2">B2</HdsButton>
            </div>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#A2');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowRight');
    assert
      .dom('[data-active-item]')
      .hasAttribute('id', 'B1', 'wraps to start of next row');

    await focus('#B1');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowLeft');
    assert
      .dom('[data-active-item]')
      .hasAttribute('id', 'A2', 'wraps to end of previous row');

    await focus('#B1');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowDown');
    assert
      .dom('[data-active-item]')
      .hasAttribute('id', 'B1', 'does not wrap vertically');
  });

  test('it wraps to the next/prev column in a 2D grid when @wrap="vertical"', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <HdsComposite @wrap="vertical" as |c|>
          <div role="grid" {{c.composite}} id="composite-grid">
            <div role="row" {{c.group}}>
              <HdsButton {{c.item}} id="A1">A1</HdsButton>
              <HdsButton {{c.item}} id="A2">A2</HdsButton>
            </div>
            <div role="row" {{c.group}}>
              <HdsButton {{c.item}} id="B1">B1</HdsButton>
              <HdsButton {{c.item}} id="B2">B2</HdsButton>
            </div>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#B1');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowDown');
    assert
      .dom('[data-active-item]')
      .hasAttribute('id', 'A2', 'wraps to top of next column');

    await focus('#A2');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowUp');
    assert
      .dom('[data-active-item]')
      .hasAttribute('id', 'B1', 'wraps to bottom of prev column');

    await focus('#A2');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowRight');
    assert
      .dom('[data-active-item]')
      .hasAttribute('id', 'A2', 'does not wrap horizontally');
  });

  test('it wraps both horizontally and vertically when @wrap={{true}}', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <HdsComposite @wrap={{true}} as |c|>
          <div role="grid" {{c.composite}} id="composite-grid">
            <div role="row" {{c.group}}>
              <HdsButton {{c.item}} id="A1">A1</HdsButton>
              <HdsButton {{c.item}} id="A2">A2</HdsButton>
            </div>
            <div role="row" {{c.group}}>
              <HdsButton {{c.item}} id="B1">B1</HdsButton>
              <HdsButton {{c.item}} id="B2">B2</HdsButton>
            </div>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#A2');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowRight');
    assert.dom('[data-active-item]').hasAttribute('id', 'B1');

    await focus('#B1');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowDown');
    assert.dom('[data-active-item]').hasAttribute('id', 'A2');
  });

  test('it skips multiple consecutive disabled items', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |c|>
          <div {{c.composite}} id="composite-root">
            <HdsButton {{c.item}} id="item-1">Enabled 1</HdsButton>
            <HdsButton {{c.item disabled=true}} id="item-2">Disabled</HdsButton>
            <HdsButton {{c.item disabled=true}} id="item-3">Disabled</HdsButton>
            <HdsButton {{c.item}} id="item-4">Enabled 2</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#item-1');
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowRight');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-4');

    await focus('#item-4');
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowLeft');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-1');
  });

  test('it does nothing if all items are disabled', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |c|>
          <div {{c.composite}} id="composite-root">
            <HdsButton {{c.item disabled=true}} id="item-1">Disabled 1</HdsButton>
            <HdsButton {{c.item disabled=true}} id="item-2">Disabled 2</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    assert.dom('[data-active-item]').doesNotExist();

    await focus('#item-1');
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowRight');
    assert.dom('[data-active-item]').doesNotExist();
  });

  test('Home and End skip disabled items', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |c|>
          <div {{c.composite}} id="composite-root">
            <HdsButton {{c.item disabled=true}} id="item-1">Disabled 1</HdsButton>
            <HdsButton {{c.item}} id="item-2">First enabled</HdsButton>
            <HdsButton {{c.item}} id="item-3">Middle</HdsButton>
            <HdsButton {{c.item}} id="item-4">Last enabled</HdsButton>
            <HdsButton {{c.item disabled=true}} id="item-5">Disabled 2</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#item-3');
    await triggerKeyEvent('#composite-root', 'keydown', 'Home');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-2');

    await triggerKeyEvent('#composite-root', 'keydown', 'End');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-4');
  });

  test('it skips disabled items in a 2D grid', async function (assert) {
    assert.expect(4);

    await render(
      <template>
        <HdsComposite as |c|>
          <div role="grid" {{c.composite}} id="composite-grid">
            <div role="row" {{c.group}}>
              <HdsButton {{c.item}} id="A1">A1</HdsButton>
              <HdsButton {{c.item disabled=true}} id="A2">A2 (disabled)</HdsButton>
              <HdsButton {{c.item}} id="A3">A3</HdsButton>
            </div>
            <div role="row" {{c.group}}>
              <HdsButton {{c.item disabled=true}} id="B1" disabled>B1 (disabled)</HdsButton>
              <HdsButton {{c.item}} id="B2">B2</HdsButton>
              <HdsButton {{c.item}} id="B3">B3</HdsButton>
            </div>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#A1');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowRight');
    assert.dom('[data-active-item]').hasAttribute('id', 'A3');

    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowDown');
    assert.dom('[data-active-item]').hasAttribute('id', 'B3');

    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowLeft');
    assert.dom('[data-active-item]').hasAttribute('id', 'B2');

    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowUp');
    assert.dom('[data-active-item]').hasAttribute('id', 'A3');
  });

  test('it activates the item matching @defaultCurrentId', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <HdsComposite @defaultCurrentId="item-2" as |c|>
          <div {{c.composite}} id="composite-root">
            <HdsButton {{c.item}} id="item-1">Item 1</HdsButton>
            <HdsButton {{c.item}} id="item-2">Item 2</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    assert.dom('[data-active-item]').hasAttribute('id', 'item-2');
  });

  test('it does not activate any item if @defaultCurrentId does not match', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <HdsComposite @defaultCurrentId="does-not-exist" as |c|>
          <div {{c.composite}} id="composite-root">
            <HdsButton {{c.item}} id="item-1">Item 1</HdsButton>
            <HdsButton {{c.item}} id="item-2">Item 2</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    assert.dom('[data-active-item]').doesNotExist();
  });

  test('with no orientation and no groups, all arrow keys navigate linearly', async function (assert) {
    assert.expect(4);

    await render(
      <template>
        <HdsComposite as |c|>
          <div {{c.composite}} id="composite-root">
            <HdsButton {{c.item}} id="item-1">Item 1</HdsButton>
            <HdsButton {{c.item}} id="item-2">Item 2</HdsButton>
            <HdsButton {{c.item}} id="item-3">Item 3</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#item-1');
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowRight');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-2');

    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowDown');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-3');

    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowLeft');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-2');

    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowUp');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-1');
  });

  test('horizontal orientation ignores vertical arrow keys', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |c|>
          <div {{c.composite}} id="composite-root">
            <HdsButton {{c.item}} id="item-1">Item 1</HdsButton>
            <HdsButton {{c.item}} id="item-2">Item 2</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#item-1');
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowDown');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-1');

    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowUp');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-1');

    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowRight');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-2');
  });

  test('vertical orientation ignores horizontal arrow keys', async function (assert) {
    assert.expect(3);

    await render(
      <template>
        <HdsComposite @orientation="vertical" as |c|>
          <div {{c.composite}} id="composite-root">
            <HdsButton {{c.item}} id="item-1">Item 1</HdsButton>
            <HdsButton {{c.item}} id="item-2">Item 2</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#item-1');
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowLeft');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-1');

    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowRight');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-1');

    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowDown');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-2');
  });

  test('it sets tabindex=0 on composite when no item is active', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <HdsComposite @defaultCurrentId={{null}} as |composite|>
          <div {{composite.composite}} id="composite-root">
            <HdsButton {{composite.item}} id="item-1">Item 1</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    assert.dom('#composite-root').hasAttribute('tabindex', '0');
  });

  test('it updates active item when an item is removed', async function (assert) {
    assert.expect(2);

    const context = new TrackedObject<{ showSecond: boolean }>({
      showSecond: true,
    });

    await render(
      <template>
        <HdsComposite as |c|>
          <div {{c.composite}} id="composite-root">
            <HdsButton {{c.item}} id="item-1">Item 1</HdsButton>
            {{#if context.showSecond}}
              <HdsButton {{c.item}} id="item-2">Item 2</HdsButton>
            {{/if}}
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#item-2');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-2');

    context.showSecond = false;
    await settled();
    assert.dom('[data-active-item]').hasAttribute('id', 'item-1');
  });

  test('it sets no active item when all items are removed', async function (assert) {
    assert.expect(2);

    const context = new TrackedObject<{ showFirst: boolean }>({
      showFirst: true,
    });

    await render(
      <template>
        <HdsComposite as |c|>
          <div {{c.composite}} id="composite-root">
            {{#if context.showFirst}}
              <HdsButton {{c.item}} id="item-1">Item 1</HdsButton>
            {{/if}}
          </div>
        </HdsComposite>
      </template>,
    );

    assert.dom('[data-active-item]').hasAttribute('id', 'item-1');

    context.showFirst = false;
    await settled();
    assert.dom('[data-active-item]').doesNotExist();
    assert.dom('#composite-root').hasAttribute('tabindex', '0');
  });

  test('it registers and navigates to a newly added item', async function (assert) {
    assert.expect(2);

    const context = new TrackedObject<{ showExtra: boolean }>({
      showExtra: true,
    });

    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |c|>
          <div {{c.composite}} id="composite-root">
            <HdsButton {{c.item}} id="item-1">Item 1</HdsButton>
            <HdsButton {{c.item}} id="item-2">Item 2</HdsButton>
            {{#if context.showExtra}}
              <HdsButton {{c.item}} id="item-3">Item 3</HdsButton>
            {{/if}}
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#item-2');

    context.showExtra = true;
    await settled();
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowRight');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-3');
  });

  test('it updates navigation when a group is added or removed', async function (assert) {
    assert.expect(2);

    const context = new TrackedObject<{ showSecondRow: boolean }>({
      showSecondRow: true,
    });

    await render(
      <template>
        <HdsComposite as |c|>
          <div role="grid" {{c.composite}} id="composite-grid">
            <div role="row" {{c.group}}>
              <HdsButton {{c.item}} id="A1">A1</HdsButton>
              <HdsButton {{c.item}} id="A2">A2</HdsButton>
            </div>
            {{#if context.showSecondRow}}
              <div role="row" {{c.group}}>
                <HdsButton {{c.item}} id="B1">B1</HdsButton>
                <HdsButton {{c.item}} id="B2">B2</HdsButton>
              </div>
            {{/if}}
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#A2');
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowDown');
    assert.dom('[data-active-item]').hasAttribute('id', 'B2');

    context.showSecondRow = false;
    await settled();
    await triggerKeyEvent('#composite-grid', 'keydown', 'ArrowDown');
    assert.dom('[data-active-item]').hasAttribute('id', 'A1');
  });

  test('it updates navigation when an item disabled state is toggled', async function (assert) {
    const context = new TrackedObject<{ isDisabled: boolean }>({
      isDisabled: false,
    });

    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |c|>
          <div {{c.composite}} id="composite-root">
            <HdsButton {{c.item}} id="item-1">Item 1</HdsButton>
            <HdsButton {{c.item disabled=context.isDisabled}} id="item-2">Item 2</HdsButton>
            <HdsButton {{c.item}} id="item-3">Item 3</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#item-1');
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowRight');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-2');

    context.isDisabled = true;
    await settled();
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowRight');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-3');

    context.isDisabled = false;
    await settled();
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowLeft');
    assert.dom('[data-active-item]').hasAttribute('id', 'item-2');
  });

  test('focus moves to the newly active item after navigation', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |c|>
          <div {{c.composite}} id="composite-root">
            <HdsButton {{c.item}} id="item-1">Item 1</HdsButton>
            <HdsButton {{c.item}} id="item-2">Item 2</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#item-1');
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowRight');
    assert.strictEqual(
      document.activeElement && document.activeElement.id,
      'item-2',
    );

    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowLeft');
    assert.strictEqual(
      document.activeElement && document.activeElement.id,
      'item-1',
    );
  });

  test('focus moves to the correct item after dynamic changes', async function (assert) {
    assert.expect(1);

    const context = new TrackedObject<{ showSecond: boolean }>({
      showSecond: true,
    });

    await render(
      <template>
        <HdsComposite as |c|>
          <div {{c.composite}} id="composite-root">
            <HdsButton {{c.item}} id="item-1">Item 1</HdsButton>
            {{#if context.showSecond}}
              <HdsButton {{c.item}} id="item-2">Item 2</HdsButton>
            {{/if}}
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#item-2');
    context.showSecond = false;
    await settled();
    assert.strictEqual(
      document.activeElement && document.activeElement.id,
      'item-1',
    );
  });

  test('custom item IDs are handled correctly for navigation and active state', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |c|>
          <div {{c.composite}} id="composite-root">
            <HdsButton {{c.item}} id="custom-foo">Foo</HdsButton>
            <HdsButton {{c.item}} id="custom-bar">Bar</HdsButton>
          </div>
        </HdsComposite>
      </template>,
    );

    await focus('#custom-foo');
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowRight');
    assert.dom('[data-active-item]').hasAttribute('id', 'custom-bar');

    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowLeft');
    assert.dom('[data-active-item]').hasAttribute('id', 'custom-foo');
  });

  test('it prevents default browser behavior for managed keys', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <div id="wrapper-root">
          <HdsComposite @orientation="horizontal" as |c|>
            <div {{c.composite}} id="composite-root">
              <HdsButton {{c.item}} id="item-1">Item 1</HdsButton>
            </div>
          </HdsComposite>
        </div>
      </template>,
    );

    const wrapperRoot = document.getElementById('wrapper-root')!;

    // listen for the event after the component handles it
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        assert.true(
          event.defaultPrevented,
          'ArrowRight prevented default even though there is no next item',
        );
      }
      if (event.key === 'Tab') {
        assert.false(
          event.defaultPrevented,
          'Tab key did not prevent default, allowing normal browser focus flow',
        );
      }
    };

    wrapperRoot.addEventListener('keydown', keydownHandler);

    await focus('#item-1');
    await triggerKeyEvent('#composite-root', 'keydown', 'ArrowRight');
    await triggerKeyEvent('#composite-root', 'keydown', 'Tab');

    wrapperRoot.removeEventListener('keydown', keydownHandler);
  });
});

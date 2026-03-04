/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, focus, settled, triggerKeyEvent } from '@ember/test-helpers';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsComposite } from '@hashicorp/design-system-components/components';

module('Integration | Component | hds/composite/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it sets the first enabled item as active by default', async function (assert) {
    await render(
      <template>
        <HdsComposite as |composite|>
          <div {{composite.composite}}>
            <button {{composite.item}} id="item-1">Item 1</button>
            <button {{composite.item}} id="item-2">Item 2</button>
          </div>
        </HdsComposite>
      </template>,
    );

    assert.dom('[data-active-item]').hasAttribute('id', 'item-1');
    assert.dom('#item-1').hasAttribute('tabindex', '0');
    assert.dom('#item-2').hasAttribute('tabindex', '-1');
  });

  test('it skips disabled items', async function (assert) {
    await render(
      <template>
        <HdsComposite as |composite|>
          <div {{composite.composite}}>
            <button {{composite.item disabled=true}} id="item-1">Item 1</button>
            <button {{composite.item}} id="item-2">Item 2</button>
          </div>
        </HdsComposite>
      </template>,
    );

    assert.dom('[data-active-item]').hasAttribute('id', 'item-2');
    assert.dom('#item-1').hasAttribute('aria-disabled', 'true');
    assert.dom('#item-2').doesNotHaveAttribute('aria-disabled');
  });

  test('it moves focus with arrow keys (horizontal)', async function (assert) {
    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |composite|>
          <div {{composite.composite}} id="composite-root">
            <button {{composite.item}} id="item-1">Item 1</button>
            <button {{composite.item}} id="item-2">Item 2</button>
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
    await render(
      <template>
        <HdsComposite @orientation="vertical" as |composite|>
          <div {{composite.composite}} id="composite-root">
            <button {{composite.item}} id="item-1">Item 1</button>
            <button {{composite.item}} id="item-2">Item 2</button>
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
    await render(
      <template>
        <HdsComposite @orientation="horizontal" @loop={{true}} as |composite|>
          <div {{composite.composite}} id="composite-root">
            <button {{composite.item}} id="item-1">Item 1</button>
            <button {{composite.item}} id="item-2">Item 2</button>
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
    await render(
      <template>
        <HdsComposite @loop="horizontal" as |c|>
          <div role="grid" {{c.composite}} id="composite-grid">
            <div role="row" {{c.group}}>
              <button {{c.item}} id="A1">A1</button>
              <button {{c.item}} id="A2">A2</button>
            </div>
            <div role="row" {{c.group}}>
              <button {{c.item}} id="B1">B1</button>
              <button {{c.item}} id="B2">B2</button>
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
    await render(
      <template>
        <HdsComposite @loop="vertical" as |c|>
          <div role="grid" {{c.composite}} id="composite-grid">
            <div role="row" {{c.group}}>
              <button {{c.item}} id="A1">A1</button>
              <button {{c.item}} id="A2">A2</button>
            </div>
            <div role="row" {{c.group}}>
              <button {{c.item}} id="B1">B1</button>
              <button {{c.item}} id="B2">B2</button>
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

  test('it skips multiple consecutive disabled items', async function (assert) {
    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |c|>
          <div {{c.composite}} id="composite-root">
            <button {{c.item}} id="item-1">Enabled 1</button>
            <button {{c.item disabled=true}} id="item-2">Disabled</button>
            <button {{c.item disabled=true}} id="item-3">Disabled</button>
            <button {{c.item}} id="item-4">Enabled 2</button>
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
    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |c|>
          <div {{c.composite}} id="composite-root">
            <button {{c.item disabled=true}} id="item-1">Disabled 1</button>
            <button {{c.item disabled=true}} id="item-2">Disabled 2</button>
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
    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |c|>
          <div {{c.composite}} id="composite-root">
            <button {{c.item disabled=true}} id="item-1">Disabled 1</button>
            <button {{c.item}} id="item-2">First enabled</button>
            <button {{c.item}} id="item-3">Middle</button>
            <button {{c.item}} id="item-4">Last enabled</button>
            <button {{c.item disabled=true}} id="item-5">Disabled 2</button>
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
    await render(
      <template>
        <HdsComposite as |c|>
          <div role="grid" {{c.composite}} id="composite-grid">
            <div role="row" {{c.group}}>
              <button {{c.item}} id="A1">A1</button>
              <button {{c.item disabled=true}} id="A2">A2 (disabled)</button>
              <button {{c.item}} id="A3">A3</button>
            </div>
            <div role="row" {{c.group}}>
              <button {{c.item disabled=true}} id="B1">B1 (disabled)</button>
              <button {{c.item}} id="B2">B2</button>
              <button {{c.item}} id="B3">B3</button>
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

  test('it does not activate any item if @defaultCurrentId does not match', async function (assert) {
    await render(
      <template>
        <HdsComposite @defaultCurrentId="does-not-exist" as |c|>
          <div {{c.composite}} id="composite-root">
            <button {{c.item}} id="item-1">Item 1</button>
            <button {{c.item}} id="item-2">Item 2</button>
          </div>
        </HdsComposite>
      </template>,
    );

    assert.dom('[data-active-item]').doesNotExist();
  });

  test('with no orientation and no groups, all arrow keys navigate linearly', async function (assert) {
    await render(
      <template>
        <HdsComposite as |c|>
          <div {{c.composite}} id="composite-root">
            <button {{c.item}} id="item-1">Item 1</button>
            <button {{c.item}} id="item-2">Item 2</button>
            <button {{c.item}} id="item-3">Item 3</button>
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
    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |c|>
          <div {{c.composite}} id="composite-root">
            <button {{c.item}} id="item-1">Item 1</button>
            <button {{c.item}} id="item-2">Item 2</button>
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
    await render(
      <template>
        <HdsComposite @orientation="vertical" as |c|>
          <div {{c.composite}} id="composite-root">
            <button {{c.item}} id="item-1">Item 1</button>
            <button {{c.item}} id="item-2">Item 2</button>
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
    await render(
      <template>
        <HdsComposite @defaultCurrentId={{null}} as |composite|>
          <div {{composite.composite}} id="composite-root">
            <button {{composite.item}} id="item-1">Item 1</button>
          </div>
        </HdsComposite>
      </template>,
    );

    assert.dom('#composite-root').hasAttribute('tabindex', '0');
  });

  test('it updates active item when an item is removed', async function (assert) {
    const context = new TrackedObject<{ showSecond: boolean }>({
      showSecond: true,
    });

    await render(
      <template>
        <HdsComposite as |c|>
          <div {{c.composite}} id="composite-root">
            <button {{c.item}} id="item-1">Item 1</button>
            {{#if context.showSecond}}
              <button {{c.item}} id="item-2">Item 2</button>
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
    const context = new TrackedObject<{ showFirst: boolean }>({
      showFirst: true,
    });

    await render(
      <template>
        <HdsComposite as |c|>
          <div {{c.composite}} id="composite-root">
            {{#if context.showFirst}}
              <button {{c.item}} id="item-1">Item 1</button>
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
    const context = new TrackedObject<{ showExtra: boolean }>({
      showExtra: true,
    });

    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |c|>
          <div {{c.composite}} id="composite-root">
            <button {{c.item}} id="item-1">Item 1</button>
            <button {{c.item}} id="item-2">Item 2</button>
            {{#if context.showExtra}}
              <button {{c.item}} id="item-3">Item 3</button>
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
    const context = new TrackedObject<{ showSecondRow: boolean }>({
      showSecondRow: true,
    });

    await render(
      <template>
        <HdsComposite as |c|>
          <div role="grid" {{c.composite}} id="composite-grid">
            <div role="row" {{c.group}}>
              <button {{c.item}} id="A1">A1</button>
              <button {{c.item}} id="A2">A2</button>
            </div>
            {{#if context.showSecondRow}}
              <div role="row" {{c.group}}>
                <button {{c.item}} id="B1">B1</button>
                <button {{c.item}} id="B2">B2</button>
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
            <button {{c.item}} id="item-1">Item 1</button>
            <button {{c.item disabled=context.isDisabled}} id="item-2">Item 2</button>
            <button {{c.item}} id="item-3">Item 3</button>
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
    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |c|>
          <div {{c.composite}} id="composite-root">
            <button {{c.item}} id="item-1">Item 1</button>
            <button {{c.item}} id="item-2">Item 2</button>
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
    const context = new TrackedObject<{ showSecond: boolean }>({
      showSecond: true,
    });

    await render(
      <template>
        <HdsComposite as |c|>
          <div {{c.composite}} id="composite-root">
            <button {{c.item}} id="item-1">Item 1</button>
            {{#if context.showSecond}}
              <button {{c.item}} id="item-2">Item 2</button>
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
    await render(
      <template>
        <HdsComposite @orientation="horizontal" as |c|>
          <div {{c.composite}} id="composite-root">
            <button {{c.item}} id="custom-foo">Foo</button>
            <button {{c.item}} id="custom-bar">Bar</button>
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
});

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/accordion/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Accordion id="test-accordion" />`);
    assert.dom('#test-accordion').hasClass('hds-accordion');
  });

  // CONTENT

  test('it renders the passed in Accordion Items', async function (assert) {
    await render(hbs`
      <Hds::Accordion as |A|>
        <A.Item>
          <:toggle>Item one</:toggle>
          <:content>Content one</:content>
        </A.Item>
        <A.Item>
          <:toggle>Item two</:toggle>
          <:content>Content two</:content>
        </A.Item>
      </Hds::Accordion>
    `);
    assert.dom('.hds-accordion .hds-accordion-item').exists({ count: 2 });
  });

  test('it renders the passed in content in the Accordion Item', async function (assert) {
    await render(hbs`
      <Hds::Accordion as |A|>
        <A.Item>
          <:toggle><strong id="test-strong">Item one</strong></:toggle>
          <:content><em id="test-em">Content one</em></:content>
        </A.Item>
      </Hds::Accordion>
    `);
    await click('.hds-accordion-item__button');
    assert.dom('#test-strong').exists().hasText('Item one');
    assert.dom('#test-em').exists().hasText('Content one');
  });

  // SIZE

  test('it should render the medium size as the default if no @size is declared', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion id="test-accordion" as |A|>
          <A.Item>Item</A.Item>
        </Hds::Accordion>
      `
    );
    assert.dom('#test-accordion').hasClass('hds-accordion--size-medium');
    assert
      .dom('#test-accordion .hds-accordion-item')
      .hasClass('hds-accordion-item--size-medium');
  });

  test('it should render the correct CSS size class depending on the @size', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion id="test-accordion" @size="large" as |A|>
          <A.Item>Item</A.Item>
        </Hds::Accordion>
      `
    );
    assert.dom('#test-accordion').hasClass('hds-accordion--size-large');
    assert
      .dom('#test-accordion .hds-accordion-item')
      .hasClass('hds-accordion-item--size-large');
  });

  test('it should render different CSS size classes when different @size arguments are provided', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion id="test-accordion" @size="large" as |A|>
          <A.Item id="test-accordion-item1">Item 1</A.Item>
          <A.Item id="test-accordion-item2" @size="small">Item 2</A.Item>
        </Hds::Accordion>
      `
    );
    assert
      .dom('#test-accordion-item1')
      .hasClass('hds-accordion-item--size-large');
    assert
      .dom('#test-accordion-item2')
      .hasClass('hds-accordion-item--size-small');
  });

  // TYPE

  test('it should render the card type as the default if no @type is declared', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion id="test-accordion" as |A|>
          <A.Item>Item</A.Item>
        </Hds::Accordion>
      `
    );
    assert.dom('#test-accordion').hasClass('hds-accordion--type-card');
    assert
      .dom('#test-accordion .hds-accordion-item')
      .hasClass('hds-accordion-item--type-card');
  });

  test('it should render the correct CSS type class depending on the @type', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion id="test-accordion" @type="flush" as |A|>
          <A.Item>Item</A.Item>
        </Hds::Accordion>
      `
    );
    assert.dom('#test-accordion').hasClass('hds-accordion--type-flush');
    assert
      .dom('#test-accordion .hds-accordion-item')
      .hasClass('hds-accordion-item--type-flush');
  });

  test('it should render different CSS type class when different @type arguments are provided', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion id="test-accordion" @type="flush" as |A|>
          <A.Item id="test-accordion-item1">Item 1</A.Item>
          <A.Item id="test-accordion-item2" @type="card">Item 2</A.Item>
        </Hds::Accordion>
      `
    );
    assert
      .dom('#test-accordion-item1')
      .hasClass('hds-accordion-item--type-flush');
    assert
      .dom('#test-accordion-item2')
      .hasClass('hds-accordion-item--type-card');
  });

  // A11Y

  test('it displays the correct value for aria-expanded on the AccordionItem when closed vs open', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion as |A|>
          <A.Item>
            <:toggle>Item one</:toggle>
            <:content>Additional content</:content>
          </A.Item>
        </Hds::Accordion>
      `
    );
    assert
      .dom('.hds-accordion-item__button')
      .hasAttribute('aria-expanded', 'false');
    await click('.hds-accordion-item__button');
    assert
      .dom('.hds-accordion-item__button')
      .hasAttribute('aria-expanded', 'true');
  });

  test('the AccordionItem toggle button has an aria-controls attribute with a value matching the content id', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion as |A|>
          <A.Item>
            <:toggle>Item one</:toggle>
            <:content>Additional content</:content>
          </A.Item>
        </Hds::Accordion>
      `
    );
    await click('.hds-accordion-item__button');
    assert.dom('.hds-accordion-item__button').hasAttribute('aria-controls');
    assert.dom('.hds-accordion-item__content').hasAttribute('id');

    assert.strictEqual(
      this.element
        .querySelector('.hds-accordion-item__button')
        .getAttribute('aria-controls'),
      this.element
        .querySelector('.hds-accordion-item__content')
        .getAttribute('id')
    );
  });

  // OPTIONS

  // isOpen

  test('it displays content initially when @isOpen is set to true', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion as |A|>
          <A.Item @isOpen={{true}}>
            <:toggle>Item one</:toggle>
            <:content>Additional content</:content>
          </A.Item>
        </Hds::Accordion>
      `
    );
    // Test content is displayed
    assert
      .dom('.hds-accordion-item__content')
      .exists()
      .hasText('Additional content');
    // Test that content is hidden after the toggle is triggered
    await click('.hds-accordion-item__button');
    assert.dom('.hds-accordion-item__content').doesNotExist();
  });

  // containsInteractive
  test('it displays the correct variant when containsInteractive is set to false vs. true', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion as |A|>
          <A.Item id="test-contains-interactive--false">
            <:toggle>Item one</:toggle>
            <:content>Additional content</:content>
          </A.Item>
          <A.Item @containsInteractive={{true}} id="test-contains-interactive--true">
            <:toggle>Item one</:toggle>
            <:content>Additional content</:content>
          </A.Item>
        </Hds::Accordion>
      `
    );
    assert
      .dom('#test-contains-interactive--false')
      .hasClass('hds-accordion-item--does-not-contain-interactive');
    assert
      .dom('#test-contains-interactive--true')
      .hasClass('hds-accordion-item--contains-interactive');
  });

  // isStatic
  test('it does not show the toggle button when @isStatic is set to true, ', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion as |A|>
          <A.Item @isStatic={{true}}>
            <:toggle>Item one</:toggle>
            <:content>Additional content</:content>
          </A.Item>
        </Hds::Accordion>
      `
    );
    assert.dom('.hds-accordion-item--is-static').exists();
    assert
      .dom('.hds-accordion-item__button')
      .hasStyle({ visibility: 'hidden' });
  });

  // forceState
  test('it displays the correct content based on @forceState', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion @forceState={{this.forceState}} as |A|>
          <A.Item @isOpen={{true}}>
            <:toggle>Item one</:toggle>
            <:content>Content one</:content>
          </A.Item>
          <A.Item @isOpen={{false}}>
            <:toggle>Item one</:toggle>
            <:content>Content two</:content>
          </A.Item>
        </Hds::Accordion>
      `
    );
    // first item open at rendering
    assert.dom('.hds-accordion-item__content').exists({ count: 1 });

    // all items open via forceState (external override to open)
    this.set('forceState', 'open');
    assert.dom('.hds-accordion-item__content').exists({ count: 2 });

    // first item closed via toggle (internal override to close)
    await click('.hds-accordion-item__button');
    assert.dom('.hds-accordion-item__content').exists({ count: 1 });

    // all items closed via forceState (external override to close)
    this.set('forceState', 'close');
    assert.dom('.hds-accordion-item__content').doesNotExist();

    // first item open via toggle  (internal override to open)
    await click('.hds-accordion-item__button');
    assert.dom('.hds-accordion-item__content').exists({ count: 1 });
  });

  // close

  test('it should hide the content when an accordion item triggers `close`', async function (assert) {
    await render(hbs`
      <Hds::Accordion::Item>
        <:toggle>Item one</:toggle>
        <:content as |c|>
          <button type="button" {{on "click" c.close}}>Close</button>
        </:content>
      </Hds::Accordion::Item>
    `);
    await click('.hds-accordion-item__button');
    assert.dom('.hds-accordion-item__content').exists();

    await click('.hds-accordion-item__content button');
    assert.dom('.hds-accordion-item__content').doesNotExist();
    assert.dom('.hds-accordion-item__content button').doesNotExist();
  });
});

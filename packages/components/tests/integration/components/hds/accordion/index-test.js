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

  test('it displays content initially when @isOpen is set to true, ', async function (assert) {
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
});

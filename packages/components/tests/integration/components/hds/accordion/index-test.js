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
          <:toggle><strong>Item one</strong></:toggle>
          <:content><em>Content one</em></:content>
        </A.Item>
      </Hds::Accordion>
    `);
    await click('.hds-accordion-item__button');
    assert
      .dom('.hds-accordion-item__toggle-content strong')
      .exists()
      .hasText('Item one');
    assert
      .dom('.hds-accordion-item__content em')
      .exists()
      .hasText('Content one');
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

  // isClickable
  test('it displays the correct variant when isClickable is set to false vs. true', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion as |A|>
          <A.Item id="test-is-clickable-true">
            <:toggle>Item one</:toggle>
            <:content>Additional content</:content> 
          </A.Item>
          <A.Item @isClickable={{false}} id="test-is-clickable-false">
            <:toggle>Item one</:toggle>
            <:content>Additional content</:content> 
          </A.Item>
        </Hds::Accordion>
      `
    );
    assert
      .dom('#test-is-clickable-true')
      .hasClass('hds-accordion-item--is-clickable');
    assert
      .dom('#test-is-clickable-false')
      .hasClass('hds-accordion-item--is--not-clickable');
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion id="test-accordion" class="my-class" data-test1 data-test2="test" as |A|>
          <A.Item id="test-accordion-item" class="my-class" data-test1 data-test2="test">
            <:toggle>Item one</:toggle>
            <:content>Additional content</:content> 
          </A.Item>
        </Hds::Accordion>
      `
    );
    // Accordion:
    assert.dom('#test-accordion').hasClass('my-class');
    assert.dom('#test-accordion').hasAttribute('data-test1');
    assert.dom('#test-accordion').hasAttribute('data-test2', 'test');

    // AccordionItem:
    assert.dom('#test-accordion-item').hasClass('my-class');
    assert.dom('#test-accordion-item').hasAttribute('data-test1');
    assert.dom('#test-accordion-item').hasAttribute('data-test2', 'test');
  });
});

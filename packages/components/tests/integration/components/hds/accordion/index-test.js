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

  test('it renders the passed in Accordion Rows', async function (assert) {
    await render(hbs`
      <Hds::Accordion as |A|>
        <A.Row>
          <:toggle>Item one</:toggle>
          <:content>Content one</:content>
        </A.Row>
        <A.Row>
          <:toggle>Item two</:toggle>
          <:content>Content two</:content>
        </A.Row>
      </Hds::Accordion>
    `);
    assert.dom('.hds-accordion .hds-accordion-row').exists({ count: 2 });
  });

  test('it renders the passed in content in the Accordion Row', async function (assert) {
    await render(hbs`
      <Hds::Accordion as |A|>
        <A.Row>
          <:toggle><strong>Item one</strong></:toggle>
          <:content><em>Content one</em></:content>
        </A.Row>
      </Hds::Accordion>
    `);
    await click('.hds-accordion-row__toggle-button');
    assert
      .dom('.hds-accordion-row__toggle-content strong')
      .exists()
      .hasText('Item one');
    assert
      .dom('.hds-accordion-row__content em')
      .exists()
      .hasText('Content one');
  });

  // A11Y

  test('it displays the correct value for aria-expanded on the AccordionRow when closed vs open', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion as |A|>
          <A.Row>
            <:toggle>Item one</:toggle>
            <:content>Additional content</:content> 
          </A.Row>
        </Hds::Accordion>
      `
    );
    assert
      .dom('.hds-accordion-row__toggle-button')
      .hasAttribute('aria-expanded', 'false');
    await click('.hds-accordion-row__toggle-button');
    assert
      .dom('.hds-accordion-row__toggle-button')
      .hasAttribute('aria-expanded', 'true');
  });

  test('the AccordionRow toggle button has an aria-controls attribute with a value matching the content id', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion as |A|>
          <A.Row>
            <:toggle>Item one</:toggle>
            <:content>Additional content</:content> 
          </A.Row>
        </Hds::Accordion>
      `
    );
    await click('.hds-accordion-row__toggle-button');
    assert
      .dom('.hds-accordion-row__toggle-button')
      .hasAttribute('aria-controls');
    assert.dom('.hds-accordion-row__content').hasAttribute('id');

    assert.strictEqual(
      this.element
        .querySelector('.hds-accordion-row__toggle-button')
        .getAttribute('aria-controls'),
      this.element
        .querySelector('.hds-accordion-row__content')
        .getAttribute('id')
    );
  });

  // OPTIONS

  // isOpen

  test('it displays content initially when @isOpen is set to true, ', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion as |A|>
          <A.Row @isOpen={{true}}>
            <:toggle>Item one</:toggle>
            <:content>Additional content</:content> 
          </A.Row>
        </Hds::Accordion>
      `
    );
    // Test content is displayed
    assert
      .dom('.hds-accordion-row__content')
      .exists()
      .hasText('Additional content');
    // Test that content is hidden after the toggle is triggered
    await click('.hds-accordion-row__toggle-button');
    assert.dom('.hds-accordion-row__content').doesNotExist();
  });

  // ATTRIBUTES

  test('it should spread all the attributes passed to the component on the element', async function (assert) {
    await render(
      hbs`
        <Hds::Accordion id="test-accordion" class="my-class" data-test1 data-test2="test" as |A|>
          <A.Row id="test-accordion-row" class="my-class" data-test1 data-test2="test">
            <:toggle>Item one</:toggle>
            <:content>Additional content</:content> 
          </A.Row>
        </Hds::Accordion>
      `
    );
    // Accordion:
    assert.dom('#test-accordion').hasClass('my-class');
    assert.dom('#test-accordion').hasAttribute('data-test1');
    assert.dom('#test-accordion').hasAttribute('data-test2', 'test');

    // AccordionRow:
    assert.dom('#test-accordion-row').hasClass('my-class');
    assert.dom('#test-accordion-row').hasAttribute('data-test1');
    assert.dom('#test-accordion-row').hasAttribute('data-test2', 'test');
  });
});

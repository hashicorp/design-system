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
});

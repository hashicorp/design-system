/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/pagination/nav/ellipsis',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the component', async function (assert) {
      await render(hbs`
      <Hds::Pagination::Nav::Ellipsis />
    `);
      assert.dom(this.element).exists();
    });

    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(hbs`
      <Hds::Pagination::Nav::Ellipsis id="test-nav-ellipsis" />
    `);
      assert.dom('#test-nav-ellipsis').hasClass('hds-pagination-nav__ellipsis');
    });

    // ATTRIBUTES

    test('it should spread all the attributes passed to the component on the element', async function (assert) {
      await render(
        hbs`<Hds::Pagination::Nav::Ellipsis id="test-pagination-ellipsis" class="my-class" data-test1 data-test2="test" />`
      );
      assert.dom('#test-pagination-ellipsis').hasClass('my-class');
      assert.dom('#test-pagination-ellipsis').hasAttribute('data-test1');
      assert
        .dom('#test-pagination-ellipsis')
        .hasAttribute('data-test2', 'test');
    });
  }
);

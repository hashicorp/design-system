/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';

import { HdsSideNavListLink } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/side-nav/list/link', function (hooks) {
  setupRenderingTest(hooks);

  // Basic

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsSideNavListLink id="test-side-nav-list-item-link" />
      </template>,
    );
    assert
      .dom('#test-side-nav-list-item-link')
      .hasClass('hds-side-nav__list-item-link');
  });

  // Test Content / Args

  test('it renders the passed in args', async function (assert) {
    await render(
      <template>
        <HdsSideNavListLink
          @icon="boundary"
          @text="Boundary"
          @count="3"
          @badge="Alpha"
          @hasSubItems={{true}}
          @isHrefExternal={{true}}
        />
      </template>,
    );
    assert.dom('.hds-icon-boundary').exists();
    assert.dom('.hds-side-nav__list-item-text').hasText('Boundary');
    assert.dom('.hds-badge-count').hasText('3');
    assert.dom('.hds-badge').hasText('Alpha');
    assert.dom('.hds-icon-chevron-right').exists();
    assert.dom('.hds-icon-external-link').exists();
  });

  test('it renders the link as "active" if @isActive is true', async function (assert) {
    await render(
      <template>
        <HdsSideNavListLink @isActive={{true}} id="test-side-nav-link" />
      </template>,
    );
    assert.dom('#test-side-nav-link').hasClass('active');
  });

  test('it renders the passed in custom content', async function (assert) {
    await render(
      <template>
        <HdsSideNavListLink>
          <span id="test-custom-content" />
        </HdsSideNavListLink>
      </template>,
    );
    assert.dom('#test-custom-content').exists();
  });

  // GENERATED ELEMENTS

  test('it should render a <button> if no @href or @route is passed (default)', async function (assert) {
    await render(<template><HdsSideNavListLink /></template>);
    assert.dom('.hds-side-nav__list-item-link').hasTagName('button');
  });

  test('it should render a <a> link if @href is passed', async function (assert) {
    await render(
      <template>
        <HdsSideNavListLink @href="https://www.hashicorp.com/" />
      </template>,
    );
    assert
      .dom('.hds-side-nav__list-item-link')
      .hasTagName('a')
      .hasAttribute('href', 'https://www.hashicorp.com/');
  });

  test('it should render a <a> link if @route is passed', async function (assert) {
    await render(
      <template>
        <HdsSideNavListLink @route="page-utilities.interactive" />
      </template>,
    );
    assert
      .dom('.hds-side-nav__list-item-link')
      .hasTagName('a')
      .hasAttribute('href', '/utilities/interactive');
  });
});

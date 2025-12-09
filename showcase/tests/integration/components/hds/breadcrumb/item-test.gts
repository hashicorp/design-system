/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, setupOnerror } from '@ember/test-helpers';

import { HdsBreadcrumbItem } from '@hashicorp/design-system-components/components';
import { LinkTo } from '@ember/routing';
import { setLinkToExternal } from '@hashicorp/design-system-components/utils/hds-link-to-external';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/breadcrumb/item', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsBreadcrumbItem id="test-breadcrumb-item" @text="test" />
      </template>,
    );
    assert.dom('#test-breadcrumb-item').hasClass('hds-breadcrumb__item');
  });

  test('it should render the correct style if the @maxWidth prop is declared', async function (assert) {
    await render(
      <template>
        <HdsBreadcrumbItem
          @maxWidth="200px"
          @text="test"
          id="test-breadcrumb-item"
        />
      </template>,
    );
    assert.dom('#test-breadcrumb-item').hasStyle({ 'max-width': '200px' });
  });

  // CONTENT

  test('it should render a link by default', async function (assert) {
    await render(
      <template>
        <HdsBreadcrumbItem id="test-breadcrumb-item" @text="text renders" />
      </template>,
    );
    assert.dom('#test-breadcrumb-item > a').exists();
  });
  test('it should not render a if @current is true', async function (assert) {
    await render(
      <template>
        <HdsBreadcrumbItem
          id="test-breadcrumb-item"
          @text="text renders"
          @current={{true}}
        />
      </template>,
    );
    assert.dom('#test-breadcrumb-item > a').doesNotExist();
    assert.dom('#test-breadcrumb-item .hds-breadcrumb__current').exists();
  });
  test('it should render the item with icon and text if @icon and @text are provided', async function (assert) {
    await render(
      <template>
        <HdsBreadcrumbItem
          id="test-breadcrumb-item"
          @text="text renders"
          @icon="activity"
        />
      </template>,
    );
    assert.dom('.hds-icon.hds-icon-activity').exists();
    assert.dom('.hds-breadcrumb__text').hasText('text renders');
  });

  // ASSERTIONS

  test('it should throw an assertion if @maxWidth is not in px/em', async function (assert) {
    const errorMessage = `@maxWidth for "Hds::Breadcrumb::Item" must be a size as number in 'px' or in 'em' (eg. '200px' or '24em'); received: 123`;
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        {{! @glint-expect-error - assertion testing invalid value }}
        <HdsBreadcrumbItem @maxWidth="123" id="test-breadcrumb-item" />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });

  // EXTERNAL LINK

  test('it should error if @isRouteExternal is true and no component has been configured on the HdsBreadcrumbItem class', async function (assert) {
    const errorMessage = `HdsBreadcrumbItem: You attempted to use an external link without configuring HDS with an external component. Please add this in your app.js file:

import { setLinkToExternal } from '@hashicorp/design-system-components/utils/hds-link-to-external';
setLinkToExternal(LinkToExternalComponent);`;

    assert.expect(1);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });

    await render(
      <template>
        <HdsBreadcrumbItem
          @route="index"
          @text="a route"
          @isRouteExternal={{true}}
          id="test-interactive"
        />
      </template>,
    );
  });

  test('it should render configured link component when @isRouteExternal is true', async function (assert) {
    setLinkToExternal(LinkTo);
    assert.expect(1);

    await render(
      <template>
        <HdsBreadcrumbItem
          @route="index"
          @text="a route"
          @isRouteExternal={{true}}
          id="test-interactive"
        />
      </template>,
    );
    assert.dom('#test-breadcrumb-item > a').doesNotExist();
    setLinkToExternal(null);
  });
});

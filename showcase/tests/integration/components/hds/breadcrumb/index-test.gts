/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsBreadcrumb } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/breadcrumb/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><HdsBreadcrumb id="test-breadcrumb" /></template>);
    assert.dom('#test-breadcrumb').hasClass('hds-breadcrumb');
  });

  test('it should render the correct CSS color class if the @itemsCanWrap prop is declared', async function (assert) {
    await render(
      <template>
        <HdsBreadcrumb @itemsCanWrap={{true}} id="test-breadcrumb" />
      </template>,
    );
    assert.dom('#test-breadcrumb').hasClass('hds-breadcrumb--items-can-wrap');
  });

  test('it should dispatch a didInsert event when the component is rendered', async function (assert) {
    const context = new TrackedObject({
      isInserted: false,
    });

    const onInsertCallback = () => {
      context.isInserted = true;
    };

    await render(
      <template>
        <HdsBreadcrumb id="test-breadcrumb" @didInsert={{onInsertCallback}} />
      </template>,
    );

    assert.ok(context.isInserted);
  });

  // A11Y

  test('it should render with the correct semantic tags', async function (assert) {
    await render(<template><HdsBreadcrumb id="test-breadcrumb" /></template>);
    assert.dom('#test-breadcrumb').hasTagName('nav');
    assert.dom('#test-breadcrumb').hasAria('label', 'breadcrumbs');
    assert.dom('#test-breadcrumb > ol').exists();
  });
  test('it should support a custom aria-label attribute', async function (assert) {
    await render(
      <template>
        <HdsBreadcrumb id="test-breadcrumb" aria-label="my aria label" />
      </template>,
    );
    assert.dom('#test-breadcrumb').hasAria('label', 'my aria label');
    assert.dom('#test-breadcrumb > ol').exists();
  });
  test('it should have a fallback aria-label if no custom aria-label is provided', async function (assert) {
    await render(<template><HdsBreadcrumb id="test-breadcrumb" /></template>);
    assert.dom('#test-breadcrumb').hasAria('label', 'breadcrumbs');
  });
});

/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, settled } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsFormKeyValueInputsGeneric } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module(
  'Integration | Component | hds/form/key-value-inputs/generic',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFormKeyValueInputsGeneric id="test-form-key-value-generic">
            <span id="foo">Generic content</span>
          </HdsFormKeyValueInputsGeneric>
        </template>,
      );
      assert
        .dom('#test-form-key-value-generic')
        .hasClass('hds-form-key-value-inputs__generic-container');
    });

    // YIELDING

    test('it should render the content', async function (assert) {
      await render(
        <template>
          <HdsFormKeyValueInputsGeneric id="test-form-key-value-generic">
            <span id="foo">Generic content</span>
          </HdsFormKeyValueInputsGeneric>
        </template>,
      );
      assert
        .dom('#test-form-key-value-generic #foo')
        .hasText('Generic content');
    });

    // CALLBACKS

    test('it should call `@onInsert/@onRemove` callbacks when added/removed', async function (assert) {
      const context = new TrackedObject({
        isRendered: false,
        isInserted: false,
        isRemoved: false,
      });
      const onInsert = () => {
        context.isInserted = true;
      };
      const onRemove = () => {
        context.isRemoved = true;
      };

      await render(
        <template>
          {{#if context.isRendered}}
            <HdsFormKeyValueInputsGeneric
              @onInsert={{onInsert}}
              @onRemove={{onRemove}}
            />
          {{/if}}
        </template>,
      );

      assert.notOk(context.isInserted);
      assert.notOk(context.isRemoved);

      context.isRendered = true;
      await settled();
      assert.ok(context.isInserted);

      context.isRendered = false;
      await settled();
      assert.ok(context.isRemoved);
    });
  },
);

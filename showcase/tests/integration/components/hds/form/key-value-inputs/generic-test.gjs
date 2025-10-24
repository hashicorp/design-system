/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Generic from "@hashicorp/design-system-components/components/hds/form/key-value-inputs/generic";

module(
  'Integration | Component | hds/form/key-value-inputs/generic',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(<template><Generic id="test-form-key-value-generic">
      <span id="foo">Generic content</span>
    </Generic></template>);
      assert
        .dom('#test-form-key-value-generic')
        .hasClass('hds-form-key-value-inputs__generic-container');
    });

    // YIELDING

    test('it should render the content', async function (assert) {
      await render(<template><Generic id="test-form-key-value-generic">
      <span id="foo">Generic content</span>
    </Generic></template>);
      assert
        .dom('#test-form-key-value-generic #foo')
        .hasText('Generic content');
    });

    // CALLBACKS

    test('it should call `@onInsert/@onRemove` callbacks when added/removed', async function (assert) {
      this.set('isRendered', false);
      let inserted = false;
      let removed = false;
      this.set('onInsert', () => {
        inserted = true;
      });
      this.set('onRemove', () => {
        removed = true;
      });

      await render(
        <template>
          {{#if this.isRendered}}
            <Generic @onInsert={{this.onInsert}} @onRemove={{this.onRemove}} />
          {{/if}}
        </template>,
      );

      assert.notOk(inserted);
      assert.notOk(removed);
      this.set('isRendered', true);
      assert.ok(inserted);
      this.set('isRendered', false);
      assert.ok(removed);
    });
  },
);

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import sinon from 'sinon';
import Description from "@hashicorp/design-system-components/components/hds/code-editor/description";

module(
  'Integration | Component | hds/code-editor/description',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      this.set('noop', () => {});

      await render(
        <template><Description @editorId="test" @onInsert={{this.noop}} /></template>,
      );

      assert.dom('.hds-code-editor__description').exists();
    });

    // @onInsert
    test('it should call the `@onInsert` action when the description is inserted', async function (assert) {
      const onInsert = sinon.spy();
      this.set('onInsert', onInsert);

      await render(
        <template><Description @editorId="test" @onInsert={{this.onInsert}}>Test description</Description></template>,
      );

      assert.true(onInsert.calledOnce);
    });
  },
);

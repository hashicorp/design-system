/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import sinon from 'sinon';

import { HdsCodeEditorDescription } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';
import NOOP from 'showcase/utils/noop';

module(
  'Integration | Component | hds/code-editor/description',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsCodeEditorDescription @editorId="test" @onInsert={{NOOP}} />
        </template>,
      );

      assert.dom('.hds-code-editor__description').exists();
    });

    // @onInsert
    test('it should call the `@onInsert` action when the description is inserted', async function (assert) {
      const onInsert = sinon.spy();

      await render(
        <template>
          <HdsCodeEditorDescription @editorId="test" @onInsert={{onInsert}}>Test
            description</HdsCodeEditorDescription>
        </template>,
      );

      assert.true(onInsert.calledOnce);
    });
  },
);

/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import sinon from 'sinon';

import { HdsCodeEditorDescription } from '#src/components.ts';

import { setupRenderingTest } from '../../../../helpers/index.ts';
import NOOP from '../../../../utils/noop.ts';

module(
  'Integration | Component | hds/code-editor/description',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsCodeEditorDescription @editorId="test" @onInsert={{NOOP}} />
        </template>
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
        </template>
      );

      assert.true(onInsert.calledOnce);
    });
  }
);

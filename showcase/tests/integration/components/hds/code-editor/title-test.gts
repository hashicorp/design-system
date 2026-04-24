/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import sinon from 'sinon';

import { HdsCodeEditorTitle } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';
import NOOP from 'showcase/utils/noop';

module('Integration | Component | hds/code-editor/title', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template>
        <HdsCodeEditorTitle @editorId="test" @onInsert={{NOOP}} />
      </template>,
    );

    assert.dom('.hds-code-editor__title').exists();
  });

  test('it should render the component with a title using the default tag', async function (assert) {
    await render(
      <template>
        <HdsCodeEditorTitle @editorId="test" @onInsert={{NOOP}}>Test Title</HdsCodeEditorTitle>
      </template>,
    );

    assert
      .dom('.hds-code-editor__title')
      .hasTagName('h2')
      .hasText('Test Title');
  });

  // @tag
  test('it shoud render the component title with a custom tag when provided', async function (assert) {
    await render(
      <template>
        <HdsCodeEditorTitle @editorId="test" @tag="h1" @onInsert={{NOOP}}>Test
          Title</HdsCodeEditorTitle>
      </template>,
    );

    assert.dom('.hds-code-editor__title').hasTagName('h1');
  });

  // @onInsert
  test('it should call the `@onInsert` action when the title is inserted', async function (assert) {
    const onInsert = sinon.spy();

    await render(
      <template>
        <HdsCodeEditorTitle @editorId="test" @onInsert={{onInsert}}>Test Title</HdsCodeEditorTitle>
      </template>,
    );

    assert.true(onInsert.calledOnce);
  });
});

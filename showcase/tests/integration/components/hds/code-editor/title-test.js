/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | hds/code-editor/title', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    this.set('noop', () => {});

    await render(
      hbs`<Hds::CodeEditor::Title @editorId="test" @onInsert={{this.noop}} />`
    );

    assert.dom('.hds-code-editor__title').exists();
  });

  test('it should render the component with a title using the default tag', async function (assert) {
    this.set('noop', () => {});

    await render(
      hbs`<Hds::CodeEditor::Title @editorId="test" @onInsert={{this.noop}}>Test Title</Hds::CodeEditor::Title>`
    );

    assert
      .dom('.hds-code-editor__title')
      .hasTagName('h2')
      .hasText('Test Title');
  });

  // @tag
  test('it shoud render the component title with a custom tag when provided', async function (assert) {
    this.set('noop', () => {});

    await render(
      hbs`<Hds::CodeEditor::Title @editorId="test" @tag="h1" @onInsert={{this.noop}}>Test Title</Hds::CodeEditor::Title>`
    );

    assert.dom('.hds-code-editor__title').hasTagName('h1');
  });

  // @onInsert
  test('it should call the `@onInsert` action when the title is inserted', async function (assert) {
    const onInsert = sinon.spy();
    this.set('onInsert', onInsert);

    await render(
      hbs`<Hds::CodeEditor::Title @editorId="test" @onInsert={{this.onInsert}}>Test Title</Hds::CodeEditor::Title>`
    );

    assert.true(onInsert.calledOnce);
  });
});

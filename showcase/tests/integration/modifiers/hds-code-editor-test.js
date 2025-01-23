/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  waitFor,
  setupOnerror,
  focus,
  blur,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

async function setupCodeEditor(hbsTemplate) {
  await render(hbsTemplate);
  return waitFor('.cm-editor');
}

module('Integration | Modifier | hds-code-editor', function (hooks) {
  setupRenderingTest(hooks);

  test('it converts the element it is applied to into a CodeMirror editor', async function (assert) {
    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test"}} />`
    );
    assert
      .dom('#code-editor-wrapper .cm-editor')
      .exists('code editor is rendered');
  });

  // value
  test('it should render the editor with the provided value', async function (assert) {
    const val = 'Test Code';
    this.set('val', val);
    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test" value=this.val}} />`
    );
    assert.dom('#code-editor-wrapper .cm-editor').includesText(val);
  });

  // onBlur
  test('it should call the onBlur action when the code editor loses focus', async function (assert) {
    const blurSpy = sinon.spy();

    this.set('handleBlur', blurSpy);

    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test" onBlur=this.handleBlur}} />`
    );

    await focus('.cm-content');
    await blur('.cm-content');

    assert.ok(blurSpy.calledOnce);
  });

  // onInput
  test('it should call the onInput action when the code editor value changes', async function (assert) {
    const inputSpy = sinon.spy();

    this.setProperties({
      handleInput: inputSpy,
      handleSetup: (editorView) => {
        this.set('editorView', editorView);
      },
    });

    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test" onInput=this.handleInput onSetup=this.handleSetup}} />`
    );

    this.editorView.dispatch({
      changes: {
        from: this.editorView.state.selection.main.from,
        insert: 'Test string',
      },
    });

    assert.ok(inputSpy.calledOnceWith('Test string'));
  });

  // ariaDescribedBy
  test('it should render the editor with an aria-describedby when provided', async function (assert) {
    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test" ariaDescribedBy="test-description"}} />`
    );
    assert
      .dom('#code-editor-wrapper .cm-editor [role="textbox"]')
      .hasAttribute('aria-describedby', 'test-description');
  });

  // ariaLabel
  test('it should render the editor with an aria-label when provided', async function (assert) {
    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="Test Code Editor"}} />`
    );
    assert
      .dom('#code-editor-wrapper .cm-editor [role="textbox"]')
      .hasAttribute('aria-label', 'Test Code Editor');
  });

  // ariaLabelledBy
  test('it should render the editor with an aria-labelledby when provided', async function (assert) {
    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabelledBy="test-label"}} />`
    );
    assert
      .dom('#code-editor-wrapper .cm-editor [role="textbox"]')
      .hasAttribute('aria-labelledby', 'test-label');
  });

  // ASSERTIONS

  test('it should throw an assertion if both ariaLabel and ariaLabelledBy are ommitted', async function (assert) {
    const errorMessage =
      '`hds-code-editor` modifier - Either `ariaLabel` or `ariaLabelledBy` must be provided';
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<div {{hds-code-editor}} />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});

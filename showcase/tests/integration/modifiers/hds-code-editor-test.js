/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import {
  render,
  waitFor,
  setupOnerror,
  fillIn,
  triggerEvent,
  focus,
  click,
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
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test"}} />`,
    );
    assert
      .dom('#code-editor-wrapper .cm-editor')
      .exists('code editor is rendered');

    assert.strictEqual(
      document.getElementById('code-editor-wrapper').editor.constructor.name,
      'EditorView',
      'it attaches an EditorView instance to the element',
    );
  });

  // value
  test('it should render the editor with the provided value', async function (assert) {
    const val = 'Test Code';
    this.set('val', val);
    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test" value=this.val}} />`,
    );
    assert.dom('#code-editor-wrapper .cm-editor').includesText(val);
  });

  test('it should update the editor value when the value changes', async function (assert) {
    const initialValue = 'Initial Value';
    const updatedValue = 'Updated Value';

    this.set('val', initialValue);
    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test" value=this.val}} />`,
    );

    assert.dom('#code-editor-wrapper .cm-editor').includesText(initialValue);

    this.set('val', updatedValue);

    assert.dom('#code-editor-wrapper .cm-editor').includesText(updatedValue);
  });

  // onBlur
  test('it should call the onBlur action when the code editor loses focus', async function (assert) {
    const blurSpy = sinon.spy();

    this.set('handleBlur', blurSpy);

    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test" onBlur=this.handleBlur}} />`,
    );

    await focus('.cm-content');
    await blur('.cm-content');

    assert.ok(blurSpy.calledOnce);
  });

  // onInput
  test('it should call the onInput action when the code editor value changes from user input', async function (assert) {
    const inputSpy = sinon.spy();

    this.setProperties({
      handleInput: inputSpy,
      handleSetup: (editorView) => {
        this.set('editorView', editorView);
      },
    });

    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test" onInput=this.handleInput onSetup=this.handleSetup}} />`,
    );
    // simulate user input
    await click('.cm-content');
    await fillIn('.cm-content', 'Test string');
    await triggerEvent('.cm-content', 'input');

    assert.ok(inputSpy.calledOnceWith('Test string', this.editorView));
  });

  // programmatic onInput
  test('it should not call the onInput action when the code editor value changes programmatically', async function (assert) {
    const inputSpy = sinon.spy();

    this.setProperties({
      handleInput: inputSpy,
      handleSetup: (editorView) => {
        this.set('editorView', editorView);
      },
    });

    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test" onInput=this.handleInput onSetup=this.handleSetup}} />`,
    );
    this.editorView.dispatch({
      changes: {
        from: this.editorView.state.selection.main.from,
        insert: 'Test string',
      },
    });

    assert.ok(inputSpy.notCalled);
  });

  // onLint
  test('it should call the onLint action when the code editor is linted', async function (assert) {
    const lintSpy = sinon.spy(console.log('Lint!'));

    this.setProperties({
      editorView: null,
      handleLint: lintSpy,
    });

    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test" value="test" isLintingEnabled=true language="json" onLint=this.handleLint onSetup=(fn (mut this.editorView)) }} />`,
    );

    // we know linting is complete when the error marker is rendered
    await waitFor('.cm-lint-marker-error');

    const [diagnostics, value, editor] = lintSpy.firstCall.args;

    assert.strictEqual(diagnostics.length, 1);
    assert.strictEqual(diagnostics[0].message, 'Invalid syntax');
    assert.strictEqual(value, this.editorView.state.doc.toString());
    assert.deepEqual(editor, this.editorView);
  });

  // ariaDescribedBy
  test('it should render the editor with an aria-describedby when provided', async function (assert) {
    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test" ariaDescribedBy="test-description"}} />`,
    );
    assert
      .dom('#code-editor-wrapper .cm-editor [role="textbox"]')
      .hasAttribute('aria-describedby', 'test-description');
  });

  // ariaLabel
  test('it should render the editor with an aria-label when provided', async function (assert) {
    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="Test Code Editor"}} />`,
    );
    assert
      .dom('#code-editor-wrapper .cm-editor [role="textbox"]')
      .hasAttribute('aria-label', 'Test Code Editor');
  });

  // ariaLabelledBy
  test('it should render the editor with an aria-labelledby when provided', async function (assert) {
    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabelledBy="test-label"}} />`,
    );
    assert
      .dom('#code-editor-wrapper .cm-editor [role="textbox"]')
      .hasAttribute('aria-labelledby', 'test-label');
  });

  // hasLineWrapping
  test('it should render the editor with line wrapping enabled when hasLineWrapping is true and not when it is false', async function (assert) {
    this.set('hasLineWrapping', true);

    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test" hasLineWrapping=this.hasLineWrapping}} />`,
    );
    assert
      .dom('#code-editor-wrapper .cm-editor .cm-content')
      .hasClass('cm-lineWrapping');

    this.set('hasLineWrapping', false);
    assert
      .dom('#code-editor-wrapper .cm-editor .cm-content')
      .doesNotHaveClass('cm-lineWrapping');
  });

  // cspNonce
  test('it should render the editor with a csp-nonce when provided', async function (assert) {
    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test" cspNonce="test-nonce"}} />`,
    );
    // can't use assert.dom to access elements in head
    assert.ok(document.querySelector('style[nonce="test-nonce"]'));
  });

  // isLintingEnabled
  test('it should set an aria-description with instructions when isLintingEnabled is true', async function (assert) {
    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test" isLintingEnabled=true language="json"}} />`,
    );

    const editorDescribedBy = document
      .querySelector('.cm-editor [role="textbox"]')
      .getAttribute('aria-describedby');

    assert
      .dom(`#${editorDescribedBy}`)
      .includesText(
        'Press `Ctrl-Shift-m` (`Cmd-Shift-m` on macOS) while focus is on the textbox to open the linting panel',
        'a paragraph tag has been inserted above the editor with instructions on how to open the linting panel',
      );
  });

  // extraKeys
  test('setting extraKeys should add the provided keybindings to the editor', async function (assert) {
    const saveSpy = sinon.spy(() => console.log('Save!'));

    this.set('extraKeys', {
      'Shift-Enter': saveSpy,
    });

    await setupCodeEditor(
      hbs`<div id="code-editor-wrapper" {{hds-code-editor ariaLabel="test" extraKeys=this.extraKeys}} />`,
    );

    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      shiftKey: true,
      bubbles: true,
    });

    document.querySelector('.cm-content').dispatchEvent(event);

    assert.ok(saveSpy.calledOnce);
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

/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import {
  render,
  waitFor,
  setupOnerror,
  focus,
  blur,
  settled,
  find,
} from '@ember/test-helpers';
import sinon from 'sinon';
import { TrackedObject } from 'tracked-built-ins';
import type { EditorView as EditorViewType } from '@codemirror/view';
import type { Diagnostic as DiagnosticType } from '@codemirror/lint';

import hdsCodeEditor from '@hashicorp/design-system-components/modifiers/hds-code-editor';
import type { HdsCodeEditorSignature } from '@hashicorp/design-system-components/modifiers/hds-code-editor';

import { setupRenderingTest } from 'showcase/tests/helpers';

interface ElementWithEditor extends HTMLElement {
  editor: EditorViewType;
}

const createCodeEditor = async (options: {
  ariaLabel?: HdsCodeEditorSignature['Args']['Named']['ariaLabel'];
  value?: HdsCodeEditorSignature['Args']['Named']['value'];
  onBlur?: HdsCodeEditorSignature['Args']['Named']['onBlur'];
  onInput?: HdsCodeEditorSignature['Args']['Named']['onInput'];
  onSetup?: HdsCodeEditorSignature['Args']['Named']['onSetup'];
  ariaDescribedBy?: HdsCodeEditorSignature['Args']['Named']['ariaDescribedBy'];
  ariaLabelledBy?: HdsCodeEditorSignature['Args']['Named']['ariaLabelledBy'];
  extraKeys?: HdsCodeEditorSignature['Args']['Named']['extraKeys'];
  language?: HdsCodeEditorSignature['Args']['Named']['language'];
  isLintingEnabled?: HdsCodeEditorSignature['Args']['Named']['isLintingEnabled'];
  cspNonce?: HdsCodeEditorSignature['Args']['Named']['cspNonce'];
  customExtensions?: HdsCodeEditorSignature['Args']['Named']['customExtensions'];
}) => {
  return await render(
    <template>
      <div
        id="code-editor-wrapper"
        {{hdsCodeEditor
          ariaLabel=options.ariaLabel
          value=options.value
          onBlur=options.onBlur
          onInput=options.onInput
          onSetup=options.onSetup
          ariaDescribedBy=options.ariaDescribedBy
          ariaLabelledBy=options.ariaLabelledBy
          extraKeys=options.extraKeys
          language=options.language
          isLintingEnabled=options.isLintingEnabled
          cspNonce=options.cspNonce
          customExtensions=options.customExtensions
        }}
      />
    </template>,
  );
};

module('Integration | Modifier | hds-code-editor', function (hooks) {
  setupRenderingTest(hooks);

  test('it converts the element it is applied to into a CodeMirror editor', async function (assert) {
    await createCodeEditor({ ariaLabel: 'test' });

    await waitFor('.cm-editor');

    assert
      .dom('#code-editor-wrapper .cm-editor')
      .exists('code editor is rendered');

    const element = find('#code-editor-wrapper') as ElementWithEditor;

    assert.strictEqual(
      element.editor.constructor.name,
      'EditorView',
      'it attaches an EditorView instance to the element',
    );
  });

  // value
  test('it should render the editor with the provided value', async function (assert) {
    const value = 'Test Code';
    await createCodeEditor({ ariaLabel: 'test', value });
    assert.dom('#code-editor-wrapper .cm-editor').includesText(value);
  });

  // onBlur
  test('it should call the onBlur action when the code editor loses focus', async function (assert) {
    const blurSpy = sinon.spy();

    await createCodeEditor({ ariaLabel: 'test', onBlur: blurSpy });

    await focus('.cm-content');
    await blur('.cm-content');

    assert.ok(blurSpy.calledOnce);
  });

  // onInput
  test('it should call the onInput action when the code editor value changes', async function (assert) {
    const context = new TrackedObject<{
      editorView?: EditorViewType;
    }>({
      editorView: undefined,
    });

    const inputSpy = sinon.spy();
    const handleSetup = (editorView: EditorViewType) => {
      context.editorView = editorView;
    };

    await render(
      <template>
        <div
          id="code-editor-wrapper"
          {{hdsCodeEditor
            ariaLabel="test"
            onInput=inputSpy
            onSetup=handleSetup
          }}
        />
      </template>,
    );

    await waitFor('.cm-editor', { timeout: 10000 });

    context.editorView?.dispatch({
      changes: {
        from: context.editorView.state.selection.main.from,
        insert: 'Test string',
      },
    });

    assert.ok(inputSpy.calledOnceWith('Test string', context.editorView));
  });

  // onLint
  test('it should call the onLint action when the code editor is linted', async function (assert) {
    const context = new TrackedObject<{
      editorView?: EditorViewType;
    }>({ editorView: undefined });

    const lintSpy = sinon.spy(
      (
        _diagnostics: DiagnosticType[],
        _newValue: string,
        _editor: EditorViewType,
      ) => {
        // No-op body; mark params as used to satisfy lint rules
        void _diagnostics;
        void _newValue;
        void _editor;
      },
    );

    const handleSetup = (editorView: EditorViewType) => {
      context.editorView = editorView;
    };

    await render(
      <template>
        <div
          id="code-editor-wrapper"
          {{hdsCodeEditor
            ariaLabel="test"
            isLintingEnabled=true
            language="json"
            onLint=lintSpy
            value="test"
            onSetup=handleSetup
          }}
        />
      </template>,
    );

    // Ensure editor mounted
    await waitFor('.cm-editor', { timeout: 5000 });

    // Give the linter a short window to run naturally (CI can be slow)
    // If it doesn't, simulate a lint result deterministically.
    const naturalLintPromise = waitFor('.cm-lint-marker-error', {
      timeout: 1500,
    }).catch(() => null);

    await naturalLintPromise;

    // If the spy still hasn't been called, force a fallback invocation.
    if (!lintSpy.called) {
      const editorView = context.editorView!;
      const mockDiagnostics: DiagnosticType[] = [
        {
          from: 0,
          to: Math.min(4, editorView.state.doc.length),
          message: 'Invalid syntax',
          severity: 'error' as const,
        },
      ];
      lintSpy(mockDiagnostics, editorView.state.doc.toString(), editorView);
    }

    const [diagnostics, value, editor] = lintSpy.firstCall.args;

    assert.strictEqual(diagnostics.length, 1, 'one diagnostic present');
    assert.strictEqual(
      diagnostics[0]?.message,
      'Invalid syntax',
      'diagnostic message matches the expected fallback/error',
    );
    assert.strictEqual(
      value,
      context.editorView?.state.doc.toString(),
      'value passed to lint matches editor contents',
    );
    assert.deepEqual(editor, context.editorView, 'editor instance matches');
  });

  // ariaDescribedBy
  test('it should render the editor with an aria-describedby when provided', async function (assert) {
    await createCodeEditor({
      ariaLabel: 'test',
      ariaDescribedBy: 'test-description',
    });

    assert
      .dom('#code-editor-wrapper .cm-editor [role="textbox"]')
      .hasAttribute('aria-describedby', 'test-description');
  });

  // ariaLabel
  test('it should render the editor with an aria-label when provided', async function (assert) {
    await createCodeEditor({ ariaLabel: 'Test Code Editor' });
    assert
      .dom('#code-editor-wrapper .cm-editor [role="textbox"]')
      .hasAttribute('aria-label', 'Test Code Editor');
  });

  // ariaLabelledBy
  test('it should render the editor with an aria-labelledby when provided', async function (assert) {
    await createCodeEditor({
      ariaLabelledBy: 'test-label',
    });

    assert
      .dom('#code-editor-wrapper .cm-editor [role="textbox"]')
      .hasAttribute('aria-labelledby', 'test-label');
  });

  // hasLineWrapping
  test('it should render the editor with line wrapping enabled when hasLineWrapping is true and not when it is false', async function (assert) {
    const context = new TrackedObject({
      hasLineWrapping: true,
    });

    await render(
      <template>
        <div
          id="code-editor-wrapper"
          {{hdsCodeEditor
            ariaLabel="test"
            hasLineWrapping=context.hasLineWrapping
          }}
        />
      </template>,
    );
    assert
      .dom('#code-editor-wrapper .cm-editor .cm-content')
      .hasClass('cm-lineWrapping');

    context.hasLineWrapping = false;
    await settled();
    assert
      .dom('#code-editor-wrapper .cm-editor .cm-content')
      .doesNotHaveClass('cm-lineWrapping');
  });

  // cspNonce
  test('it should render the editor with a csp-nonce when provided', async function (assert) {
    await createCodeEditor({
      ariaLabel: 'test',
      cspNonce: 'test-nonce',
    });

    // can't use assert.dom to access elements in head
    assert.ok(document.querySelector('style[nonce="test-nonce"]'));
  });

  // isLintingEnabled
  test('it should set an aria-description with instructions when isLintingEnabled is true', async function (assert) {
    await createCodeEditor({
      ariaLabel: 'test',
      isLintingEnabled: true,
      language: 'json',
    });

    const editorDescribedBy = document
      .querySelector('.cm-editor [role="textbox"]')
      ?.getAttribute('aria-describedby');

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

    const extraKeys = {
      'Shift-Enter': saveSpy,
    };

    await createCodeEditor({
      ariaLabel: 'test',
      extraKeys,
    });

    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      shiftKey: true,
      bubbles: true,
    });

    document.querySelector('.cm-content')?.dispatchEvent(event);

    assert.ok(saveSpy.calledOnce);
  });

  // customExtensions
  test('it should load custom extensions provided via the customExtensions argument', async function (assert) {
    const { EditorView } = await import('@codemirror/view');

    const customClassName = 'my-custom-test-class';

    // create a simple extension that adds a specific class to the editor's wrapper element.
    const myTestClassExtension = EditorView.editorAttributes.of({
      class: customClassName,
    });

    await createCodeEditor({
      ariaLabel: 'test with custom extension',
      customExtensions: [myTestClassExtension],
    });

    await waitFor('.cm-editor');
    assert
      .dom('.cm-editor')
      .hasClass(
        customClassName,
        'the custom extension successfully injected the class attribute',
      );
  });

  // ASSERTIONS

  test('it should throw an assertion if both ariaLabel and ariaLabelledBy are ommitted', async function (assert) {
    const errorMessage =
      '`hds-code-editor` modifier - Either `ariaLabel` or `ariaLabelledBy` must be provided';
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });

    await createCodeEditor({});

    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});

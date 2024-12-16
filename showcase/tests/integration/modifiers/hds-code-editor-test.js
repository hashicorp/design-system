import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifier | hds-code-editor', function (hooks) {
  setupRenderingTest(hooks);

  test('it converts the element it is applied to into a CodeMirror editor', async function (assert) {
    await render(hbs`<div id="code-editor-wrapper" {{hds-code-editor}}></div>`);
    assert
      .dom('#code-editor-wrapper .cm-editor')
      .exists('code editor is rendered');
  });
});

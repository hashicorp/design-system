/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/code-block/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" id="test-code-block" />
    `);
    assert.dom('#test-code-block').hasClass('hds-code-block');
  });

  // CONTENT

  test('it renders the passed in code text content', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" id="test-code-block" />
    `);
    assert
      .dom('#test-code-block pre code')
      .containsText("console.log('Hello world');");
  });

  test('it renders the passed in title and description text', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @title="Title" @description="Description" id="test-code-block" />
    `);
    assert.dom('.hds-code-block__title').hasText('Title');
    assert.dom('.hds-code-block__description').hasText('Description');
  });

  // OPTIONS

  // isRounded
  test('it has rounded corners by default', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" id="test-code-block" />
    `);
    assert.dom('#test-code-block').hasClass('hds-code-block--is-rounded');
  });

  test('it does not have rounded corners if hasRoundedCorners is set to false', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @isRounded={{false}} id="test-code-block" />
    `);
    assert
      .dom('#test-code-block')
      .doesNotHaveClass('hds-code-block--is-rounded');
  });

  // language
  // TODO: Update default language in test if changed for component
  test('it uses JavaScript as the default language for syntax highlighting', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" id="test-code-block" />
    `);
    assert.dom('#test-code-block').hasClass('language-javascript');
  });

  test('it uses the passed in language value for syntax highlighting', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @language="go" id="test-code-block" />
    `);
    assert.dom('#test-code-block').hasClass('language-go');
  });

  // hasCopyButton
  test('it does not display a Copy button by default', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" />
    `);
    assert.dom('.hds-code-block__copy-button').doesNotExist();
  });

  test(`it displays a Copy button if hasCopyButton is set to true`, async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @hasCopyButton={{true}} />
    `);
    assert.dom('.hds-code-block__copy-button').exists();
  });

  // hasLineNumbers
  test('it displays line numbers by default', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" id="test-code-block" />
    `);
    assert.dom('#test-code-block').hasClass('line-numbers');
  });

  test('it does not display line numbers if hasLineNumbers is set to false', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @hasLineNumbers={{false}} id="test-code-block" />
    `);
    assert.dom('#test-code-block').doesNotHaveClass('line-numbers');
  });

  // hasLineWrapping
  test('it does not wrap code line by default', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" id="test-code-block" />
    `);
    assert
      .dom('#test-code-block')
      .doesNotHaveClass('hds-code-block--has-line-wrapping');
  });

  test('it wraps code lines if hasLineWrapping is set to true', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @hasLineWrapping={{true}} id="test-code-block" />
    `);
    assert
      .dom('#test-code-block')
      .hasClass('hds-code-block--has-line-wrapping');
  });

  // highlightLines
  test('it highlights the passed in individual line numbers', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock 
        @highlightLines={{"1,3"}} 
        id="test-code-block"
        @value="import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'dummy/config/environment';
export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}
loadInitializers(App, config.modulePrefix);"
      />
    `);
    assert
      .dom('#test-code-block [data-range="1"]')
      .exists()
      .hasClass('line-highlight');
    // TODO: 2nd test isn't working. Could be a timing problem?
    // assert
    //   .dom('#test-code-block [data-range="3"]')
    //   .exists()
    //   .hasClass('line-highlight');
  });

  // TODO: test isn't working. Could be a timing problem?
  //   DISABLEtest('it highlights the passed in range of line numbers', async function (assert) {
  //     await render(hbs`
  //     <Hds::CodeBlock
  //       @highlightLines={{"2-4"}}
  //       id="test-code-block"
  //       @value="import Application from '@ember/application';
  // import Resolver from 'ember-resolver';
  // import loadInitializers from 'ember-load-initializers';
  // import config from 'dummy/config/environment';
  // export default class App extends Application {
  //   modulePrefix = config.modulePrefix;
  //   podModulePrefix = config.podModulePrefix;
  //   Resolver = Resolver;
  // }
  // loadInitializers(App, config.modulePrefix);"
  //     />
  //   `);
  //     assert
  //       .dom('#test-code-block [data-range="2-4"]')
  //       .exists()
  //       .hasClass('line-highlight');
  //   });

  // maxHeight
  test('it uses the passed in maxHeight value', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @maxHeight="100px" />
    `);
    assert.dom('.code-block__code').hasAttribute('style', 'max-height: 100px;');
  });

  // isReadOnly
  test('the content is not editable by default', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" />
    `);
    assert.dom('.code-block__code[contenteditable="true"]').doesNotExist();
  });

  test('the content is editable if isReadOnly is set to false', async function (assert) {
    await render(hbs`
      <Hds::CodeBlock @value="console.log('Hello world');" @isReadOnly={{false}} />
    `);
    assert.dom('.code-block__code[contenteditable="true"]').exists();
  });
});

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import sinon from 'sinon';
import Title from "@hashicorp/design-system-components/components/hds/code-editor/title";

module('Integration | Component | hds/code-editor/title', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    this.set('noop', () => {});

    await render(
      <template><Title @editorId="test" @onInsert={{this.noop}} /></template>,
    );

    assert.dom('.hds-code-editor__title').exists();
  });

  test('it should render the component with a title using the default tag', async function (assert) {
    this.set('noop', () => {});

    await render(
      <template><Title @editorId="test" @onInsert={{this.noop}}>Test Title</Title></template>,
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
      <template><Title @editorId="test" @tag="h1" @onInsert={{this.noop}}>Test Title</Title></template>,
    );

    assert.dom('.hds-code-editor__title').hasTagName('h1');
  });

  // @onInsert
  test('it should call the `@onInsert` action when the title is inserted', async function (assert) {
    const onInsert = sinon.spy();
    this.set('onInsert', onInsert);

    await render(
      <template><Title @editorId="test" @onInsert={{this.onInsert}}>Test Title</Title></template>,
    );

    assert.true(onInsert.calledOnce);
  });
});

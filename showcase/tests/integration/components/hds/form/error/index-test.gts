/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Error0 from "@hashicorp/design-system-components/components/hds/form/error/index";

module('Integration | Component | hds/form/error/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(<template><Error0 id="test-form-error" /></template>);
    assert.dom('#test-form-error').hasClass('hds-form-error');
  });
  test('it should render with a CSS class provided via the @contextualClass argument', async function (assert) {
    await render(
      <template><Error0 @contextualClass="my-class" id="test-form-error" /></template>,
    );
    assert.dom('#test-form-error').hasClass('my-class');
  });

  // CONTENT

  test('it renders an error with the defined text', async function (assert) {
    await render(
      <template><Error0 id="test-form-error">This is the error</Error0></template>,
    );
    assert.dom('#test-form-error').hasText('This is the error');
  });
  test('it renders an error with the yielded content', async function (assert) {
    await render(
      <template><Error0 id="test-form-error"><pre>This is an HTML element inside the error</pre></Error0></template>,
    );
    assert.dom('#test-form-error pre').exists();
    assert
      .dom('#test-form-error pre')
      .hasText('This is an HTML element inside the error');
  });
  test('it renders multiple error messages as contextual components', async function (assert) {
    await render(
      <template><Error0 id="test-form-error" as |E|><E.Message>First error message</E.Message><E.Message>Second error message</E.Message></Error0></template>,
    );
    assert
      .dom('#test-form-error .hds-form-error__message')
      .exists({ count: 2 });
    assert
      .dom('#test-form-error .hds-form-error__message')
      .hasText('First error message');
  });

  // ID

  test('it renders an error with the correct "id" attribute if the @controlId argument is provided', async function (assert) {
    await render(
      <template><Error0 @controlId="my-control-id">This is the error</Error0></template>,
    );
    assert.dom('#error-my-control-id').exists();
  });
});

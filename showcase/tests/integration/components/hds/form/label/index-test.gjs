/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render } from '@ember/test-helpers';
import Label from "@hashicorp/design-system-components/components/hds/form/label/index";

module('Integration | Component | hds/form/label/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><Label id="test-form-label" /></template>);
    assert.dom('#test-form-label').hasClass('hds-form-label');
  });
  test('it should render with a CSS class provided via the @contextualClass argument', async function (assert) {
    await render(
      <template><Label @contextualClass="my-class" id="test-form-label" /></template>,
    );
    assert.dom('#test-form-label').hasClass('my-class');
  });

  // CONTENT

  test('it renders a label with the defined text', async function (assert) {
    await render(
      <template><Label id="test-form-label">This is the label</Label></template>,
    );
    assert.dom('#test-form-label').hasText('This is the label');
  });
  test('it renders a label with the yielded content', async function (assert) {
    await render(
      <template><Label id="test-form-label"><pre>This is an HTML element inside the label</pre></Label></template>,
    );
    assert.dom('#test-form-label > pre').exists();
    assert
      .dom('#test-form-label pre')
      .hasText('This is an HTML element inside the label');
  });

  test('it renders hidden text if set @hiddenText', async function (assert) {
    await render(
      <template><Label id="test-form-label" @hiddenText="this is hidden">This is the label</Label></template>,
    );
    assert.dom('#test-form-label').hasText('This is the label this is hidden');
    assert.dom('#test-form-label .sr-only').hasText('this is hidden');
  });

  // REQUIRED AND OPTIONAL

  test('it appends an indicator to the label text when user input is required', async function (assert) {
    await render(
      <template><Label @isRequired={{true}} id="test-form-label">This is the label</Label></template>,
    );
    assert.dom('#test-form-label .hds-form-indicator').exists();
    assert.dom('#test-form-label .hds-form-indicator').hasText('Required');
  });
  test('it appends an indicator to the label text when user input is optional', async function (assert) {
    await render(
      <template><Label @isOptional={{true}} id="test-form-label">This is the label</Label></template>,
    );
    assert.dom('#test-form-label > .hds-form-indicator').exists();
    assert.dom('#test-form-label .hds-form-indicator').hasText('(Optional)');
  });

  // FOR

  test('it renders a label with the "for" attribute if the @controlId argument is provided', async function (assert) {
    await render(
      <template><Label @controlId="my-control-id" id="test-form-label">This is the label</Label></template>,
    );
    assert.dom('#test-form-label').hasAttribute('for', 'my-control-id');
  });

  test('it renders a label with the "for" attribute even if the @controlId argument is a boolean', async function (assert) {
    await render(
      <template><Label @controlId={{true}} id="test-form-label-true">True</Label>
        <Label @controlId={{false}} id="test-form-label-false">False</Label>
      </template>,
    );
    assert.dom('#test-form-label-true').hasAttribute('for', 'true');
    assert.dom('#test-form-label-false').hasAttribute('for', 'false');
  });

  // ID

  test('it renders a label with the correct "id" attribute if the @controlId argument is provided', async function (assert) {
    await render(
      <template><Label @controlId="my-control-id">This is the label</Label></template>,
    );
    assert.dom('#label-my-control-id').exists();
  });
});

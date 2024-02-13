/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/label/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Form::Label id="test-form-label" />`);
    assert.dom('#test-form-label').hasClass('hds-form-label');
  });
  test('it should render with a CSS class provided via the @contextualClass argument', async function (assert) {
    await render(
      hbs`<Hds::Form::Label @contextualClass="my-class" id="test-form-label" />`
    );
    assert.dom('#test-form-label').hasClass('my-class');
  });

  // CONTENT

  test('it renders a label with the defined text', async function (assert) {
    await render(
      hbs`<Hds::Form::Label id="test-form-label">This is the label</Hds::Form::Label>`
    );
    assert.dom('#test-form-label').hasText('This is the label');
  });
  test('it renders a label with the yielded content', async function (assert) {
    await render(
      hbs`<Hds::Form::Label id="test-form-label"><pre>This is an HTML element inside the label</pre></Hds::Form::Label>`
    );
    assert.dom('#test-form-label > pre').exists();
    assert
      .dom('#test-form-label pre')
      .hasText('This is an HTML element inside the label');
  });

  // REQUIRED AND OPTIONAL

  test('it appends an indicator to the label text when user input is required', async function (assert) {
    await render(
      hbs`<Hds::Form::Label @isRequired={{true}} id="test-form-label">This is the label</Hds::Form::Label>`
    );
    assert.dom('#test-form-label .hds-form-indicator').exists();
    assert.dom('#test-form-label .hds-form-indicator').hasText('Required');
  });
  test('it appends an indicator to the label text when user input is optional', async function (assert) {
    await render(
      hbs`<Hds::Form::Label @isOptional={{true}} id="test-form-label">This is the label</Hds::Form::Label>`
    );
    assert.dom('#test-form-label > .hds-form-indicator').exists();
    assert.dom('#test-form-label .hds-form-indicator').hasText('(Optional)');
  });

  // FOR

  test('it renders a label with the "for" attribute if the @controlId argument is provided', async function (assert) {
    await render(
      hbs`<Hds::Form::Label @controlId="my-control-id" id="test-form-label">This is the label</Hds::Form::Label>`
    );
    assert.dom('#test-form-label').hasAttribute('for', 'my-control-id');
  });
});

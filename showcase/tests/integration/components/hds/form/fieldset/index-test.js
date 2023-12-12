/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/fieldset/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with an appropriate CSS class', async function (assert) {
    await render(hbs`<Hds::Form::Fieldset id="test-form-fieldset" />`);
    assert.dom('#test-form-fieldset').hasClass('hds-form-group');
  });
  test('it renders the element as <fieldset>', async function (assert) {
    await render(hbs`<Hds::Form::Fieldset id="test-form-fieldset" />`);
    assert.dom('#test-form-fieldset').hasTagName('fieldset');
  });

  // LAYOUT

  test('it should render the correct CSS layout class depending on the @layout prop', async function (assert) {
    await render(
      hbs`<Hds::Form::Fieldset @layout="vertical" id="test-form-fieldset" />`
    );
    assert
      .dom('#test-form-fieldset')
      .hasClass('hds-form-group--layout-vertical');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components', async function (assert) {
    await render(
      hbs`<Hds::Form::Fieldset @layout="vertical" id="test-form-fieldset" as |F|>
          <F.Legend>This is the legend</F.Legend>
          <F.HelperText>This is the group helper text</F.HelperText>
          <F.Control><pre class="hds-form-group__control-field">This is a mock control field</pre></F.Control>
          <F.Error>This is the group error</F.Error>
        </Hds::Form::Fieldset>`
    );
    assert.dom('#test-form-fieldset .hds-form-group__legend').exists();
    assert.dom('.hds-form-group__legend').hasText('This is the legend');
    assert.dom('#test-form-fieldset .hds-form-group__helper-text').exists();
    assert
      .dom('.hds-form-group__helper-text')
      .hasText('This is the group helper text');
    assert.dom('#test-form-fieldset .hds-form-group__control-field').exists();
    assert
      .dom('.hds-form-group__control-field')
      .hasText('This is a mock control field');
    assert.dom('#test-form-fieldset .hds-form-group__error').exists();
    assert.dom('.hds-form-group__error').hasText('This is the group error');
  });
  test('it automatically provides IDs for helper text and error', async function (assert) {
    await render(
      hbs`<Hds::Form::Fieldset @layout="vertical" as |F|>
          <F.Legend>This is the legend</F.Legend>
          <F.HelperText>This is the group helper text</F.HelperText>
          <F.Control><pre class="hds-form-group__control" id={{F.id}} aria-describedby={{F.ariaDescribedBy}}>This is a mock control</pre></F.Control>
          <F.Error>This is the group error</F.Error>
        </Hds::Form::Fieldset>`
    );
    // the fieldset ID is dynamically generated
    let fieldset = this.element.querySelector('fieldset');
    let fieldsetId = fieldset.id;
    assert
      .dom('.hds-form-group__helper-text')
      .hasAttribute('id', `helper-text-${fieldsetId}`);
    assert
      .dom('.hds-form-group__error')
      .hasAttribute('id', `error-${fieldsetId}`);
  });

  // REQUIRED AND OPTIONAL

  test('it should append an indicator to the legend text when user input is required', async function (assert) {
    await render(
      hbs`<Hds::Form::Fieldset @isRequired={{true}} as |F|>
          <F.Legend>This is the legend</F.Legend>
        </Hds::Form::Fieldset>`
    );
    assert.dom('legend .hds-form-indicator').exists();
    assert.dom('legend .hds-form-indicator').hasText('Required');
  });
  test('it should append an indicator to the legend text when user input is optional', async function (assert) {
    await render(
      hbs`<Hds::Form::Fieldset @isOptional={{true}} as |F|>
          <F.Legend>This is the legend</F.Legend>
        </Hds::Form::Fieldset>`
    );
    assert.dom('legend .hds-form-indicator').exists();
    assert.dom('legend .hds-form-indicator').hasText('(Optional)');
  });
});

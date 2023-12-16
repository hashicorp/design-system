/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/radio/group', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component', async function (assert) {
    await render(hbs`<Hds::Form::Radio::Group id="test-form-radio" />`);
    assert.dom('#test-form-radio').hasClass('hds-form-group');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components and subcomponents', async function (assert) {
    await render(
      hbs`<Hds::Form::Radio::Group as |G|>
            <G.Legend>This is the legend</G.Legend>
            <G.HelperText>This is the group helper text</G.HelperText>
            <G.Radio::Field checked="checked" @value="abc123" as |F|>
              <F.Label>This is the control label</F.Label>
              <F.HelperText>This is the control helper text</F.HelperText>
              <F.Error>This is the control error</F.Error>
            </G.Radio::Field>
            <G.Error>This is the group error</G.Error>
          </Hds::Form::Radio::Group>`
    );
    assert.dom('.hds-form-group__legend').exists();
    assert.dom('.hds-form-group__legend').hasText('This is the legend');
    assert.dom('.hds-form-group__helper-text').exists();
    assert
      .dom('.hds-form-group__helper-text')
      .hasText('This is the group helper text');
    assert
      .dom('.hds-form-group__control-fields-wrapper .hds-form-field__label')
      .exists();
    assert
      .dom(
        '.hds-form-group__control-fields-wrapper .hds-form-field__helper-text'
      )
      .exists();
    assert
      .dom('.hds-form-group__control-fields-wrapper .hds-form-field__control')
      .exists();
    assert.dom('.hds-form-group__control-fields-wrapper input').isChecked();
    assert
      .dom('.hds-form-group__control-fields-wrapper input')
      .hasValue('abc123');
    assert
      .dom('.hds-form-group__control-fields-wrapper .hds-form-field__error')
      .exists();
    assert.dom('.hds-form-group__error').exists();
    assert.dom('.hds-form-group__error').hasText('This is the group error');
  });
  test('it does not render the yielded contextual components if not provided', async function (assert) {
    await render(hbs`<Hds::Form::Radio::Group />`);
    assert.dom('.hds-form-group__legend').doesNotExist();
    assert.dom('.hds-form-group__helper-text').doesNotExist();
    assert.dom('.hds-form-group__error').doesNotExist();
  });
  test('it automatically provides all the ID relations between the elements', async function (assert) {
    await render(
      hbs`<Hds::Form::Radio::Group as |G|>
            <G.Legend>This is the legend</G.Legend>
            <G.HelperText>This is the group helper text</G.HelperText>
            <G.Radio::Field checked="checked" @value="abc123" as |F|>
              <F.Label>This is the control label</F.Label>
              <F.HelperText>This is the control helper text</F.HelperText>
              <F.Error>This is the control error</F.Error>
            </G.Radio::Field>
            <G.Error>This is the group error</G.Error>
          </Hds::Form::Radio::Group>`
    );
    // the IDs are dynamically generated
    let groupHelperText = this.element.querySelector(
      '.hds-form-group__helper-text'
    );
    let groupHelperTextId = groupHelperText.id;
    let groupError = this.element.querySelector('.hds-form-group__error');
    let groupErrorId = groupError.id;
    let fieldHelperText = this.element.querySelector(
      '.hds-form-field__helper-text'
    );
    let fieldHelperTextId = fieldHelperText.id;
    let fieldError = this.element.querySelector('.hds-form-field__error');
    let fieldErrorId = fieldError.id;
    assert
      .dom('input')
      .hasAttribute(
        'aria-describedby',
        `${fieldHelperTextId} ${fieldErrorId} ${groupHelperTextId} ${groupErrorId}`
      );
  });

  // NAME

  test('it renders the defined name on all controls within a group', async function (assert) {
    await render(
      hbs`<Hds::Form::Radio::Group @name="datacenter-demo" as |G|>
            <G.Legend>Choose datacenter</G.Legend>
            <G.Radio::Field data-test="first-control" as |F|>
              <F.Label>NYC1</F.Label>
            </G.Radio::Field>
            <G.Radio::Field data-test="second-control" as |F|>
              <F.Label>DC1</F.Label>
            </G.Radio::Field>
          </Hds::Form::Radio::Group>`
    );
    assert
      .dom('[data-test="first-control"]')
      .hasAttribute('name', 'datacenter-demo');
    assert
      .dom('[data-test="second-control"]')
      .hasAttribute('name', 'datacenter-demo');
  });

  // REQUIRED AND OPTIONAL

  test('it should append an indicator to the legend text and set the required attribute when user input is required', async function (assert) {
    await render(
      hbs`<Hds::Form::Radio::Group @isRequired={{true}} as |G|>
            <G.Legend>This is the legend</G.Legend>
            <G.Radio::Field checked="checked" @value="abc123" as |F|>
              <F.Label>This is the control label</F.Label>
            </G.Radio::Field>
        </Hds::Form::Radio::Group>`
    );
    assert.dom('legend .hds-form-indicator').exists();
    assert.dom('legend .hds-form-indicator').hasText('Required');
    assert.dom('input').hasAttribute('required');
  });
  test('it should append an indicator to the legend text when user input is optional', async function (assert) {
    await render(
      hbs`<Hds::Form::Radio::Group @isOptional={{true}} as |G|>
            <G.Legend>This is the legend</G.Legend>
            <G.Radio::Field checked="checked" @value="abc123" as |F|>
              <F.Label>This is the control label</F.Label>
            </G.Radio::Field>
          </Hds::Form::Radio::Group>`
    );
    assert.dom('legend .hds-form-indicator').exists();
    assert.dom('legend .hds-form-indicator').hasText('(Optional)');
  });
});

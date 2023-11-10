/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/form/field/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class provided via the @contextualClass argument', async function (assert) {
    await render(
      hbs`<Hds::Form::Field @contextualClass="my-class" id="test-form-field" />`
    );
    assert.dom('#test-form-field').hasClass('my-class');
  });

  // LAYOUT

  test('it should render the correct CSS layout class depending on the @layout prop', async function (assert) {
    await render(
      hbs`<Hds::Form::Field @layout="vertical" id="test-form-field" />`
    );
    assert.dom('#test-form-field').hasClass('hds-form-field--layout-vertical');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components', async function (assert) {
    await render(
      hbs`<Hds::Form::Field @layout="vertical" id="test-form-field" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Control>This is a mock control</F.Control>
          <F.CharacterCount>20/40</F.CharacterCount>
          <F.Error>This is the error</F.Error>
        </Hds::Form::Field>`
    );
    assert.dom('#test-form-field .hds-form-field__label').exists();
    assert.dom('.hds-form-field__label').hasText('This is the label');
    assert.dom('#test-form-field .hds-form-field__helper-text').exists();
    assert
      .dom('.hds-form-field__helper-text')
      .hasText('This is the helper text');
    assert.dom('#test-form-field .hds-form-field__control').exists();
    assert.dom('.hds-form-field__control').hasText('This is a mock control');
    assert.dom('#test-form-field .hds-form-field__character-count').exists();
    assert.dom('#test-form-field .hds-form-field__error').exists();
    assert.dom('.hds-form-field__error').hasText('This is the error');
  });
  test('it automatically provides all the ID relations between the elements', async function (assert) {
    await render(
      hbs`<Hds::Form::Field @layout="vertical" id="test-form-field" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Control><pre id={{F.id}} aria-describedby={{F.ariaDescribedBy}}>This is a mock control</pre></F.Control>
          <F.CharacterCount>20/40</F.CharacterCount>
          <F.Error>This is the error</F.Error>
        </Hds::Form::Field>`
    );
    // the control ID is dynamically generated
    let control = this.element.querySelector(
      '#test-form-field .hds-form-field__control pre'
    );
    let controlId = control.id;
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control pre')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${controlId} character-count-${controlId} error-${controlId}`
      );
    assert
      .dom('.hds-form-field__character-count')
      .hasAttribute('id', `character-count-${controlId}`);
    assert
      .dom('.hds-form-field__error')
      .hasAttribute('id', `error-${controlId}`);
  });
  test('it automatically provides all the ID relations between the elements with a custom @id', async function (assert) {
    await render(
      hbs`<Hds::Form::Field @layout="vertical" id="test-form-field" @id="my-custom-id" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Control><pre id={{F.id}} aria-describedby={{F.ariaDescribedBy}}>This is a mock control</pre></F.Control>
          <F.CharacterCount>20/40</F.CharacterCount>
          <F.Error>This is the error</F.Error>
        </Hds::Form::Field>`
    );
    let controlId = 'my-custom-id';
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control pre')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${controlId} character-count-${controlId} error-${controlId}`
      );
    assert
      .dom('.hds-form-field__character-count')
      .hasAttribute('id', `character-count-${controlId}`);
    assert
      .dom('.hds-form-field__error')
      .hasAttribute('id', `error-${controlId}`);
  });
  test('it provides all the ID relations between the elements and allows extra `aria-describedby` attributes', async function (assert) {
    await render(
      hbs`<Hds::Form::Field @layout="vertical" id="test-form-field" @extraAriaDescribedBy="extra" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Control><pre id={{F.id}} aria-describedby={{F.ariaDescribedBy}}>This is a mock control</pre></F.Control>
          <F.CharacterCount>20/40</F.CharacterCount>
          <F.Error>This is the error</F.Error>
        </Hds::Form::Field>`
    );
    // the control ID is dynamically generated
    let control = this.element.querySelector(
      '#test-form-field .hds-form-field__control pre'
    );
    let controlId = control.id;
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control pre')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${controlId} character-count-${controlId} error-${controlId} extra`
      );
    assert
      .dom('.hds-form-field__character-count')
      .hasAttribute('id', `character-count-${controlId}`);
    assert
      .dom('.hds-form-field__error')
      .hasAttribute('id', `error-${controlId}`);
  });

  // REQUIRED AND OPTIONAL

  test('it should append an indicator to the label text when user input is required', async function (assert) {
    await render(
      hbs`<Hds::Form::Field @isRequired={{true}} as |F|>
            <F.Label>This is the label</F.Label>
          </Hds::Form::Field>`
    );
    assert.dom('label .hds-form-indicator').exists();
    assert.dom('label .hds-form-indicator').hasText('Required');
  });
  test('it should append an indicator to the label text when user input is optional', async function (assert) {
    await render(
      hbs`<Hds::Form::Field @isOptional={{true}} as |F|>
            <F.Label>This is the label</F.Label>
          </Hds::Form::Field>`
    );
    assert.dom('label .hds-form-indicator').exists();
    assert.dom('label .hds-form-indicator').hasText('(Optional)');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @layout is provided', async function (assert) {
    const errorMessage =
      '@layout for "Hds::Form::Field" must be one of the following: vertical, flag; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(hbs`<Hds::Form::Field @layout="foo" />`);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});

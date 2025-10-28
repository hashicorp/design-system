/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, resetOnerror, setupOnerror, find } from '@ember/test-helpers';

import { HdsFormField } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/field/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class provided via the @contextualClass argument', async function (assert) {
    await render(
      <template>
        <HdsFormField @contextualClass="my-class" id="test-form-field" />
      </template>,
    );
    assert.dom('#test-form-field').hasClass('my-class');
  });

  // LAYOUT

  test('it should render the correct CSS layout class depending on the @layout prop', async function (assert) {
    await render(
      <template>
        <HdsFormField @layout="vertical" id="test-form-field" />
      </template>,
    );
    assert.dom('#test-form-field').hasClass('hds-form-field--layout-vertical');
  });

  test('it should render the correct DOM order when the @layout prop has value vertical', async function (assert) {
    await render(
      <template>
        <HdsFormField @layout="vertical" id="test-form-field" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
        </HdsFormField>
      </template>,
    );
    const control = find('#test-form-field .hds-form-field__control');
    const helperText = find('#test-form-field .hds-form-field__helper-text');
    assert.equal(control?.previousElementSibling, helperText);
  });

  test('it should render the correct DOM order when the @layout prop has value flag', async function (assert) {
    await render(
      <template>
        <HdsFormField @layout="flag" id="test-form-field" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
        </HdsFormField>
      </template>,
    );
    const control = find('#test-form-field .hds-form-field__control');
    const helperText = find('#test-form-field .hds-form-field__helper-text');
    assert.equal(control?.nextElementSibling, helperText);
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components', async function (assert) {
    await render(
      <template>
        <HdsFormField @layout="vertical" id="test-form-field" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Control>This is a mock control</F.Control>
          <F.CharacterCount>20/40</F.CharacterCount>
          <F.Error>This is the error</F.Error>
        </HdsFormField>
      </template>,
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
      <template>
        <HdsFormField @layout="vertical" id="test-form-field" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Control><pre
              id={{F.id}}
              aria-describedby={{F.ariaDescribedBy}}
            >This is a mock control</pre></F.Control>
          <F.CharacterCount>20/40</F.CharacterCount>
          <F.Error>This is the error</F.Error>
        </HdsFormField>
      </template>,
    );
    // the control ID is dynamically generated
    const control = find('#test-form-field .hds-form-field__control pre');
    const controlId = control?.id ?? '';
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control pre')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${controlId} character-count-${controlId} error-${controlId}`,
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
      <template>
        <HdsFormField
          @layout="vertical"
          id="test-form-field"
          @id="my-custom-id"
          as |F|
        >
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Control><pre
              id={{F.id}}
              aria-describedby={{F.ariaDescribedBy}}
            >This is a mock control</pre></F.Control>
          <F.CharacterCount>20/40</F.CharacterCount>
          <F.Error>This is the error</F.Error>
        </HdsFormField>
      </template>,
    );
    const controlId = 'my-custom-id';
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__label')
      .hasAttribute('id', `label-${controlId}`);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control pre')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${controlId} character-count-${controlId} error-${controlId}`,
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
      <template>
        <HdsFormField
          @layout="vertical"
          id="test-form-field"
          @extraAriaDescribedBy="extra"
          as |F|
        >
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Control><pre
              id={{F.id}}
              aria-describedby={{F.ariaDescribedBy}}
            >This is a mock control</pre></F.Control>
          <F.CharacterCount>20/40</F.CharacterCount>
          <F.Error>This is the error</F.Error>
        </HdsFormField>
      </template>,
    );
    // the control ID is dynamically generated
    const control = find('#test-form-field .hds-form-field__control pre');
    const controlId = control?.id ?? '';
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control pre')
      .hasAttribute(
        'aria-describedby',
        `helper-text-${controlId} character-count-${controlId} error-${controlId} extra`,
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
      <template>
        <HdsFormField @isRequired={{true}} as |F|>
          <F.Label>This is the label</F.Label>
        </HdsFormField>
      </template>,
    );
    assert.dom('label .hds-form-indicator').exists();
    assert.dom('label .hds-form-indicator').hasText('Required');
  });
  test('it should append an indicator to the label text when user input is optional', async function (assert) {
    await render(
      <template>
        <HdsFormField @isOptional={{true}} as |F|>
          <F.Label>This is the label</F.Label>
        </HdsFormField>
      </template>,
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
    await render(
      <template>
        {{! @glint-expect-error - testing invalid component usage }}
        <HdsFormField @layout="foo" />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});

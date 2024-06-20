/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

// we're using this data for multiple tests so we'll define it here
const setOptionsData = (context) => {
  context.set('NOOP', () => {});
};

module(
  'Integration | Component | hds/form/super-select/single/field',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Field @onChange={{this.NOOP}} />`
      );
      assert.dom('.hds-form-field__control .hds-form-super-select').exists();
    });

    // INVALID

    test('it should render the correct CSS class if @isInvalid is true', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Field @onChange={{this.NOOP}} @isInvalid={{true}} />`
      );
      assert
        .dom('.hds-form-field__control .hds-form-super-select')
        .hasClass('hds-form-super-select--is-invalid');
    });

    // ID

    test('it should render the trigger with a custom id', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Field @id="my-super-select" @onChange={{this.NOOP}} />`
      );
      assert
        .dom('.ember-basic-dropdown-trigger')
        .hasAttribute('id', 'my-super-select');
    });

    // YIELDED (CONTEXTUAL) COMPONENTS

    test('it renders the yielded contextual components', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Field @onChange={{this.NOOP}} as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </Hds::Form::SuperSelect::Single::Field>`
      );
      assert.dom('.hds-form-field__label').exists();
      assert.dom('.hds-form-field__helper-text').exists();
      assert.dom('.hds-form-field__control').exists();
      assert.dom('.hds-form-field__error').exists();
    });
    test('it does not render the yielded contextual components if not provided', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Field @onChange={{this.NOOP}} />`
      );
      assert.dom('.hds-form-field__label').doesNotExist();
      assert.dom('.hds-form-field__helper-text').doesNotExist();
      assert.dom('.hds-form-field__error').doesNotExist();
    });
    test('it automatically provides all the ID relations between the elements', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Field @extraAriaDescribedBy="extra" @onChange={{this.NOOP}} as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </Hds::Form::SuperSelect::Single::Field>`
      );
      let control = this.element.querySelector('.ember-basic-dropdown-trigger');
      let controlId = control.id;
      assert
        .dom('.hds-form-field__label')
        .hasAttribute('id', `label-${controlId}`);
      assert
        .dom('.hds-form-field__helper-text')
        .hasAttribute('id', `helper-text-${controlId}`);
      assert
        .dom('.ember-basic-dropdown-trigger')
        .hasAttribute('aria-labelledby', `label-${controlId}`);
      assert
        .dom('.ember-basic-dropdown-trigger')
        .hasAttribute(
          'aria-describedby',
          `helper-text-${controlId} error-${controlId} extra`
        );
      assert
        .dom('.hds-form-field__error')
        .hasAttribute('id', `error-${controlId}`);
    });

    test('it automatically provides all the ID relations between the elements when dynamically rendered', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Field @extraAriaDescribedBy="extra" @onChange={{this.NOOP}} as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          {{#if this.showErrors}}
            <F.Error>This is the error</F.Error>
          {{/if}}
        </Hds::Form::SuperSelect::Single::Field>`
      );

      this.set('showErrors', true);
      await settled();
      let control = this.element.querySelector('.ember-basic-dropdown-trigger');
      let controlId = control.id;
      assert
        .dom('.hds-form-field__label')
        .hasAttribute('id', `label-${controlId}`);
      assert
        .dom('.hds-form-field__helper-text')
        .hasAttribute('id', `helper-text-${controlId}`);
      assert
        .dom('.ember-basic-dropdown-trigger')
        .hasAttribute('aria-labelledby', `label-${controlId}`);
      assert
        .dom('.ember-basic-dropdown-trigger')
        .hasAttribute(
          'aria-describedby',
          `helper-text-${controlId} error-${controlId} extra`
        );
      assert
        .dom('.hds-form-field__error')
        .hasAttribute('id', `error-${controlId}`);
    });

    // REQUIRED AND OPTIONAL

    test('it should append an indicator to the label text when user input is required', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Field @isRequired={{true}} @onChange={{this.NOOP}} as |F|>
            <F.Label>This is the label</F.Label>
          </Hds::Form::SuperSelect::Single::Field>`
      );
      assert.dom('label .hds-form-indicator').exists();
      assert.dom('label .hds-form-indicator').hasText('Required');
    });
    test('it should append an indicator to the label text when user input is optional', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Field @isOptional={{true}} @onChange={{this.NOOP}} as |F|>
            <F.Label>This is the label</F.Label>
          </Hds::Form::SuperSelect::Single::Field>`
      );
      assert.dom('label .hds-form-indicator').exists();
      assert.dom('label .hds-form-indicator').hasText('(Optional)');
    });
  }
);

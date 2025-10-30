/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, settled, find } from '@ember/test-helpers';
import { TrackedObject } from 'tracked-built-ins';

import { HdsFormSuperSelectMultipleField } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';
import NOOP from 'showcase/utils/noop';

module(
  'Integration | Component | hds/form/super-select/multiple/field',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleField @onChange={{NOOP}} />
        </template>,
      );
      assert.dom('.hds-form-field__control .hds-form-super-select').exists();
    });

    // INVALID

    test('it should render the correct CSS class if @isInvalid is true', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleField
            @onChange={{NOOP}}
            @isInvalid={{true}}
          />
        </template>,
      );
      assert
        .dom('.hds-form-field__control .hds-form-super-select')
        .hasClass('hds-form-super-select--is-invalid');
    });

    // ID

    test('it should render the trigger with a custom id', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleField
            @id="my-super-select"
            @onChange={{NOOP}}
          />
        </template>,
      );
      assert
        .dom('.ember-basic-dropdown-trigger')
        .hasAttribute('id', 'my-super-select');
    });

    // YIELDED (CONTEXTUAL) COMPONENTS

    test('it renders the yielded contextual components', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleField @onChange={{NOOP}} as |F|>
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.Error>This is the error</F.Error>
          </HdsFormSuperSelectMultipleField>
        </template>,
      );
      assert.dom('.hds-form-field__label').exists();
      assert.dom('.hds-form-field__helper-text').exists();
      assert.dom('.hds-form-field__control').exists();
      assert.dom('.hds-form-field__error').exists();
    });
    test('it does not render the yielded contextual components if not provided', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleField @onChange={{NOOP}} />
        </template>,
      );
      assert.dom('.hds-form-field__label').doesNotExist();
      assert.dom('.hds-form-field__helper-text').doesNotExist();
      assert.dom('.hds-form-field__error').doesNotExist();
    });
    test('it automatically provides all the ID relations between the elements', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleField
            @extraAriaDescribedBy="extra"
            @onChange={{NOOP}}
            as |F|
          >
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.Error>This is the error</F.Error>
          </HdsFormSuperSelectMultipleField>
        </template>,
      );
      const control = find('.ember-basic-dropdown-trigger');

      assert
        .dom('.hds-form-field__label')
        .hasAttribute('id', `label-${control?.id}`);
      assert
        .dom('.hds-form-field__helper-text')
        .hasAttribute('id', `helper-text-${control?.id}`);
      assert
        .dom('.ember-basic-dropdown-trigger')
        .hasAttribute('aria-labelledby', `label-${control?.id}`);
      assert
        .dom('.ember-basic-dropdown-trigger')
        .hasAttribute(
          'aria-describedby',
          `helper-text-${control?.id} error-${control?.id} extra`,
        );
      assert
        .dom('.hds-form-field__error')
        .hasAttribute('id', `error-${control?.id}`);
    });
    test('it automatically provides all the ID relations between the elements when dynamically rendered', async function (assert) {
      const context = new TrackedObject({
        showErrors: false,
      });

      await render(
        <template>
          <HdsFormSuperSelectMultipleField
            @extraAriaDescribedBy="extra"
            @onChange={{NOOP}}
            as |F|
          >
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            {{#if context.showErrors}}
              <F.Error>This is the error</F.Error>
            {{/if}}
          </HdsFormSuperSelectMultipleField>
        </template>,
      );

      context.showErrors = true;
      await settled();

      const control = find('.ember-basic-dropdown-trigger');
      assert
        .dom('.hds-form-field__label')
        .hasAttribute('id', `label-${control?.id}`);
      assert
        .dom('.hds-form-field__helper-text')
        .hasAttribute('id', `helper-text-${control?.id}`);
      assert
        .dom('.ember-basic-dropdown-trigger')
        .hasAttribute('aria-labelledby', `label-${control?.id}`);
      assert
        .dom('.ember-basic-dropdown-trigger')
        .hasAttribute(
          'aria-describedby',
          `helper-text-${control?.id} error-${control?.id} extra`,
        );
      assert
        .dom('.hds-form-field__error')
        .hasAttribute('id', `error-${control?.id}`);
    });

    // REQUIRED AND OPTIONAL

    test('it should append an indicator to the label text when user input is required', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleField
            @isRequired={{true}}
            @onChange={{NOOP}}
            as |F|
          >
            <F.Label>This is the label</F.Label>
          </HdsFormSuperSelectMultipleField>
        </template>,
      );
      assert.dom('label .hds-form-indicator').exists();
      assert.dom('label .hds-form-indicator').hasText('Required');
    });
    test('it should append an indicator to the label text when user input is optional', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleField
            @isOptional={{true}}
            @onChange={{NOOP}}
            as |F|
          >
            <F.Label>This is the label</F.Label>
          </HdsFormSuperSelectMultipleField>
        </template>,
      );
      assert.dom('label .hds-form-indicator').exists();
      assert.dom('label .hds-form-indicator').hasText('(Optional)');
    });
  },
);

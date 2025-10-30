/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { click, render } from '@ember/test-helpers';
import { fn } from '@ember/helper';
import { selectChoose } from 'ember-power-select/test-support';

import { HdsFormSuperSelectMultipleBase } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';
import NOOP from 'showcase/utils/noop';

const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];
const OPTION: string[] = [];

module(
  'Integration | Component | hds/form/super-select/multiple/base',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{NOOP}}
            id="test-super-select-multiple"
          />
        </template>,
      );
      assert
        .dom('.hds-form-super-select-multiple #test-super-select-multiple')
        .exists();
    });

    // OPTIONS

    test('it should render the options passed', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{NOOP}}
            @options={{OPTIONS}}
            as |option|
          >
            {{option}}
          </HdsFormSuperSelectMultipleBase>
        </template>,
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert.dom('.ember-power-select-options').exists();
      assert.dom('.ember-power-select-option').hasText('Option 1');
    });

    // AFTER OPTIONS

    test('it should render the after options block by default', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{NOOP}}
            @options={{OPTIONS}}
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert
        .dom(
          '.hds-form-super-select__after-options .hds-form-super-select__result-count',
        )
        .hasText('3 total');
      assert
        .dom('.hds-form-super-select__after-options .hds-button')
        .hasText('Show selected');
      assert
        .dom('.hds-form-super-select__after-options .hds-button')
        .doesNotHaveTextContaining('Clear selected');
    });

    test('it should update the options view when "Show selected"/"Show all" is toggled', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{fn (mut OPTION)}}
            @selected={{OPTION}}
            @options={{OPTIONS}}
            id="test-super-select-multiple"
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      await selectChoose('#test-super-select-multiple', 'Option 1');
      await selectChoose('#test-super-select-multiple', 'Option 2');
      assert.dom('.ember-power-select-option').isVisible({ count: 3 });

      // click 'Show selected'
      await click(
        '.hds-form-super-select__after-options .hds-button:first-child',
      );
      assert.dom('.ember-power-select-option').isVisible({ count: 2 });

      // click 'Show all'
      await click(
        '.hds-form-super-select__after-options .hds-button:first-child',
      );
      assert.dom('.ember-power-select-option').isVisible({ count: 3 });
    });

    test('it should clear any existing selection when "Clear selected" is activated', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{fn (mut OPTION)}}
            @selected={{OPTION}}
            @options={{OPTIONS}}
            id="test-super-select-multiple"
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      await selectChoose('#test-super-select-multiple', 'Option 1');
      await selectChoose('#test-super-select-multiple', 'Option 2');
      assert.dom('.ember-power-select-option').isVisible({ count: 3 });
      assert.dom('.hds-form-super-select__no-options-selected').doesNotExist();

      // click 'Clear selected'
      await click(
        '.hds-form-super-select__after-options .hds-button:nth-child(2)',
      );
      assert
        .dom('.ember-power-select-option[aria-selected="true"]')
        .doesNotExist();

      // click 'Show selected'
      await click(
        '.hds-form-super-select__after-options .hds-button:first-child',
      );
      assert
        .dom('.hds-form-super-select__no-options-selected')
        .hasText('No options selected');
    });

    test('it should not render the after options block when showAfterOptions is set to false', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{NOOP}}
            @options={{OPTIONS}}
            @showAfterOptions={{false}}
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert.dom('.hds-form-super-select__after-options').doesNotExist();
    });

    test('it should render custom content in the after options block when `@afterOptionsContent` exists', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @afterOptionsContent="Custom content"
            @onChange={{NOOP}}
            @options={{OPTIONS}}
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert.dom('.hds-form-super-select__result-count').doesNotExist();
      assert
        .dom('.hds-form-super-select__after-options')
        .hasText('Custom content');
    });

    test('it should not render the after options block when `@showAfterOptions` is false', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @showAfterOptions={{false}}
            @onChange={{NOOP}}
            @options={{OPTIONS}}
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert.dom('.hds-form-super-select__after-options').doesNotExist();
    });

    test('it should render the default after options block with custom result count message when `@resultCountMessage` exists', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{NOOP}}
            @options={{OPTIONS}}
            @resultCountMessage="custom result count message"
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert
        .dom(
          '.hds-form-super-select__after-options .hds-form-super-select__result-count',
        )
        .hasText('custom result count message');
      assert
        .dom('.hds-form-super-select__after-options .hds-button')
        .hasText('Show selected');
      assert
        .dom('.hds-form-super-select__after-options .hds-button')
        .doesNotHaveTextContaining('Clear selected');
    });

    // MATCH TRIGGER WIDTH

    test('`@matchTriggerWidth` should be true by default', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleBase @onChange={{NOOP}} />
        </template>,
      );
      assert
        .dom('.hds-form-super-select')
        .doesNotHaveClass('hds-form-super-select--dropdown-content-auto-width');
    });

    test('it should render the correct CSS class when `@matchTriggerWidth` is false', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{NOOP}}
            @matchTriggerWidth={{false}}
          />
        </template>,
      );
      assert
        .dom('.hds-form-super-select')
        .hasClass('hds-form-super-select--dropdown-content-auto-width');
    });

    // DROPDOWN MAX WIDTH

    test('it should set the correct CSS property value when `@dropdownMaxWidth` is set', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{NOOP}}
            @dropdownMaxWidth="40em"
          />
        </template>,
      );

      assert
        .dom('.hds-form-super-select')
        .hasClass('hds-form-super-select--dropdown-content-auto-width')
        .hasAttribute(
          'style',
          "--hds-form-super-select-dropdown-max-width: 40em; --hds-form-super-select-selected-text-display: none; --hds-form-super-select-selected-text: '0 selected';",
        );
    });

    // INVALID

    test('it should render the correct CSS class when `@isInvalid` is true', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{NOOP}}
            @isInvalid={{true}}
          />
        </template>,
      );
      assert
        .dom('.hds-form-super-select')
        .hasClass('hds-form-super-select--is-invalid');
    });
  },
);

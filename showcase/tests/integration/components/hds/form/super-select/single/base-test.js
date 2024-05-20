/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

// we're using this data for multiple tests so we'll define it here
const setOptionsData = (context) => {
  context.set('NOOP', () => {});
  context.set('OPTION', []);
  context.set('OPTIONS', ['Option 1', 'Option 2', 'Option 3']);
};

module(
  'Integration | Component | hds/form/super-select/single/base',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @onChange={{this.NOOP}} id="test-super-select-single" />`
      );
      assert
        .dom('.hds-form-super-select-single #test-super-select-single')
        .exists();
    });

    // OPTIONS

    test('it should render the options passed', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @onChange={{this.NOOP}} @options={{this.OPTIONS}} as |option|>{{option}}</Hds::Form::SuperSelect::Single::Base>`
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert.dom('.ember-power-select-options').exists();
      assert.dom('.ember-power-select-option').hasText('Option 1');
    });

    // AFTER OPTIONS

    test('it should not render the after options block by default', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @onChange={{this.NOOP}} @options={{this.OPTIONS}} as |option|>{{option}}</Hds::Form::SuperSelect::Single::Base>`
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert.dom('.hds-form-super-select__after-options').doesNotExist();
    });

    test('it should render the after options block when showAfterOptions is set to true', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @onChange={{this.NOOP}} @options={{this.OPTIONS}} @showAfterOptions={{true}} as |option|>{{option}}</Hds::Form::SuperSelect::Single::Base>`
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert
        .dom(
          '.hds-form-super-select__after-options .hds-form-super-select__result-count'
        )
        .hasText('3 results');
    });

    test('it should render custom content in the after options block when `@afterOptionsContent` exists', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @afterOptionsContent="Custom content" @onChange={{this.NOOP}} @options={{this.OPTIONS}} as |option|>{{option}}</Hds::Form::SuperSelect::Single::Base>`
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert.dom('.hds-form-super-select__result-count').doesNotExist();
      assert
        .dom('.hds-form-super-select__after-options')
        .hasText('Custom content');
    });

    test('it should not render the after options block when `@showAfterOptions` is false', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @showAfterOptions={{false}} @onChange={{this.NOOP}} @options={{this.OPTIONS}} as |option|>{{option}}</Hds::Form::SuperSelect::Single::Base>`
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert.dom('.hds-form-super-select__after-options').doesNotExist();
    });

    // MATCH TRIGGER WIDTH

    test('`@matchTriggerWidth` should be true by default', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @onChange={{this.NOOP}} />`
      );
      assert
        .dom('.hds-form-super-select')
        .doesNotHaveClass('hds-form-super-select--dropdown-content-auto-width');
    });

    test('it should render the correct CSS class when `@matchTriggerWidth` is false', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @onChange={{this.NOOP}} @matchTriggerWidth={{false}} />`
      );
      assert
        .dom('.hds-form-super-select')
        .hasClass('hds-form-super-select--dropdown-content-auto-width');
    });

    // DROPDOWN MAX WIDTH

    test('it should set the correct CSS property value when `@dropdownMaxWidth` is set', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @onChange={{this.NOOP}} @dropdownMaxWidth="40em" />`
      );

      assert
        .dom('.hds-form-super-select')
        .hasClass('hds-form-super-select--dropdown-content-auto-width')
        .hasAttribute(
          'style',
          '--hds-form-super-select-dropdown-max-width: 40em;'
        );
    });

    // INVALID

    test('it should render the correct CSS class when `@isInvalid` is true', async function (assert) {
      setOptionsData(this);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @onChange={{this.NOOP}} @isInvalid={{true}} />`
      );
      assert
        .dom('.hds-form-super-select')
        .hasClass('hds-form-super-select--is-invalid');
    });
  }
);

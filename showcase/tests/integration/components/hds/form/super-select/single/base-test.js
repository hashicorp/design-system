/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/super-select/single/base',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      this.set('NOOP', () => {});
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @ariaLabel="Label" @onChange={{this.NOOP}} id="test-super-select-single" />`
      );
      assert
        .dom('.hds-form-super-select-single #test-super-select-single')
        .exists();
    });

    // OPTIONS

    test('it should render the options passed', async function (assert) {
      this.set('NOOP', () => {});
      this.set('OPTIONS', ['Option 1', 'Option 2', 'Option 3']);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @ariaLabel="Label" @onChange={{this.NOOP}} @options={{this.OPTIONS}} id="test-super-select-single" as |option|>{{option}}</Hds::Form::SuperSelect::Single::Base>`
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert.dom('.ember-power-select-options').exists();
      assert.dom('.ember-power-select-option').hasText('Option 1');
    });

    // AFTER OPTIONS

    test('it should render the after options block by default', async function (assert) {
      this.set('NOOP', () => {});
      this.set('OPTIONS', ['Option 1', 'Option 2', 'Option 3']);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @ariaLabel="Label" @onChange={{this.NOOP}} @options={{this.OPTIONS}} id="test-super-select-single" as |option|>{{option}}</Hds::Form::SuperSelect::Single::Base>`
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert
        .dom(
          '.hds-form-super-select__after-options .hds-form-super-select__result-count'
        )
        .hasText('3 results');
    });

    test('it should render custom content in the after options block when `@afterOptionsContent` exists', async function (assert) {
      this.set('NOOP', () => {});
      this.set('OPTIONS', ['Option 1', 'Option 2', 'Option 3']);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @afterOptionsContent="Custom content" @ariaLabel="Label" @onChange={{this.NOOP}} @options={{this.OPTIONS}} id="test-super-select-single" as |option|>{{option}}</Hds::Form::SuperSelect::Single::Base>`
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert.dom('.hds-form-super-select__result-count').doesNotExist();
      assert
        .dom('.hds-form-super-select__after-options')
        .hasText('Custom content');
    });

    test('it should not render the after options block when `@showAfterOptions` is false', async function (assert) {
      this.set('NOOP', () => {});
      this.set('OPTIONS', ['Option 1', 'Option 2', 'Option 3']);
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @showAfterOptions={{false}} @ariaLabel="Label" @onChange={{this.NOOP}} @options={{this.OPTIONS}} id="test-super-select-single" as |option|>{{option}}</Hds::Form::SuperSelect::Single::Base>`
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert.dom('.hds-form-super-select__after-options').doesNotExist();
    });

    // MATCH TRIGGER WIDTH

    test('it should render the correct CSS class when `@matchTriggerWidth` is false', async function (assert) {
      this.set('NOOP', () => {});
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @ariaLabel="Label" @onChange={{this.NOOP}} @matchTriggerWidth={{false}} />`
      );
      assert
        .dom('.hds-form-super-select')
        .hasClass('hds-form-super-select--match-trigger-width-false');
    });

    // INVALID

    test('it should render the correct CSS class when `@isInvalid` is true', async function (assert) {
      this.set('NOOP', () => {});
      await render(
        hbs`<Hds::Form::SuperSelect::Single::Base @ariaLabel="Label" @onChange={{this.NOOP}} @isInvalid={{true}} />`
      );
      assert
        .dom('.hds-form-super-select')
        .hasClass('hds-form-super-select--is-invalid');
    });
  }
);

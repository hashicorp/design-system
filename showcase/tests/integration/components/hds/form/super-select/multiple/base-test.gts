/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { click, fillIn, render, settled } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support';
import { TrackedObject } from 'tracked-built-ins';
import sinon from 'sinon';

import { HdsFormSuperSelectMultipleBase } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';
import NOOP from 'showcase/utils/noop';

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import type { PowerSelectSelectedItemSignature } from 'ember-power-select/types';

const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];

module(
  'Integration | Component | hds/form/super-select/multiple/base',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(function () {
      sinon.restore();
    });

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
      assert.dom('.hds-form-super-select__option-text').hasText('Option 1');
    });

    // MESSAGES

    test('it renders the default no matches message', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{NOOP}}
            @options={{OPTIONS}}
            @searchEnabled={{true}}
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      await fillIn('.ember-power-select-search-input', 'Option 4');
      assert
        .dom('.ember-power-select-option--no-matches-message')
        .hasText('No results found');
    });

    test('it renders the default loading message', async function (assert) {
      const loadingOptions = new Promise<string[]>(() => {});

      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{NOOP}}
            @options={{loadingOptions}}
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert
        .dom('.ember-power-select-option--loading-message')
        .hasText('Loading options...');
    });

    test('it renders the default search message', async function (assert) {
      const search = (term: string) =>
        OPTIONS.filter((option) => option.includes(term));

      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{NOOP}}
            @search={{search}}
            @searchEnabled={{true}}
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert
        .dom('.ember-power-select-option--search-message')
        .hasText('Type to search');
    });

    test('it renders the default search placeholder', async function (assert) {
      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{NOOP}}
            @options={{OPTIONS}}
            @searchEnabled={{true}}
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      assert
        .dom('.ember-power-select-search-input')
        .hasAttribute('placeholder', 'Search');
    });

    // PLACEHOLDER

    test('it renders the placeholder in the trigger when nothing is selected', async function (assert) {
      const selected: string[] = [];

      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{NOOP}}
            @options={{OPTIONS}}
            @selected={{selected}}
            @placeholder="Select options"
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      assert
        .dom('.ember-basic-dropdown-trigger .ember-power-select-placeholder')
        .isVisible()
        .hasText('Select options');
    });

    test('it does not render the placeholder when options are selected', async function (assert) {
      const selected = ['Option 1'];

      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{NOOP}}
            @options={{OPTIONS}}
            @selected={{selected}}
            @placeholder="Select options"
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      assert
        .dom('.ember-basic-dropdown-trigger .ember-power-select-placeholder')
        .doesNotExist();
    });

    test('it calls @onChange with an array when an option is chosen from an empty selection', async function (assert) {
      const selected: string[] = [];
      const onChange = sinon.spy();

      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{onChange}}
            @options={{OPTIONS}}
            @selected={{selected}}
            @placeholder="Select options"
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      await selectChoose('.hds-form-super-select', 'Option 1');
      assert.true(onChange.calledOnce);
      assert.deepEqual(onChange.firstCall.args[0], ['Option 1']);
    });

    test('it renders the placeholder again after the last selected option is deselected', async function (assert) {
      const state = new TrackedObject<{ selected: string[] }>({
        selected: ['Option 1'],
      });
      const onChange = (selected: string[]) => {
        state.selected = selected;
      };

      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{onChange}}
            @options={{OPTIONS}}
            @selected={{state.selected}}
            @placeholder="Select options"
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      await selectChoose('.hds-form-super-select', 'Option 1');
      assert.deepEqual(state.selected, []);
      assert
        .dom('.ember-basic-dropdown-trigger .ember-power-select-placeholder')
        .isVisible()
        .hasText('Select options');
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
      const context = new TrackedObject({
        options: [...OPTIONS],
        selectedOptions: [] as string[],
      });

      const onChange = (selection: unknown) => {
        context.selectedOptions = selection as string[];
      };

      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{onChange}}
            @selected={{context.selectedOptions}}
            @options={{context.options}}
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
      const context = new TrackedObject({
        options: [...OPTIONS],
        selectedOptions: [] as string[],
      });

      const onChange = (selection: unknown) => {
        context.selectedOptions = selection as string[];
      };

      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{onChange}}
            @selected={{context.selectedOptions}}
            @options={{context.options}}
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

    test('it should call `@onChange` with an empty array when "Clear selected" is activated', async function (assert) {
      const context = new TrackedObject({
        selectedOptions: ['Option 1', 'Option 2'],
      });
      const onChange = sinon.spy((selection: string[]) => {
        context.selectedOptions = selection;
      });

      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{onChange}}
            @selected={{context.selectedOptions}}
            @options={{OPTIONS}}
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      await click(
        '.hds-form-super-select__after-options .hds-button:nth-child(2)',
      );
      assert.true(onChange.calledOnce);
      assert.deepEqual(onChange.firstCall.args[0], []);
    });

    // SELECTED ITEM COMPONENT

    test('it should pass each selected option to `@selectedItemComponent` as `@selected`', async function (assert) {
      const SelectedItem: TemplateOnlyComponent<
        PowerSelectSelectedItemSignature<string, unknown, true>
      > = <template>
        <span class="test-selected-item">Selected: {{@selected}}</span>
      </template>;
      const selected = ['Option 1', 'Option 3'];

      await render(
        <template>
          <HdsFormSuperSelectMultipleBase
            @onChange={{NOOP}}
            @options={{OPTIONS}}
            @selected={{selected}}
            @selectedItemComponent={{SelectedItem}}
            as |option|
          >{{option}}</HdsFormSuperSelectMultipleBase>
        </template>,
      );
      assert.dom('.test-selected-item').exists({ count: 2 });
      assert.dom('.test-selected-item').hasText('Selected: Option 1');
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
          "--hds-var-form-super-select-dropdown-max-width: 40em; --hds-var-form-super-select-selected-text-display: none; --hds-var-form-super-select-selected-text: '0 selected';",
        );
    });

    // TEARDOWN

    test('it should keep one set of anchored position listeners while open and remove them when destroyed', async function (assert) {
      const addSpy = sinon.spy(window, 'addEventListener');
      const removeSpy = sinon.spy(window, 'removeEventListener');
      const countScrollCalls = (spy: sinon.SinonSpy) =>
        spy.getCalls().filter((call) => call.args[0] === 'scroll').length;
      const countActiveScrollListeners = () =>
        countScrollCalls(addSpy) - countScrollCalls(removeSpy);
      const context = new TrackedObject({ isRendered: true });

      await render(
        <template>
          {{#if context.isRendered}}
            <HdsFormSuperSelectMultipleBase
              @onChange={{NOOP}}
              @options={{OPTIONS}}
              as |option|
            >{{option}}</HdsFormSuperSelectMultipleBase>
          {{/if}}
        </template>,
      );
      await click('.hds-form-super-select .ember-basic-dropdown-trigger');
      const activeWhenOpen = countActiveScrollListeners();
      assert.true(activeWhenOpen > 0, 'scroll listeners are added');

      // basic-dropdown repositions the content on window resize
      window.dispatchEvent(new Event('resize'));
      await settled();
      assert.strictEqual(
        countActiveScrollListeners(),
        activeWhenOpen,
        'repositioning does not add more scroll listeners',
      );

      context.isRendered = false;
      await settled();
      assert.strictEqual(
        countActiveScrollListeners(),
        0,
        'scroll listeners are removed',
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

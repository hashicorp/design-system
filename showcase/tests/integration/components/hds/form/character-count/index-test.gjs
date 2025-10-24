/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { render, typeIn } from '@ember/test-helpers';
import CharacterCount from "@hashicorp/design-system-components/components/hds/form/character-count/index";
import { on } from "@ember/modifier";

module(
  'Integration | Component | hds/form/character-count/index',
  function (hooks) {
    setupRenderingTest(hooks);
    hooks.beforeEach(function () {
      this.set('value', '');
      this.update = (event) => this.set('value', event.target.value);
    });

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        <template><CharacterCount id="test-form-character-count" /></template>,
      );
      assert
        .dom('#test-form-character-count')
        .hasClass('hds-form-character-count');
    });
    test('it should render with a CSS class provided via the @contextualClass argument', async function (assert) {
      await render(
        <template><CharacterCount @contextualClass="my-class" id="test-form-character-count" /></template>,
      );
      assert.dom('#test-form-character-count').hasClass('my-class');
    });

    // ID

    test('it renders a character count with the correct "id" attribute if the @controlId argument is provided', async function (assert) {
      await render(
        <template><CharacterCount @controlId="my-control-id" /></template>,
      );
      assert.dom('#character-count-my-control-id').exists();
    });

    // CONTENT

    test('it renders a character count with the default predefined format', async function (assert) {
      await render(
        <template>
          <input id="input-1" value={{this.value}} {{on "input" this.update}} />
          <CharacterCount @value={{this.value}} @controlId="input-1" id="test-form-character-count" /></template>,
      );
      assert.dom('#test-form-character-count').hasText('0 characters entered');

      await typeIn('#input-1', 'cl');
      assert.dom('#test-form-character-count').hasText('2 characters entered');
    });
    test('it renders a character count in the predefined format when only @maxLength is set', async function (assert) {
      await render(
        <template>
          <input id="input-max-length" value={{this.value}} {{on "input" this.update}} />
          <CharacterCount @value={{this.value}} @maxLength={{25}} @controlId="input-max-length" id="test-form-character-count" /></template>,
      );
      assert.dom('#test-form-character-count').hasText('25 characters allowed');

      await typeIn('#input-max-length', 'cluster');
      assert
        .dom('#test-form-character-count')
        .hasText('18 characters remaining');

      await typeIn('#input-max-length', '-length-is-longer');
      assert.dom('#test-form-character-count').hasText('1 character remaining');

      await typeIn('#input-max-length', '-');
      assert
        .dom('#test-form-character-count')
        .hasText('0 characters remaining');

      await typeIn('#input-max-length', 't');
      assert
        .dom('#test-form-character-count')
        .hasText('Exceeded by 1 character');

      await typeIn('#input-max-length', 'han');
      assert
        .dom('#test-form-character-count')
        .hasText('Exceeded by 4 characters');
    });
    test('it renders a character count in the predefined format when only @minLength is set', async function (assert) {
      await render(
        <template>
          <input id="input-min-length" value={{this.value}} {{on "input" this.update}} />
          <CharacterCount @value={{this.value}} @minLength={{3}} @controlId="input-min-length" id="test-form-character-count" /></template>,
      );
      assert.dom('#test-form-character-count').hasText('3 characters required');

      await typeIn('#input-min-length', 'c');
      assert
        .dom('#test-form-character-count')
        .hasText('2 more characters required');

      await typeIn('#input-min-length', 'l');
      assert
        .dom('#test-form-character-count')
        .hasText('1 more character required');

      await typeIn('#input-min-length', 'u');
      assert.dom('#test-form-character-count').hasText('3 characters entered');
    });
    test('it renders a character count in the predefined format when both @minLength and @maxLength are set', async function (assert) {
      await render(
        <template>
          <input id="input-minmax-length" value={{this.value}} {{on "input" this.update}} />
          <CharacterCount @value={{this.value}} @minLength={{3}} @maxLength={{25}} @controlId="input-minmax-length" id="test-form-character-count" /></template>,
      );
      assert.dom('#test-form-character-count').hasText('3 characters required');

      await typeIn('#input-minmax-length', 'c');
      assert
        .dom('#test-form-character-count')
        .hasText('2 more characters required');

      await typeIn('#input-minmax-length', 'luster');
      assert
        .dom('#test-form-character-count')
        .hasText('18 characters remaining');

      await typeIn('#input-minmax-length', '-length-is-longer-than');
      assert
        .dom('#test-form-character-count')
        .hasText('Exceeded by 4 characters');
    });
    test('it renders a character count in custom format', async function (assert) {
      this.set('value', 'with custom content');
      await render(
        <template>
        <input type="hidden" value={{this.value}} id="input-2" {{on "input" this.update}} />
        <CharacterCount @value={{this.value}} @minLength={{20}} @maxLength={{40}} @controlId="input-2" id="test-form-character-count" as |CC|>
          maxLength {{CC.maxLength}}
          minLength {{CC.minLength}}
          remaining {{CC.remaining}}
          shortfall {{CC.shortfall}}
          currentLength {{CC.currentLength}}
        </CharacterCount></template>,
      );
      assert
        .dom('#test-form-character-count')
        .hasText(
          'maxLength 40 minLength 20 remaining 21 shortfall 1 currentLength 19',
        );
    });

    // A11y

    test('it should present the character count as a live region', async function (assert) {
      this.set('value', 'with default content');
      await render(
        <template>
          <input type="hidden" value={{this.value}} id="input-3" />
          <CharacterCount @maxLength={{40}} @controlId="input-3" id="test-form-character-count" /></template>,
      );
      assert
        .dom('#test-form-character-count')
        .hasAttribute('aria-live', 'polite');
    });
  },
);

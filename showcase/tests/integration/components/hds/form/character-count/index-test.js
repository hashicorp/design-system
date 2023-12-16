/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, typeIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/form/character-count/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render the component with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Form::CharacterCount id="test-form-character-count" />`
      );
      assert
        .dom('#test-form-character-count')
        .hasClass('hds-form-character-count');
    });
    test('it should render with a CSS class provided via the @contextualClass argument', async function (assert) {
      await render(
        hbs`<Hds::Form::CharacterCount @contextualClass="my-class" id="test-form-character-count" />`
      );
      assert.dom('#test-form-character-count').hasClass('my-class');
    });

    // ID

    test('it renders a character count with the correct "id" attribute if the @controlId argument is provided', async function (assert) {
      await render(
        hbs`<Hds::Form::CharacterCount @controlId="my-control-id"/>`
      );
      assert.dom('#character-count-my-control-id').exists();
    });

    // CONTENT

    test('it renders a character count with the default predefined format', async function (assert) {
      await render(
        hbs`
          <input id="input-1"/>
          <Hds::Form::CharacterCount @controlId="input-1" id="test-form-character-count"/>`
      );
      assert.dom('#test-form-character-count').hasText('0 characters entered');

      await typeIn('#input-1', 'cl');
      assert.dom('#test-form-character-count').hasText('2 characters entered');
    });
    test('it renders a character count in the predefined format when only @maxLength is set', async function (assert) {
      await render(
        hbs`
          <input id="input-max-length"/>
          <Hds::Form::CharacterCount @maxLength={{25}} @controlId="input-max-length" id="test-form-character-count"/>`
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
        hbs`
          <input id="input-min-length"/>
          <Hds::Form::CharacterCount @minLength={{3}} @controlId="input-min-length" id="test-form-character-count"/>`
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
        hbs`
          <input id="input-minmax-length"/>
          <Hds::Form::CharacterCount @minLength={{3}} @maxLength={{25}} @controlId="input-minmax-length" id="test-form-character-count"/>`
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
      await render(
        hbs`
        <input type="hidden" value="with custom content" id="input-2"/>
        <Hds::Form::CharacterCount @minLength={{20}} @maxLength={{40}} @controlId="input-2" id="test-form-character-count" as |CC|>
          maxLength {{CC.maxLength}} 
          minLength {{CC.minLength}} 
          remaining {{CC.remaining}} 
          shortfall {{CC.shortfall}} 
          currentLength {{CC.currentLength}}
        </Hds::Form::CharacterCount>`
      );
      assert
        .dom('#test-form-character-count')
        .hasText(
          'maxLength 40 minLength 20 remaining 21 shortfall 1 currentLength 19'
        );
    });

    // A11y

    test('it should present the character count as a live region', async function (assert) {
      await render(
        hbs`
          <input type="hidden" value="with default content" id="input-3"/>
          <Hds::Form::CharacterCount @maxLength={{40}} @controlId="input-3" id="test-form-character-count"/>`
      );
      assert
        .dom('#test-form-character-count')
        .hasAttribute('aria-live', 'polite');
    });

    // CALLBACKS

    test('it should call `onInput` function if provided', async function (assert) {
      let onInput = false;
      this.set('onInput', () => (onInput = true));
      await render(
        hbs`
          <input value="with default content" id="input-4"/>
          <Hds::Form::CharacterCount @onInput={{this.onInput}} @maxLength={{40}} @controlId="input-4" id="test-form-character-count"/>`
      );
      typeIn('#input-4', 'a');
      assert.ok(onInput);
    });
  }
);

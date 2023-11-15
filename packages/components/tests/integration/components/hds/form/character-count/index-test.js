/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
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

    test('it renders a character count in the predefined format', async function (assert) {
      await render(
        hbs`
          <input type="hidden" value="with default content" id="input-1"/>
          <Hds::Form::CharacterCount @maxLength="40" @controlId="input-1" id="test-form-character-count"/>`
      );
      assert.dom('#test-form-character-count').hasText('20/40');
    });
    test('it renders a character count in custom format', async function (assert) {
      await render(
        hbs`
        <input type="hidden" value="with custom content" id="input-2"/>
        <Hds::Form::CharacterCount @maxLength="40" @controlId="input-2" id="test-form-character-count" as |CC|>
          Entered {{CC.currentLength}} out of {{CC.maxLength}} characters. {{CC.remainingLength}} characters remaining.
        </Hds::Form::CharacterCount>`
      );
      assert
        .dom('#test-form-character-count')
        .hasText('Entered 19 out of 40 characters. 21 characters remaining.');
    });

    // A11y

    test('it should present the character count as a live region', async function (assert) {
      await render(
        hbs`
          <input type="hidden" value="with default content" id="input-1"/>
          <Hds::Form::CharacterCount @maxLength="40" @controlId="input-1" id="test-form-character-count"/>`
      );
      assert
        .dom('#test-form-character-count')
        .hasAttribute('aria-live', 'polite');
    });
  }
);

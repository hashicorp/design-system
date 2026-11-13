/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import {
  fillIn,
  render,
  resetOnerror,
  settled,
  find,
  triggerEvent,
} from '@ember/test-helpers';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { set as setProperty } from '@ember/object';
import Component from '@glimmer/component';
import { TrackedObject } from 'tracked-built-ins';
import pick from '@nullvoxpopuli/ember-composable-helpers/helpers/pick';
import set from 'ember-set-helper/helpers/set';

import { HdsFormTextareaField } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/textarea/field', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a specific CSS class', async function (assert) {
    await render(<template><HdsFormTextareaField /></template>);
    assert.dom('.hds-form-field__control').exists();
  });

  // VALUE

  test('it should render the input with the value provided via @value argument', async function (assert) {
    await render(<template><HdsFormTextareaField @value="abc123" /></template>);
    assert.dom('textarea').hasValue('abc123');
  });

  test('it supports consumer-owned values and character counts while editing', async function (assert) {
    const state = new TrackedObject({ value: 'initial' });
    const updateValue = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLTextAreaElement) {
        state.value = target.value;
      }
    };

    await render(
      <template>
        <HdsFormTextareaField
          @value={{state.value}}
          {{on "input" updateValue}}
          as |F|
        >
          <F.Label>Description</F.Label>
          <F.CharacterCount @maxLength={{20}} />
        </HdsFormTextareaField>
      </template>,
    );

    await fillIn('textarea', 'new\nvalue');
    assert.strictEqual(state.value, 'new\nvalue');
    assert.dom('textarea').hasValue('new\nvalue');
    assert.dom('.hds-form-field__character-count').includesText('11');

    state.value = '';
    await settled();
    assert.dom('textarea').hasValue('');
    assert.dom('.hds-form-field__character-count').includesText('20');
  });

  test('it does not update the caller value or character count without an input handler', async function (assert) {
    const state = new TrackedObject({ value: 'initial' });

    await render(
      <template>
        <HdsFormTextareaField @value={{state.value}} as |F|>
          <F.Label>Description</F.Label>
          <F.CharacterCount @maxLength={{20}} />
        </HdsFormTextareaField>
      </template>,
    );

    await fillIn('textarea', 'edited');
    assert.strictEqual(state.value, 'initial');
    assert.dom('textarea').hasValue('edited');
    assert.dom('.hds-form-field__character-count').includesText('13');
  });

  test('it updates caller state and character count with the codemod helper fallback', async function (assert) {
    const state = new TrackedObject({ description: 'initial' });

    await render(
      <template>
        <HdsFormTextareaField
          @value={{state.description}}
          {{on "input" (pick "target.value" (set state "description"))}}
          {{on "change" (pick "target.value" (set state "description"))}}
          as |F|
        >
          <F.Label>Description</F.Label>
          <F.CharacterCount @maxLength={{20}} />
        </HdsFormTextareaField>
      </template>,
    );

    await fillIn('textarea', 'edited');
    assert.strictEqual(state.description, 'edited');
    assert.dom('.hds-form-field__character-count').includesText('14');

    const textarea = find('textarea');
    if (!(textarea instanceof HTMLTextAreaElement)) {
      throw new Error('Expected a native textarea');
    }
    textarea.value = 'change only';
    await triggerEvent(textarea, 'change');
    assert.strictEqual(state.description, 'change only');
    assert.dom('.hds-form-field__character-count').includesText('9');

    textarea.value = '';
    await triggerEvent(textarea, 'input');
    assert.strictEqual(state.description, '');
    assert.dom('.hds-form-field__character-count').includesText('20');
  });

  test('it updates caller state before validation with the codemod backing-class handler', async function (assert) {
    const state = new TrackedObject({ description: 'initial' });
    const observed: string[] = [];
    const validate = () => observed.push(state.description);

    class Consumer extends Component {
      hdsTextareaValueChange = (object: object, key: string, event: Event) => {
        const target = event.target;
        if (!(target instanceof HTMLTextAreaElement)) {
          throw new TypeError('Expected a textarea event target');
        }
        setProperty(object, key, target.value);
      };

      <template>
        <HdsFormTextareaField
          @value={{state.description}}
          {{on "input" (fn this.hdsTextareaValueChange state "description")}}
          {{on "change" (fn this.hdsTextareaValueChange state "description")}}
          {{on "input" validate}}
          as |F|
        >
          <F.Label>Description</F.Label>
          <F.CharacterCount @maxLength={{20}} />
        </HdsFormTextareaField>
      </template>
    }

    await render(<template><Consumer /></template>);
    await fillIn('textarea', 'edited');
    assert.strictEqual(state.description, 'edited');
    assert.deepEqual(observed, ['edited']);
    assert.dom('.hds-form-field__character-count').includesText('14');

    const textarea = find('textarea');
    if (!(textarea instanceof HTMLTextAreaElement)) {
      throw new Error('Expected a native textarea');
    }
    textarea.value = 'change only';
    await triggerEvent(textarea, 'change');
    assert.strictEqual(state.description, 'change only');
    assert.dom('.hds-form-field__character-count').includesText('9');

    await fillIn('textarea', '');
    assert.strictEqual(state.description, '');
    assert.dom('.hds-form-field__character-count').includesText('20');
  });

  // INVALID

  test('it should render the correct CSS class if the @isInvalid prop is declared', async function (assert) {
    await render(
      <template><HdsFormTextareaField @isInvalid={{true}} /></template>,
    );
    assert.dom('textarea').hasClass('hds-form-textarea--is-invalid');
  });

  // WIDTH & HEIGHT

  test('it should render the textarea control with a fixed width if a @width value is passed', async function (assert) {
    await render(<template><HdsFormTextareaField @width="248px" /></template>);
    assert.dom('textarea').hasStyle({ width: '248px' });
  });
  test('it should render the textarea control with a fixed height if a @height value is passed', async function (assert) {
    await render(<template><HdsFormTextareaField @height="248px" /></template>);
    assert.dom('textarea').hasStyle({ height: '248px' });
  });

  // ID

  test('it should render the textarea control with a custom @id', async function (assert) {
    await render(
      <template><HdsFormTextareaField @id="my-textarea" /></template>,
    );
    assert.dom('textarea').hasAttribute('id', 'my-textarea');
  });

  // YIELDED (CONTEXTUAL) COMPONENTS

  test('it renders the yielded contextual components', async function (assert) {
    await render(
      <template>
        <HdsFormTextareaField @value="abc123" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.CharacterCount @maxLength={{10}} />
          <F.Error>This is the error</F.Error>
        </HdsFormTextareaField>
      </template>,
    );
    assert.dom('.hds-form-field__label').exists();
    assert.dom('.hds-form-field__helper-text').exists();
    assert.dom('.hds-form-field__control').exists();
    assert.dom('.hds-form-field__character-count').exists();
    assert.dom('.hds-form-field__error').exists();
  });
  test('it does not render the yielded contextual components if not provided', async function (assert) {
    await render(<template><HdsFormTextareaField /></template>);
    assert.dom('.hds-form-field__label').doesNotExist();
    assert.dom('.hds-form-field__helper-text').doesNotExist();
    assert.dom('.hds-form-field__character-count').doesNotExist();
    assert.dom('.hds-form-field__error').doesNotExist();
  });
  test('it automatically provides all the ID relations between the elements', async function (assert) {
    await render(
      <template>
        <HdsFormTextareaField
          @value="abc123"
          @extraAriaDescribedBy="extra"
          as |F|
        >
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.CharacterCount @maxLength={{10}} />
          <F.Error>This is the error</F.Error>
        </HdsFormTextareaField>
      </template>,
    );
    // the control ID is dynamically generated
    const control = find('.hds-form-field__control textarea');
    const controlId = control?.id ?? '';
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control textarea')
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

  test('it automatically provides all the ID relations between the elements when dynamically rendered', async function (assert) {
    const context = new TrackedObject({
      showErrors: false,
    });

    await render(
      <template>
        <HdsFormTextareaField
          @value="abc123"
          @extraAriaDescribedBy="extra"
          as |F|
        >
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.CharacterCount @maxLength={{10}} />
          {{#if context.showErrors}}
            <F.Error>This is the error</F.Error>
          {{/if}}
        </HdsFormTextareaField>
      </template>,
    );

    context.showErrors = true;
    await settled();

    // the control ID is dynamically generated
    const control = find('.hds-form-field__control textarea');
    const controlId = control?.id ?? '';
    assert.dom('.hds-form-field__label').hasAttribute('for', controlId);
    assert
      .dom('.hds-form-field__helper-text')
      .hasAttribute('id', `helper-text-${controlId}`);
    assert
      .dom('.hds-form-field__control textarea')
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

  test('it should append an indicator to the label text and set the required attribute when user input is required', async function (assert) {
    await render(
      <template>
        <HdsFormTextareaField @isRequired={{true}} as |F|>
          <F.Label>This is the label</F.Label>
        </HdsFormTextareaField>
      </template>,
    );
    assert.dom('label .hds-form-indicator').exists();
    assert.dom('label .hds-form-indicator').hasText('Required');
    assert.dom('textarea').hasAttribute('required');
  });
  test('it should append an indicator to the label text when user input is optional', async function (assert) {
    await render(
      <template>
        <HdsFormTextareaField @isOptional={{true}} as |F|>
          <F.Label>This is the label</F.Label>
        </HdsFormTextareaField>
      </template>,
    );
    assert.dom('label .hds-form-indicator').exists();
    assert.dom('label .hds-form-indicator').hasText('(Optional)');
  });
  test('it should not append an indicator to the label text when the required attribute is set', async function (assert) {
    await render(
      <template>
        <HdsFormTextareaField required as |F|>
          <F.Label>This is the label</F.Label>
        </HdsFormTextareaField>
      </template>,
    );
    assert.dom('textarea').hasAttribute('required');
    assert.dom('label .hds-form-indicator').doesNotExist();
  });
});

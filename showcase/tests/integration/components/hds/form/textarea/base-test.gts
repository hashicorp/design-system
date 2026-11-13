/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { fillIn, render, settled, triggerEvent } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import { concat } from '@ember/helper';
import { TrackedObject } from 'tracked-built-ins';

import { HdsFormTextareaBase } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds/form/textarea/base', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsFormTextareaBase id="test-form-textarea" /></template>,
    );
    assert.dom('#test-form-textarea').hasClass('hds-form-textarea');
  });

  test('it should set aria-describedby and id arguments if pass @id or @ariaDescribedBy', async function (assert) {
    await render(
      <template>
        <HdsFormTextareaBase
          @id="custom-id"
          @ariaDescribedBy="custom-description-id"
        />
      </template>,
    );
    assert
      .dom('#custom-id')
      .exists()
      .hasAria('describedby', 'custom-description-id');
  });

  // VALUE

  test('it should render the input with the value provided via @value argument', async function (assert) {
    await render(
      <template>
        <HdsFormTextareaBase @value="abc123" id="test-form-textarea" />
      </template>,
    );
    assert.dom('#test-form-textarea').hasValue('abc123');
  });

  for (const value of [undefined, 'initial value']) {
    test(`it preserves edits across unrelated updates with @value=${String(value)}`, async function (assert) {
      const state = new TrackedObject({ value, isInvalid: false });

      await render(
        <template>
          <HdsFormTextareaBase
            @value={{state.value}}
            @isInvalid={{state.isInvalid}}
          />
        </template>,
      );

      await fillIn('textarea', 'first line\nsecond line');
      assert.strictEqual(
        state.value,
        value,
        'does not mutate the caller value without an explicit handler',
      );
      state.isInvalid = true;
      await settled();
      assert.dom('textarea').hasValue('first line\nsecond line');

      await fillIn('textarea', '');
      assert.strictEqual(state.value, value);
      state.isInvalid = false;
      await settled();
      assert.dom('textarea').hasValue('');

      state.value = 'replacement';
      await settled();
      assert.dom('textarea').hasValue('replacement');

      state.value = value;
      await settled();
      assert.dom('textarea').hasValue(value ?? '');
    });
  }

  test('it allows editing omitted and literal values', async function (assert) {
    const state = new TrackedObject({ isInvalid: false });

    await render(
      <template>
        <HdsFormTextareaBase id="omitted" @isInvalid={{state.isInvalid}} />
        <HdsFormTextareaBase
          id="literal"
          @value="initial"
          @isInvalid={{state.isInvalid}}
        />
      </template>,
    );

    await fillIn('#omitted', 'omitted edit');
    await fillIn('#literal', 'literal edit');
    state.isInvalid = true;
    await settled();
    assert.dom('#omitted').hasValue('omitted edit');
    assert.dom('#literal').hasValue('literal edit');
  });

  test('it preserves local edits to a helper result until its value changes', async function (assert) {
    const state = new TrackedObject({ value: 'initial', isInvalid: false });

    await render(
      <template>
        <HdsFormTextareaBase
          @value={{concat state.value ""}}
          @isInvalid={{state.isInvalid}}
        />
      </template>,
    );

    await fillIn('textarea', 'local edit');
    assert.strictEqual(state.value, 'initial');
    state.isInvalid = true;
    await settled();
    assert.dom('textarea').hasValue('local edit');

    state.value = 'replacement';
    await settled();
    assert.dom('textarea').hasValue('replacement');
  });

  test('it forwards input and change events without requiring a setter', async function (assert) {
    const events: string[] = [];
    const recordValue = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLTextAreaElement) {
        events.push(`${event.type}:${target.value}`);
      }
    };

    await render(
      <template>
        <HdsFormTextareaBase
          @value="initial"
          {{on "input" recordValue}}
          {{on "change" recordValue}}
        />
      </template>,
    );

    await fillIn('textarea', 'edited');
    assert.deepEqual(events, ['input:edited', 'change:edited']);
    assert.dom('textarea').hasValue('edited');

    await triggerEvent('textarea', 'input', { inputType: 'insertFromPaste' });
    await triggerEvent('textarea', 'input', { inputType: 'deleteByCut' });
    assert.deepEqual(events.slice(2), ['input:edited', 'input:edited']);
  });

  test('it preserves attributes and value precedence', async function (assert) {
    await render(
      <template>
        <HdsFormTextareaBase
          @id="argument-id"
          @ariaDescribedBy="argument-description"
          @value="argument value"
          id="attribute-id"
          aria-describedby="attribute-description"
          value="attribute value"
          name="description"
          placeholder="Enter a description"
          maxlength="100"
          readonly
          disabled
          class="custom-textarea"
        />
      </template>,
    );

    assert
      .dom('#attribute-id')
      .hasValue('argument value')
      .hasAria('describedby', 'attribute-description')
      .hasAttribute('name', 'description')
      .hasAttribute('placeholder', 'Enter a description')
      .hasAttribute('maxlength', '100')
      .hasAttribute('readonly')
      .isDisabled()
      .hasClass('custom-textarea')
      .hasClass('hds-form-textarea')
      .doesNotHaveClass('ember-text-area')
      .doesNotHaveClass('ember-view');
  });

  test('it does not generate an ID when no ID is provided', async function (assert) {
    await render(<template><HdsFormTextareaBase /></template>);
    assert.dom('textarea').doesNotHaveAttribute('id');
  });

  // ROWS

  test('it should render the textarea with the default number of rows', async function (assert) {
    await render(<template><HdsFormTextareaBase /></template>);
    assert.dom('textarea').hasAttribute('rows', '4');
  });
  test('it should render the textarea with a custom number of rows', async function (assert) {
    await render(<template><HdsFormTextareaBase rows="2" /></template>);
    assert.dom('textarea').hasAttribute('rows', '2');
  });

  // INVALID

  test('it should render the correct CSS class if the @isInvalid prop is declared', async function (assert) {
    await render(
      <template>
        <HdsFormTextareaBase id="test-form-textarea" @isInvalid={{true}} />
      </template>,
    );
    assert.dom('#test-form-textarea').hasClass('hds-form-textarea--is-invalid');
  });
});

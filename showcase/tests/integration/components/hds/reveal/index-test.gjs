/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'showcase/tests/helpers';
import { click, render, setupOnerror } from '@ember/test-helpers';
import Reveal from "@hashicorp/design-system-components/components/hds/reveal/index";

module('Integration | Component | hds/reveal/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template>
      <Reveal @text="More options" id="test-reveal">Additional content</Reveal>
    </template>);
    assert.dom('#test-reveal').hasClass('hds-reveal');
  });

  // CONTENT

  test('it renders passed in @text content in the toggle button', async function (assert) {
    await render(
      <template>
        <Reveal @text="More options">
          Additional content
        </Reveal></template>,
    );
    assert.dom('.hds-reveal__toggle-button').hasText('More options');
  });

  test('it provides the correct accessible name and description when passed in @text and @ariaDescribedBy content in the toggle button', async function (assert) {
    await render(
      <template>
        <span id="reveal-description">GitHub apps</span>
        <Reveal @text="Show More" @ariaDescribedBy="reveal-description">
          Additional content
        </Reveal></template>,
    );
    assert
      .dom('.hds-reveal__toggle-button')
      .hasText('Show More')
      .hasAria('describedby', 'reveal-description');
  });

  test('it shows and hides passed in content when the toggle is triggered', async function (assert) {
    await render(
      <template>
        <Reveal @text="More options">
          Additional content
        </Reveal></template>,
    );
    // Test content is not shown before toggle is triggered
    assert.dom('.hds-reveal__content').doesNotExist();
    // Test that content is displayed after the toggle is triggered
    await click('.hds-reveal__toggle-button');
    assert.dom('.hds-reveal__content').exists().hasText('Additional content');
    // Test that content is hidden after the toggle is triggered again
    await click('.hds-reveal__toggle-button');
    assert.dom('.hds-reveal__content').doesNotExist();
  });

  // A11Y

  test('it displays the correct value for aria-expanded when closed vs open', async function (assert) {
    await render(
      <template>
        <Reveal @text="More options">
          Additional content
        </Reveal>
      </template>,
    );
    assert
      .dom('.hds-reveal__toggle-button')
      .hasAttribute('aria-expanded', 'false');
    await click('.hds-reveal__toggle-button');
    assert
      .dom('.hds-reveal__toggle-button')
      .hasAttribute('aria-expanded', 'true');
  });

  test('the toggle button has an aria-controls attribute with a value matching the DisclosurePrimitive content id', async function (assert) {
    await render(
      <template><Reveal @text="More options">Additional content</Reveal></template>,
    );
    await click('.hds-reveal__toggle-button');
    assert.dom('.hds-reveal__toggle-button').hasAttribute('aria-controls');

    assert.strictEqual(
      this.element
        .querySelector('.hds-reveal__toggle-button')
        .getAttribute('aria-controls'),
      this.element
        .querySelector('.hds-disclosure-primitive__content')
        .getAttribute('id'),
    );
  });

  // OPTIONS

  // isOpen

  test('it displays content initially when @isOpen is set to true, ', async function (assert) {
    await render(
      <template>
        <Reveal @text="More options" @isOpen={{true}}>
          Additional content
        </Reveal></template>,
    );
    // Test content is displayed
    assert.dom('.hds-reveal__content').exists().hasText('Additional content');
    // Test that content is hidden after the toggle is triggered
    await click('.hds-reveal__toggle-button');
    assert.dom('.hds-reveal__content').doesNotExist();
  });

  // textWhenOpen

  test('it displays different passed in text when open', async function (assert) {
    await render(
      <template>
      <Reveal @text="Open me" @textWhenOpen="Close me">
        Additional content
      </Reveal></template>,
    );
    await click('.hds-reveal__toggle-button');
    assert.dom('.hds-reveal__toggle-button').hasText('Close me');
  });

  // ASSERTIONS

  test('it should throw an assertion if @text is missing/has no value', async function (assert) {
    const errorMessage = '@text for "Hds::Reveal" must have a valid value';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(<template><Reveal>Additional content</Reveal></template>);
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});

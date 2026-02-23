/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, setupOnerror, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import style from 'ember-style-modifier';

import { HdsIcon } from '@hashicorp/design-system-components/components';
import { setupRenderingTest } from 'showcase/tests/helpers';

module('Integration | Component | hds-icon', function (hooks) {
  setupRenderingTest(hooks);

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(<template><HdsIcon @name="activity" /></template>);
    assert.dom('svg.hds-icon').hasClass('hds-icon');
  });

  // SIZE

  test('it renders the 16x16 icon by default', async function (assert) {
    await render(<template><HdsIcon @name="activity" /></template>);
    assert
      .dom('svg.hds-icon.hds-icon-activity')
      .hasStyle({ height: '16px', width: '16px' })
      .hasAttribute('width', '16')
      .hasAttribute('height', '16');
  });
  test('it renders the 24x24 icon when the "size" option is set', async function (assert) {
    await render(<template><HdsIcon @name="activity" @size="24" /></template>);
    assert
      .dom('svg.hds-icon.hds-icon-activity')
      .hasStyle({ height: '24px', width: '24px' })
      .hasAttribute('width', '24')
      .hasAttribute('height', '24');
  });
  test('it applies the hds-icon--stretched class when the "stretched" option is set to true', async function (assert) {
    await render(
      <template>
        <HdsIcon @name="activity" @size="24" @stretched={{true}} />
      </template>,
    );
    assert
      .dom('svg.hds-icon.hds-icon-activity')
      .hasClass('hds-icon--stretched');
  });

  // DISPLAY

  test('it does not have the "hds-icon--is-inline" class by default', async function (assert) {
    await render(<template><HdsIcon @name="activity" /></template>);
    assert.dom('svg.hds-icon').doesNotHaveClass('hds-icon--is-inline');
  });
  test('it does have the "hds-icon--is-inline" class if the `@isInline` option is set to `true`', async function (assert) {
    await render(
      <template><HdsIcon @name="activity" @isInline={{true}} /></template>,
    );
    assert.dom('svg.hds-icon').hasClass('hds-icon--is-inline');
  });

  // COLOR

  test('the fill color should be `currentColor` if no @color is declared', async function (assert) {
    await render(<template><HdsIcon @name="alert-circle" /></template>);
    assert.dom(`svg.hds-icon`).hasAttribute('fill', 'currentColor');
  });
  test('it should render the correct CSS color class if the @color prop is declared using a pre-defined color', async function (assert) {
    await render(
      <template><HdsIcon @name="alert-circle" @color="highlight" /></template>,
    );
    // notice: we use CSS helper classes for the color definitions
    assert.dom(`svg.hds-icon`).hasClass('hds-foreground-highlight');
    assert.dom(`svg.hds-icon`).hasAttribute('fill', 'currentColor');
  });
  test('it should render the correct style if the @color prop is declared as custom CSS property color', async function (assert) {
    await render(
      <template>
        <HdsIcon
          @name="alert-circle"
          @color="var(--doc-color-feedback-critical-100)"
        />
      </template>,
    );
    assert
      .dom(`svg.hds-icon`)
      .hasAttribute('fill', 'var(--doc-color-feedback-critical-100)');
  });
  test('it should render the correct style if the @color prop is declared as custom HEX color', async function (assert) {
    await render(
      <template><HdsIcon @name="alert-circle" @color="#FF0000" /></template>,
    );
    assert.dom(`svg.hds-icon`).hasAttribute('fill', '#FF0000');
  });
  test('the fill color should be able to be inherited from parent', async function (assert) {
    await render(
      <template>
        <div {{style color="blue"}}><HdsIcon @name="alert-circle" /></div>
      </template>,
    );
    assert.dom(`svg.hds-icon`).hasStyle({
      fill: 'rgb(0, 0, 255)',
    });
  });

  // REACTIVITY

  test('it updates the icon when @name argument changes', async function (assert) {
    class State {
      @tracked name = 'activity';
    }
    const state = new State();

    await render(<template><HdsIcon @name={{state.name}} /></template>);
    assert.dom('svg.hds-icon').hasClass('hds-icon-activity');

    state.name = 'alert-circle';
    await settled(); // Wait for the service to fetch, buffer, and flush RAF

    assert.dom('svg.hds-icon').hasClass('hds-icon-alert-circle');
  });

  // A11Y

  test('it renders the title if one is defined', async function (assert) {
    await render(
      <template><HdsIcon @name="activity" @title="try to avoid" /></template>,
    );
    assert.dom('title').containsText('try to avoid');
  });
  test('it has aria-hidden set to true by default', async function (assert) {
    await render(<template><HdsIcon @name="activity" /></template>);
    assert.dom('svg.hds-icon.hds-icon-activity').hasAria('hidden', 'true');
  });
  test('it has aria-hidden set to false if a title is defined', async function (assert) {
    await render(
      <template><HdsIcon @name="activity" @title="try to avoid" /></template>,
    );
    assert.dom('svg.hds-icon.hds-icon-activity').hasAria('hidden', 'false');
  });
  test('it has aria-labelledby if a title exists', async function (assert) {
    await render(
      <template><HdsIcon @name="activity" @title="try to avoid" /></template>,
    );
    assert
      .dom('svg.hds-icon.hds-icon-activity')
      .hasAttribute('aria-labelledby');
  });
  test('it does not have aria-labelledby if a title does not exist', async function (assert) {
    await render(<template><HdsIcon @name="activity" /></template>);
    assert
      .dom('svg.hds-icon.hds-icon-activity')
      .doesNotHaveAttribute('aria-labelledby');
  });
  test('it has a g element with role of presentation if a title exists', async function (assert) {
    await render(
      <template>
        <HdsIcon @name="activity" @title="computer says no" />
      </template>,
    );
    assert.dom('svg > g').hasAttribute('role');
  });

  // ASSERTIONS

  test('it should throw an assertion if @name is not provided', async function (assert) {
    const errorMessage = `Assertion Failed: Please provide to <Hds::Icon> a value for @name`;

    assert.expect(1);

    setupOnerror(function (error) {
      assert.strictEqual(error.message, errorMessage);
    });
    await render(
      <template>
        {{! @glint-expect-error - testing invalid component usage }}
        <HdsIcon />
      </template>,
    );
  });
  test('it should throw an assertion if the icon @name does not exist', async function (assert) {
    // This tests the `registryEntry` getter assertion
    const errorMessage = `Assertion Failed: The icon @name "abc" or @size "16" provided to <Hds::Icon> is not correct. Please verify it exists on https://helios.hashicorp.design/icons/library`;

    assert.expect(1);

    setupOnerror(function (error) {
      assert.strictEqual(error.message, errorMessage);
    });

    await render(
      <template>
        {{! @glint-expect-error - testing invalid component usage }}
        <HdsIcon @name="abc" @size="16" />
      </template>,
    );
  });

  test('it should throw an assertion if the icon @size does not exist for a valid name', async function (assert) {
    const errorMessage = `Assertion Failed: Flight icon not available for "activity" with size "48".`;

    assert.expect(1);

    setupOnerror(function (error) {
      assert.strictEqual(error.message, errorMessage);
    });

    await render(
      <template>
        {{! @glint-expect-error - testing invalid component usage }}
        <HdsIcon @name="activity" @size="48" />
      </template>,
    );
  });
});

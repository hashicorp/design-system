/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { render, resetOnerror, setupOnerror, find } from '@ember/test-helpers';

import { HdsAlert } from '@hashicorp/design-system-components/components';

import { setupRenderingTest } from 'showcase/tests/helpers';
import NOOP from 'showcase/utils/noop';

module('Integration | Component | hds/alert/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render the component with a CSS class that matches the component name', async function (assert) {
    await render(
      <template><HdsAlert @type="inline" id="test-alert" /></template>,
    );
    assert.dom('#test-alert').hasClass('hds-alert');
  });

  // TYPE

  test('it should render the correct CSS type class depending on the @type prop', async function (assert) {
    await render(
      <template><HdsAlert @type="page" id="test-alert" /></template>,
    );
    assert.dom('#test-alert').hasClass('hds-alert--type-page');
  });

  // ICON

  test('it should render an icon by default depending on the type and color', async function (assert) {
    // here we don't test all the possible combinations, only some of them as precaution
    await render(<template><HdsAlert @type="inline" /></template>);
    assert.dom('.hds-icon-info').exists();
    await render(<template><HdsAlert @type="compact" /></template>);
    assert.dom('.hds-icon-info-fill').exists();
    await render(
      <template><HdsAlert @type="inline" @color="highlight" /></template>,
    );
    assert.dom('.hds-icon-info').exists();
    await render(
      <template><HdsAlert @type="inline" @color="success" /></template>,
    );
    assert.dom('.hds-icon-check-circle').exists();
    await render(
      <template><HdsAlert @type="inline" @color="warning" /></template>,
    );
    assert.dom('.hds-icon-alert-triangle').exists();
    await render(
      <template><HdsAlert @type="inline" @color="critical" /></template>,
    );
    assert.dom('.hds-icon-alert-diamond').exists();
  });

  test('if an icon is declared, the icon should render in the component and override the default one', async function (assert) {
    await render(
      <template><HdsAlert @type="inline" @icon="clipboard-copy" /></template>,
    );
    assert.dom('.hds-icon-clipboard-copy').exists();
    await render(
      <template><HdsAlert @type="compact" @icon="clipboard-copy" /></template>,
    );
    assert.dom('.hds-icon-clipboard-copy').exists();
  });

  test('it should display no icon when @icon is set to false', async function (assert) {
    await render(
      <template><HdsAlert @type="inline" @icon={{false}} /></template>,
    );
    assert.dom('.hds-icon').doesNotExist();
  });

  // TEXT (TITLE + DESCRIPTION)

  test('it should render the title when the "title" contextual component is provided', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" as |A|><A.Title>This is the title</A.Title></HdsAlert>
      </template>,
    );
    assert.dom('.hds-alert').hasText('This is the title');
  });
  test('it should render the description when the "description" contextual component is provided', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" as |A|><A.Description>This is the description</A.Description></HdsAlert>
      </template>,
    );
    assert.dom('.hds-alert').hasText('This is the description');
  });
  test('it should render rich HTML when the "description" contextual component contains HTML tags', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" as |A|><A.Description>Hello
            <strong>strong</strong>
            and
            <em>em</em>
            and
            <code>code</code>
            and
            <a href="#">link</a></A.Description></HdsAlert>
      </template>,
    );
    assert.dom('.hds-alert__description strong').exists().hasText('strong');
    assert.dom('.hds-alert__description em').exists().hasText('em');
    assert.dom('.hds-alert__description code').exists().hasText('code');
    assert.dom('.hds-alert__description a').exists().hasText('link');
  });
  test('it should render a div when the @tag argument is not provided', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" as |A|>
          <A.Title>This is the title</A.Title>
        </HdsAlert>
      </template>,
    );
    assert.dom('.hds-alert__title').hasTagName('div');
  });
  test('it should render the custom title tag when the @tag argument is provided', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" as |A|>
          <A.Title @tag="h2">This is the title</A.Title>
        </HdsAlert>
      </template>,
    );
    assert.dom('.hds-alert__title').hasTagName('h2');
  });

  // ACTIONS

  test('it should render an Hds::Button component yielded to the "actions" container', async function (assert) {
    await render(
      <template>
        <HdsAlert
          @type="inline"
          aria-labelledby="test-alert-button"
          id="test-alert"
          as |A|
        ><A.Button
            @text="I am a button"
            @size="small"
            @color="secondary"
            id="test-alert-button"
          /></HdsAlert>
      </template>,
    );
    assert
      .dom('#test-alert .hds-alert__actions button')
      .exists()
      .hasClass('hds-button')
      .hasClass('hds-button--size-small')
      .hasClass('hds-button--color-secondary')
      .hasText('I am a button');
  });
  test('it should render an Hds::Link::Standalone component yielded to the "actions" container', async function (assert) {
    await render(
      <template>
        <HdsAlert
          @type="inline"
          aria-labelledby="test-alert-link"
          id="test-alert"
          as |A|
        ><A.LinkStandalone
            @icon="plus"
            @text="I am a link"
            @href="#"
            @size="small"
            @color="secondary"
            id="test-alert-link"
          /></HdsAlert>
      </template>,
    );
    assert
      .dom('#test-alert .hds-alert__actions a')
      .exists()
      .hasClass('hds-link-standalone')
      .hasClass('hds-link-standalone--size-small')
      .hasClass('hds-link-standalone--color-secondary')
      .hasText('I am a link');
  });

  // GENERIC

  test('it should render any content passed to the "generic" contextual component', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" id="test-alert" as |A|><A.Generic><pre
            >test</pre></A.Generic></HdsAlert>
      </template>,
    );
    assert.dom('#test-alert .hds-alert__content pre').exists().hasText('test');
  });

  // DISMISS

  test('it should not render the "dismiss" button by default', async function (assert) {
    await render(<template><HdsAlert @type="inline" /></template>);
    assert.dom('button.hds-alert__dismiss').doesNotExist();
  });
  test('it should render the "dismiss" button if a callback function is passed to the @onDismiss argument', async function (assert) {
    await render(
      <template><HdsAlert @type="inline" @onDismiss={{NOOP}} /></template>,
    );
    assert.dom('button.hds-alert__dismiss').exists();
  });

  // A11Y

  // * Colors for alert usages which notify users: success, warning, critical

  test('it should render the component with role="alert" and aria-live="polite" for the "success" color', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" @color="success" id="test-alert" />
      </template>,
    );
    assert.dom('#test-alert').hasAttribute('role', 'alert');
    assert.dom('#test-alert').hasAttribute('aria-live', 'polite');
  });

  test('it should render the component with role="alert" and aria-live="polite" for the "warning" color', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" @color="warning" id="test-alert" />
      </template>,
    );
    assert.dom('#test-alert').hasAttribute('role', 'alert');
    assert.dom('#test-alert').hasAttribute('aria-live', 'polite');
  });

  test('it should render the component with role="alert" and aria-live="polite" for the "critical" color', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" @color="critical" id="test-alert" />
      </template>,
    );
    assert.dom('#test-alert').hasAttribute('role', 'alert');
    assert.dom('#test-alert').hasAttribute('aria-live', 'polite');
  });

  // * Colors for informational & promo usages: neutral, highlight

  test('it should not render the component with role="alert" and aria-live="polite" for the "neutral" color', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" @color="neutral" id="test-alert" />
      </template>,
    );
    assert.dom('#test-alert').doesNotHaveAttribute('role', 'alert');
    assert.dom('#test-alert').doesNotHaveAttribute('aria-live', 'polite');
  });

  test('it should not render the component with role="alert" and aria-live="polite" for the "highlight" color', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" @color="highlight" id="test-alert" />
      </template>,
    );
    assert.dom('#test-alert').doesNotHaveAttribute('role', 'alert');
    assert.dom('#test-alert').doesNotHaveAttribute('aria-live', 'polite');
  });

  // aria-labelledby

  test('it should render with an auto-generated `aria-labelledby` when a title is provided', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" id="test-alert" as |A|>
          <A.Title>This is the title</A.Title>
        </HdsAlert>
      </template>,
    );
    const title = find('#test-alert .hds-alert__title');
    const titleId = title?.id ?? '';

    assert.dom('#test-alert').hasAttribute('aria-labelledby', titleId);
  });

  test('it should render with an auto-generated `aria-labelledby` when description is provided', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" id="test-alert" as |A|>
          <A.Description>This is the title</A.Description>
        </HdsAlert>
      </template>,
    );
    const description = find('#test-alert .hds-alert__description');
    assert
      .dom('#test-alert')
      .hasAttribute('aria-labelledby', description?.id ?? '');
  });

  // Alert dialogs

  // * Colors for alert usages which notify users: success, warning, critical

  test('it should render with with role="alertdialog" and aria-live="polite" for the "success" color when actions are provided', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" @color="success" id="test-alert" as |A|>
          <A.Button @text="I am a button" @size="small" />
        </HdsAlert>
      </template>,
    );
    assert.dom('#test-alert').hasAttribute('role', 'alertdialog');
    assert.dom('#test-alert').hasAttribute('aria-live', 'polite');
  });

  test('it should render with with role="alertdialog" and aria-live="polite" for the "warning" color when actions are provided', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" @color="warning" id="test-alert" as |A|>
          <A.Button @text="I am a button" @size="small" />
        </HdsAlert>
      </template>,
    );
    assert.dom('#test-alert').hasAttribute('role', 'alertdialog');
    assert.dom('#test-alert').hasAttribute('aria-live', 'polite');
  });

  test('it should render with with role="alertdialog" and aria-live="polite" for the "critical" color when actions are provided', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" @color="critical" id="test-alert" as |A|>
          <A.Button @text="I am a button" @size="small" />
        </HdsAlert>
      </template>,
    );
    assert.dom('#test-alert').hasAttribute('role', 'alertdialog');
    assert.dom('#test-alert').hasAttribute('aria-live', 'polite');
  });

  // * Colors for informational & promo usages: neutral, highlight

  test('it should not render with with role="alertdialog" and aria-live="polite" for the "neutral" color when actions are provided', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" @color="neutral" id="test-alert" as |A|>
          <A.Button @text="I am a button" @size="small" />
        </HdsAlert>
      </template>,
    );
    assert.dom('#test-alert').doesNotHaveAttribute('role', 'alertdialog');
    assert.dom('#test-alert').doesNotHaveAttribute('aria-live', 'polite');
  });

  test('it should not render with with role="alertdialog" and aria-live="polite" for the "highlight" color when actions are provided', async function (assert) {
    await render(
      <template>
        <HdsAlert @type="inline" @color="highlight" id="test-alert" as |A|>
          <A.Button @text="I am a button" @size="small" />
        </HdsAlert>
      </template>,
    );
    assert.dom('#test-alert').doesNotHaveAttribute('role', 'alertdialog');
    assert.dom('#test-alert').doesNotHaveAttribute('aria-live', 'polite');
  });

  // ASSERTIONS

  test('it should throw an assertion if an incorrect value for @type is provided', async function (assert) {
    const errorMessage =
      '@type for "Hds::Alert" must be one of the following: page, inline, compact; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        {{! @glint-expect-error - assertion testing invalid value }}
        <HdsAlert @type="foo" />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if a "compact" alerts is rendered with @icon equal to false', async function (assert) {
    const errorMessage =
      '@icon for "Hds::Alert" with @type "compact" is required';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template><HdsAlert @type="compact" @icon={{false}} /></template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
  test('it should throw an assertion if an incorrect value for @color is provided', async function (assert) {
    const errorMessage =
      '@color for "Hds::Alert" must be one of the following: neutral, highlight, success, warning, critical; received: foo';
    assert.expect(2);
    setupOnerror(function (error) {
      assert.strictEqual(error.message, `Assertion Failed: ${errorMessage}`);
    });
    await render(
      <template>
        {{! @glint-expect-error - assertion testing invalid value }}
        <HdsAlert @type="inline" @color="foo" />
      </template>,
    );
    assert.throws(function () {
      throw new Error(errorMessage);
    });
  });
});

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, focus, render, triggerKeyEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/tabs/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the component', async function (assert) {
    await render(hbs`
      <Hds::Tabs as |T|>
        <T.Tab>One</T.Tab>
        <T.Tab>Two</T.Tab>
        <T.Panel>Content 1</T.Panel>
        <T.Panel>Content 2</T.Panel>
      </Hds::Tabs>
  `);
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component names', async function (assert) {
    await render(hbs`
      <Hds::Tabs id="test-tabs" as |T|>
        <T.Tab data-test="tab">One</T.Tab>
        <T.Tab>Two</T.Tab>
        <T.Panel data-test="panel">Content 1</T.Panel>
        <T.Panel>Content 2</T.Panel>
      </Hds::Tabs>
    `);
    assert.dom('#test-tabs').hasClass('hds-tabs');
    assert.dom('[data-test="tab"]').hasClass('hds-tabs__tab');
    assert.dom('[data-test="panel"]').hasClass('hds-tabs__panel');
  });

  test('it should have 2 Tabs and 2 Panels', async function (assert) {
    await render(hbs`
      <Hds::Tabs as |T|>
        <T.Tab>One</T.Tab>
        <T.Tab>Two</T.Tab>
        <T.Panel>Content 1</T.Panel>
        <T.Panel>Content 2</T.Panel>
      </Hds::Tabs>
    `);
    assert.dom('.hds-tabs__tab').exists({ count: 2 });
    assert.dom('.hds-tabs__panel').exists({ count: 2 });
  });

  // Test tab and panel selection and display:

  test('it should select the first tab and display the first panel by default', async function (assert) {
    await render(hbs`
      <Hds::Tabs as |T|>
        <T.Tab data-test="selected tab">One</T.Tab>
        <T.Tab data-test="NOT selected tab">Two</T.Tab>
        <T.Panel data-test="selected panel">Content 1</T.Panel>
        <T.Panel data-test="NOT selected panel">Content 2</T.Panel>
      </Hds::Tabs>
    `);
    assert
      .dom('[data-test="selected tab"]')
      .hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="selected tab"] .hds-tabs__tab-button')
      .hasAttribute('aria-selected');
    assert.dom('[data-test="selected panel"]').doesNotHaveAttribute('hidden');

    assert
      .dom('[data-test="NOT selected tab"]')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="NOT selected tab"] .hds-tabs__tab-button')
      .doesNotHaveAttribute('aria-selected');
    assert.dom('[data-test="NOT selected panel"]').hasAttribute('hidden');
  });

  test('it should select the specified tab and display the associated panel', async function (assert) {
    await render(hbs`
      <Hds::Tabs as |T|>
        <T.Tab data-test="NOT selected tab">One</T.Tab>
        <T.Tab @isSelected="true" data-test="selected tab">Two</T.Tab>
        <T.Panel data-test="NOT selected panel">Content 1</T.Panel>
        <T.Panel data-test="selected panel">Content 2</T.Panel>
      </Hds::Tabs>
    `);
    assert
      .dom('[data-test="selected tab"]')
      .hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="selected tab"] .hds-tabs__tab-button')
      .hasAttribute('aria-selected');
    assert.dom('[data-test="selected panel"]').doesNotHaveAttribute('hidden');

    assert
      .dom('[data-test="NOT selected tab"]')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="NOT selected tab"] .hds-tabs__tab-button')
      .doesNotHaveAttribute('aria-selected');
    assert.dom('[data-test="NOT selected panel"]').hasAttribute('hidden');
  });

  test('it should select the clicked tab and display the associated panel', async function (assert) {
    await render(hbs`
      <Hds::Tabs as |T|>
        <T.Tab data-test="NOT clicked tab">One</T.Tab>
        <T.Tab data-test="clicked tab">Two</T.Tab>
        <T.Panel data-test="NOT clicked tab panel">Content 1</T.Panel>
        <T.Panel data-test="clicked tab panel">Content 2</T.Panel>
      </Hds::Tabs>
    `);
    await click('[data-test="clicked tab"] .hds-tabs__tab-button');
    assert
      .dom('[data-test="clicked tab"]')
      .hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="clicked tab"] .hds-tabs__tab-button')
      .hasAttribute('aria-selected');
    assert
      .dom('[data-test="clicked tab panel"]')
      .doesNotHaveAttribute('hidden');

    assert
      .dom('[data-test="NOT clicked tab"]')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
    assert
      .dom('[data-test="NOT clicked tab"] .hds-tabs__tab-button')
      .doesNotHaveAttribute('aria-selected');
    assert.dom('[data-test="NOT clicked tab panel"]').hasAttribute('hidden');
  });

  // Test keyboard controls:

  test('it should focus tabs and navigate through them using left and right arrow keys', async function (assert) {
    const leftArrowKey = 37;
    const rightArrowKey = 39;

    await render(hbs`
      <Hds::Tabs as |T|>
        <T.Tab data-test="first tab">One</T.Tab>
        <T.Tab data-test="secound tab">Two</T.Tab>
        <T.Panel data-test="first panel">Content 1</T.Panel>
        <T.Panel data-test="secound panel">Content 2</T.Panel>
      </Hds::Tabs>
    `);
    // focus 2nd tab:
    await focus('[data-test="secound tab"] .hds-tabs__tab-button');
    // navigate to the previous (1st) tab using right arrow key:
    await triggerKeyEvent(
      '[data-test="secound tab"] .hds-tabs__tab-button',
      'keyup',
      rightArrowKey
    );
    // test that the navigated to tab is now focused:
    assert.dom('[data-test="first tab"] .hds-tabs__tab-button').isFocused();

    // navigate back to the next (2nd) tab using left arrow key:
    await triggerKeyEvent(
      '[data-test="first tab"] .hds-tabs__tab-button',
      'keyup',
      leftArrowKey
    );
    // test that the navigated to tab is now focused:
    assert.dom('[data-test="secound tab"] .hds-tabs__tab-button').isFocused();
  });

  // Test Tab options:

  test('it should render an icon when passed into a tab', async function (assert) {
    await render(hbs`
      <Hds::Tabs as |T|>
        <T.Tab @icon="info">One</T.Tab>
        <T.Tab>Two</T.Tab>
        <T.Panel>Content 1</T.Panel>
        <T.Panel>Content 2</T.Panel>
      </Hds::Tabs>
    `);
    assert.dom('.hds-tabs__tab-icon').exists();
    assert.dom('.hds-tabs__tab-icon').hasAttribute('data-test-icon', 'info');
  });

  test('it should render a count when passed into a tab', async function (assert) {
    await render(hbs`
      <Hds::Tabs as |T|>
        <T.Tab @count="5">One</T.Tab>
        <T.Tab>Two</T.Tab>
        <T.Panel>Content 1</T.Panel>
        <T.Panel>Content 2</T.Panel>
      </Hds::Tabs>
    `);
    assert.dom('.hds-tabs__tab-count').exists();
    assert.dom('.hds-tabs__tab-count').hasText('5');
  });
});

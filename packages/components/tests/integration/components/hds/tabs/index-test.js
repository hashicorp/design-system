import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/tabs/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::Tabs />`);
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
});

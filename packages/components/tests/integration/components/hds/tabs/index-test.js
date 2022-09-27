import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
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

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <Hds::Tabs id="test-tabs" as |T|>
        <T.Tab>One</T.Tab>
        <T.Tab>Two</T.Tab>
        <T.Panel>Content 1</T.Panel>
        <T.Panel>Content 2</T.Panel>
      </Hds::Tabs>
    `);
    assert.dom('#test-tabs').hasClass('hds-tabs');
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
        <T.Tab>One</T.Tab>
        <T.Tab>Two</T.Tab>
        <T.Panel>Content 1</T.Panel>
        <T.Panel>Content 2</T.Panel>
      </Hds::Tabs>
    `);
    assert
      .dom('.hds-tabs__tab:first-child')
      .hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('.hds-tabs__tab:first-child .hds-tabs__link')
      .hasAttribute('aria-selected');
    assert.dom('.hds-tabs__panel:first-of-type').doesNotHaveAttribute('hidden');

    assert
      .dom('.hds-tabs__tab:not(:first-child)')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
    assert
      .dom('.hds-tabs__tab:not(:first-child) .hds-tabs__link')
      .doesNotHaveAttribute('aria-selected');
    assert.dom('.hds-tabs__panel:not(:first-of-type)').hasAttribute('hidden');
  });

  test('it should select the specified tab and display the associated panel', async function (assert) {
    await render(hbs`
    <Hds::Tabs as |T|>
      <T.Tab>One</T.Tab>
      <T.Tab @isSelected="true">Two</T.Tab>
      <T.Panel>Content 1</T.Panel>
      <T.Panel>Content 2</T.Panel>
    </Hds::Tabs>
  `);
    assert
      .dom('.hds-tabs__tab:nth-child(2)')
      .hasClass('hds-tabs__tab--is-selected');
    assert
      .dom('.hds-tabs__tab:nth-child(2) .hds-tabs__link')
      .hasAttribute('aria-selected');
    assert
      .dom('.hds-tabs__panel:nth-of-type(2)')
      .doesNotHaveAttribute('hidden');

    assert
      .dom('.hds-tabs__tab:not(:nth-child(2))')
      .doesNotHaveClass('hds-tabs__tab--is-selected');
    assert
      .dom('.hds-tabs__tab:not(:nth-child(2)) .hds-tabs__link')
      .doesNotHaveAttribute('aria-selected');
    assert.dom('.hds-tabs__panel:not(:nth-of-type(2))').hasAttribute('hidden');
  });
});

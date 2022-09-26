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

  // TODO: Must be 2 or more Tabs & Panels

  // TODO: Must have same number of Tabs & Panels

  // TODO: First tab should be selected & first panel contents should display by default

  // TODO: If isSelected is used on a tab, it should be selected and its panel displayed by default

  // TODO: Only one Tab max should have isSelected set
});

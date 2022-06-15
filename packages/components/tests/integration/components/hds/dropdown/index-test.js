import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/dropdown/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the dropdown container', async function (assert) {
    await render(hbs`<Hds::Dropdown />`);
    assert.dom(this.element).exists();
  });
  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Dropdown id="test-dropdown" />`);
    assert.dom('#test-dropdown').hasClass('hds-dropdown');
  });

  // NAMED YIELDS

  test('it renders the "toggle" sub-components', async function (assert) {
    assert.expect(2);
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" as |dd|>
        <dd.ToggleButton @text="toggle button" id="test-toggle-button" />
        <dd.ToggleIcon @icon="user" @text="toggle icon" id="test-toggle-icon" />
      </Hds::Dropdown>
    `);
    assert.dom('#test-dropdown #test-toggle-button').exists();
    assert.dom('#test-dropdown #test-toggle-icon').exists();
  });
  test('it renders the "list-item" sub-components', async function (assert) {
    assert.expect(6);
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" as |dd|>
        <dd.ToggleButton @text="toggle button" id="test-toggle-button" />
        <dd.Description @text="description" id="test-list-item-description" />
        <dd.Generic>
          <div id="test-list-item-generic" />
        </dd.Generic>
        <dd.Interactive @route="components.dropdown" @text="interactive" id="test-list-item-interactive" />
        <dd.Separator id="test-list-item-separator" />
        <dd.Title @text="title" id="test-list-item-title" />
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    assert.dom('#test-dropdown ul').exists();
    assert.dom('#test-dropdown #test-list-item-description').exists();
    assert.dom('#test-dropdown #test-list-item-generic').exists();
    assert.dom('#test-dropdown #test-list-item-interactive').exists();
    assert.dom('#test-dropdown #test-list-item-separator').exists();
    assert.dom('#test-dropdown #test-list-item-title').exists();
  });

  // POSITION

  test('it should render the content aligned on the right by default', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" as |dd|>
        <dd.ToggleButton @text="toggle button" id="test-toggle-button" />
        <dd.Interactive @route="components.dropdown" @text="interactive" />
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    assert
      .dom('#test-dropdown ul')
      .hasClass('hds-dropdown-list--position-right');
  });
  test('it should render the content aligned on the left if the value of @listPosition is "left"', async function (assert) {
    await render(hbs`
      <Hds::Dropdown id="test-dropdown" @listPosition="left" as |dd|>
        <dd.ToggleButton @text="toggle button" id="test-toggle-button" />
        <dd.Interactive @route="components.dropdown" @text="interactive" />
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    assert
      .dom('#test-dropdown ul')
      .hasClass('hds-dropdown-list--position-left');
  });

  // WIDTH

  test('it should render the content with a fixed width if a @width value is passed', async function (assert) {
    await render(hbs`
      <Hds::Dropdown @width="248px" id="test-dropdown" as |dd|>
        <dd.ToggleButton @text="toggle button" id="test-toggle-button" />
        <dd.Interactive @route="components.dropdown" @text="interactive" />
      </Hds::Dropdown>
    `);
    await click('button#test-toggle-button');
    assert.dom('#test-dropdown ul').hasStyle({ width: '248px' });
  });

  // SPLATTRIBUTES

  test('it should spread all the attributes passed to the component', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Dropdown id="test-dropdown" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('#test-dropdown').hasClass('my-class');
    assert.dom('#test-dropdown').hasAttribute('data-test1');
    assert.dom('#test-dropdown').hasAttribute('data-test2', 'test');
  });
});

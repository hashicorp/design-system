import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/gutters/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the component', async function (assert) {
    await render(hbs`
      <Hds::Gutters @direction="vertical">
        <span>child 1</span>
        <span>child 2</span>
      </Hds::Gutters>
    `);
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`
      <Hds::Gutters @direction="vertical" id="test-gutters">
        <span>child 1</span>
        <span>child 2</span>
      </Hds::Gutters>
    `);
    assert.dom('#test-gutters').hasClass('hds-gutters');
  });

  test('if no spacing value is passed, it should render without a CSS "spacing" class and without a style attribute', async function (assert) {
    await render(hbs`
      <Hds::Gutters @direction="vertical" id="test-gutters">
        <span>child 1</span>
        <span>child 2</span>
      </Hds::Gutters>
    `);
    assert
      .dom('#test-gutters')
      .doesNotHaveClass('[hds-gutters-spacing]')
      .doesNotHaveAttribute('style');
  });

  test('if a preset spacing value is passed, it should render with a matching CSS "spacing" class but without a style attribute', async function (assert) {
    await render(hbs`
      <Hds::Gutters @direction="vertical" @spacing="xl" id="test-gutters">
        <span>child 1</span>
        <span>child 2</span>
      </Hds::Gutters>
    `);
    assert
      .dom('#test-gutters')
      .hasClass('hds-gutters-spacing-xl')
      .doesNotHaveAttribute('style');
  });

  test('if a custom css unit spacing value is passed, it should render with a matching style attribute but without a CSS "spacing" class', async function (assert) {
    await render(hbs`
      <Hds::Gutters @direction="vertical" @spacing="2rem" id="test-gutters">
        <span>child 1</span>
        <span>child 2</span>
      </Hds::Gutters>
    `);
    assert
      .dom('#test-gutters')
      .doesNotHaveClass('[hds-gutters-spacing]')
      .hasAttribute('style', '--hds-spacing: 2rem');
  });

  test('if isSpan is passed, it should render as a span tag', async function (assert) {
    await render(hbs`
      <Hds::Gutters @direction="horizontal" @isSpan="true" id="test-gutters">
        <span>child 1</span>
        <span>child 2</span>
      </Hds::Gutters>
    `);
    assert.dom('#test-gutters').hasTagName('span');
  });
});

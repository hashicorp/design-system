import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/button/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a button with the defined text', async function (assert) {
    await render(hbs`<Hds::Button @text="Copy to Clipboard" />`);
    assert.dom(this.element).hasText('Copy to Clipboard');
  });
  test('it should render a CSS class that matches the button component name', async function (assert) {
    await render(hbs`<Hds::Button @text="Copy to Clipboard" />`);
    assert.dom('button').hasClass('hds-button');
  });
  test('it should render the medium size button by default', async function (assert) {
    await render(hbs`<Hds::Button @text="Copy to Clipboard" />`);
    assert.dom('button').hasClass('hds-button--size-medium');
  });
  test('it should render the primary button by default', async function (assert) {
    await render(hbs`<Hds::Button @text="Copy to Clipboard" />`);
    assert.dom('button').hasClass('hds-button--color-primary');
  });
  test('it should render an icon in the button if an icon name is passed', async function (assert) {
    await render(
      hbs`<Hds::Button @text="Copy to Clipboard" @icon="clipboard-copy" />`
    );
    assert.dom('svg.flight-icon').exists();
  });
  test('it should have aria-label on the button element if isIconOnly is set to true', async function (assert) {
    await render(
      hbs`<Hds::Button @text="copy to clipboard" @icon="clipboard-copy" @isIconOnly=true />`
    );
    assert.dom('button').hasAria('label', 'copy to clipboard');
  });
});

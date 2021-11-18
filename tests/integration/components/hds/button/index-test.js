import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/button/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with the defined text', async function (assert) {
    await render(hbs`<Hds::Button @text="Copy to Clipboard" />`);
    assert.dom(this.element).hasText('Copy to Clipboard');
  });
  test('it should render a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Button @text="Copy to Clipboard" />`);
    assert.dom('button').hasClass('hds-button');
  });
  test('it should render the medium size if no size is defined', async function (assert) {
    await render(hbs`<Hds::Button @text="click me" />`);
    assert.dom('button').hasClass('hds-button--size-medium');
  });
  test('it should render an icon if an icon name is passed', async function (assert) {
    await render(
      hbs`<Hds::Button @text="Copy to Clipboard" @icon="clipboard-copy" />`
    );
    assert.dom('svg.flight-icon').exists();
  });
  test('it should have aria-label if isIconOnly is set to true', async function (assert) {
    await render(
      hbs`<Hds::Button @text="copy to clipboard" @icon="clipboard-copy" @isIconOnly=true />`
    );
    assert.dom('button').hasAria('label', 'copy to clipboard');
  });
});

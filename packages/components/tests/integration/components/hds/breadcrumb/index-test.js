import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/breadcrumb/index', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the breadcrumb container', async function (assert) {
    await render(hbs`<Hds::Breadcrumb />`);
    assert.dom(this.element).exists();
  });
  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Breadcrumb id="test-breadcrumb" />`);
    assert.dom('#test-breadcrumb').hasClass('hds-breadcrumb');
  });

  test('it should render the correct CSS color class if the @itemsCanWrap prop is declared', async function (assert) {
    await render(
      hbs`<Hds::Breadcrumb @itemsCanWrap={{true}} id="test-breadcrumb" />`
    );
    assert.dom('#test-breadcrumb').hasClass('hds-breadcrumb--items-can-wrap');
  });

  // A11Y

  test('it should render with the correct semantic tags and aria attributes', async function (assert) {
    assert.expect(3);
    await render(hbs`<Hds::Breadcrumb id="test-breadcrumb" />`);
    assert.dom('#test-breadcrumb').hasTagName('nav');
    assert.dom('#test-breadcrumb').hasAria('label', 'breadcrumbs');
    assert.dom('#test-breadcrumb > ol').exists();
  });
});

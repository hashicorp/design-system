import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/breadcrumb/truncation', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the breadcrumb truncation', async function (assert) {
    await render(hbs`<Hds::Breadcrumb::Truncation />`);
    assert.dom(this.element).exists();
  });

  // TOGGLE

  test('it should render a toggle button', async function (assert) {
    await render(
      hbs`<Hds::Breadcrumb::Truncation id="test-breadcrumb-truncation" />`
    );
    assert.dom('#test-breadcrumb-truncation button').exists();
  });

  // CONTENT

  test('it should not render the content', async function (assert) {
    await render(
      hbs`<Hds::Breadcrumb::Truncation id="test-breadcrumb-truncation" />`
    );
    assert
      .dom('#test-breadcrumb-truncation .hds-breadcrumb__truncation-content')
      .doesNotExist();
  });
  test('it should yield (and render) the content', async function (assert) {
    assert.expect(3);
    await render(
      hbs`<Hds::Breadcrumb::Truncation id="test-breadcrumb-truncation"><a id="test-breadcrumb-truncation-link" href="#">test</a></Hds::Breadcrumb::Truncation>`
    );
    await click('#test-breadcrumb-truncation button');
    assert.dom('.hds-breadcrumb__truncation-content').exists();
    assert.dom('.hds-breadcrumb__truncation-content > ol').exists();
    assert.dom('a#test-breadcrumb-truncation-link').exists();
  });
});

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/pagination/nav/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the component', async function (assert) {
      await render(hbs`<Hds::Pagination::Nav />`);
      assert.dom(this.element).exists();
    });

    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Pagination::Nav id="test-pagination-nav" />`
      );
      assert.dom('#test-pagination-nav').hasClass('hds-pagination-nav');
    });
  }
);

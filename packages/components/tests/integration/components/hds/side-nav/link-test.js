import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/index', function (hooks) {
  setupRenderingTest(hooks);

  // Basic

  test('it renders the component', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::Link @label="Terraform" @icon="terraform" @href="#" />`
    );
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::Link @label="Terraform" @icon="terraform" @href="#" />`
    );
    assert.dom('.hds-side-nav__list-item-link').exists();
  });

  // Test Content / Args

  test('it renders the passed in args', async function (assert) {
    await render(
      hbs`<Hds::SideNav::List::Link @icon="boundary" @label="Boundary" @count="3" @badge="Alpha" @hasSubItems={{true}} />`
    );
    assert.dom('.flight-icon-boundary').exists();
    assert.dom('.hds-side-nav__list-item-label').hasText('Boundary');
    assert.dom('.hds-badge-count').hasText('3');
    assert.dom('.hds-badge').hasText('Alpha');
    assert.dom('.flight-icon-chevron-right').exists();
  });

  test('it renders the passed in custom content', async function (assert) {
    await render(hbs`
      <Hds::SideNav::List::Link @label="Terraform" @hasSubItems={{true}}>
        <Hds::BadgeCount @type="inverted" @size="small" @color="neutral-dark-mode" @text="2" />
        <Hds::Badge @type="inverted" @size="small" @color="success" @text="Beta" />
      </Hds::SideNav::List::Link>
    `);
    assert.dom('.hds-side-nav__list-item-label').hasText('Terraform');
    assert
      .dom('.hds-badge-count--color-neutral-dark-mode')
      .exists()
      .hasText('2');
    assert.dom('.hds-badge--color-success').exists().hasText('Beta');
  });
});

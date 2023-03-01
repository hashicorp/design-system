import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/side-nav/index', function (hooks) {
  setupRenderingTest(hooks);

  // Basic:

  test('it renders the component', async function (assert) {
    await render(hbs`<Hds::SideNav::Wrapper />`);
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::SideNav::Wrapper id="test-side-nav" />`);
    assert.dom('#test-side-nav').hasClass('hds-side-nav__wrapper');
  });

  test('it should spread all the attributes passed to the component', async function (assert) {
    await render(
      hbs`<Hds::SideNav::Wrapper id="test-side-nav" data-test="test" />`
    );
    assert.dom('#test-side-nav').hasAttribute('data-test', 'test');
  });

  // Test Content:

  // Header
  test('it renders content passed to the header', async function (assert) {
    await render(hbs`
      <Hds::SideNav::Wrapper>
        <:header>
          <Hds::SideNav::Header>
            <:logo>
              <Hds::SideNav::HomeLink @icon="hashicorp" @text="HashiCorp" @href="#" />
            </:logo>
            <:actions>
              <Hds::Dropdown class="hds-side-nav__dropdown" as |dd|>
                <dd.ToggleIcon @icon="help" @text="settings menu" />
                <dd.Title @text="Signed In" />
                <dd.Description @text="email@domain.com" />
                <dd.Separator />
                <dd.Interactive @href="#" @text="Settings and Preferences" />
              </Hds::Dropdown>
              <Hds::Dropdown class="hds-side-nav__dropdown" as |dd|>
                <dd.ToggleIcon @icon="user" @text="user menu" />
                <dd.Title @text="Signed In" />
                <dd.Description @text="email@domain.com" />
                <dd.Interactive @href="#" @text="Account Settings" />
              </Hds::Dropdown>
            </:actions>
          </Hds::SideNav::Header>
        </:header>
      </Hds::SideNav::Wrapper>
    `);

    assert.dom('.hds-side-nav__wrapper-header .hds-side-nav-header').exists();
    assert.dom('.hds-side-nav-header__logo').exists();
    assert.dom('.hds-disclosure').exists({ count: 2 });
  });

  // Body
  test('it renders content passed to the body', async function (assert) {
    await render(hbs`
      <Hds::SideNav::Wrapper>
        <:body>
          <Hds::SideNav::Section as |S|>
            <S.Link @icon="dashboard" @label="Dashboard" />
          </Hds::SideNav::Section>

          <Hds::SideNav::Section as |S|>
            <S.Title>Services</S.Title>
            <S.Link @label="Boundary" @icon="boundary" @href="#" />
            <S.Link @label="Consul" @icon="consul" @href="#" />
            <S.Link @label="Packer" @icon="packer" @href="#" />
            <S.Link @label="Vault" @icon="vault" @href="#" />
            <S.Link @label="Vault Secrets" @icon="lock" @href="#" />
            <S.Link @label="Terraform" @icon="terraform" @href="#" />
            <S.Link @label="Vagrant" @icon="vagrant" @badge="Alpha" @href="#" />
            <S.Link @label="Waypoint" @icon="waypoint" @badge="Alpha" @hasSubItems={{true}} />
          </Hds::SideNav::Section>
        </:body>
      </Hds::SideNav::Wrapper>
    `);
    assert.dom('.hds-side-nav__wrapper-body').exists();
    assert.dom('.hds-side-nav__section').exists({ count: 2 });
    assert
      .dom('.hds-side-nav__section:nth-child(2) .hds-side-nav__section-title')
      .exists()
      .hasText('Services');
    assert
      .dom('.hds-side-nav__section:nth-child(2) .hds-side-nav__list-item')
      .exists({ count: 8 });
  });

  // Footer
  test('it renders content passed to the footer', async function (assert) {
    await render(hbs`
      <Hds::SideNav::Wrapper>
        <:footer>
          footer content
        </:footer>
      </Hds::SideNav::Wrapper>
    `);
    assert.dom('.hds-side-nav__wrapper-footer').exists();
    assert.dom('.hds-side-nav__wrapper-footer').hasText('footer content');
  });
});

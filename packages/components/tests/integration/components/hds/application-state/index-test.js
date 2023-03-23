import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/application-state/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(hbs`
      <Hds::ApplicationState id="test-application-state">
        template block text
      </Hds::ApplicationState>
    `);

      assert.dom('#test-application-state').hasClass('hds-application-state');
    });

    test('if @errorCode is defined, a class should be applied for error message styling', async function (assert) {
      await render(hbs`
      <Hds::ApplicationState @errorCode="404" id="test-application-state" />
    `);

      assert.dom('.hds-application-state--error').exists();
    });

    test('if @hasDivider is set to true, a class should be applied to render a visual divider', async function (assert) {
      await render(hbs`
      <Hds::ApplicationState @hasDivider={{true}} id="test-application-state" />
    `);

      assert.dom('.hds-application-state--has-divider').exists();
    });
  }
);

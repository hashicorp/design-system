import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/application-state/body',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::ApplicationState::Body id="test-application-state-body" />`
      );

      assert
        .dom('#test-application-state-body')
        .hasClass('hds-application-state__body');
    });

    test('it should render the yielded content', async function (assert) {
      await render(
        hbs`<Hds::ApplicationState::Body id="test-application-state-body">
        <pre>test</pre>
      </Hds::ApplicationState::Body>`
      );
      assert.dom('#test-application-state-body > pre').exists();
      assert.dom('#test-application-state-body > pre').hasText('test');
    });
  }
);

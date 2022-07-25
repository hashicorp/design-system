import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/stepper/indicator/task',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the task indicator', async function (assert) {
      await render(hbs`<Hds::Stepper::Indicator::Task @status="incomplete" />`);
      assert.dom(this.element).exists();
    });
    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Task id="test-stepper-indicator-task" @status="incomplete" />`
      );
      assert
        .dom('#test-stepper-indicator-task')
        .hasClass('hds-stepper-indicator-task');
    });
  }
);

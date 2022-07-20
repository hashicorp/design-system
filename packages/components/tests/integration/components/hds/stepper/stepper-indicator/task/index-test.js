import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/stepper/stepper-indicator/task/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the component', async function (assert) {
      await render(hbs`<Hds::Stepper::StepperIndicator::Task />`);
      assert.dom(this.element).exists();
    });
    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Stepper::StepperIndicator::Task id="test-stepper-stepper-indicator-task" />`
      );
      assert
        .dom('#test-stepper-stepper-indicator-task')
        .hasClass('hds-stepper-stepper-indicator-task');
    });
  }
);

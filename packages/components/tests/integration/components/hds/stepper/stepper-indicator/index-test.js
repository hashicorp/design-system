import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/stepper/stepper-indicator/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the component', async function (assert) {
      await render(hbs`<Hds::Stepper::StepperIndicator />`);
      assert.dom(this.element).exists();
    });
    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Stepper::StepperIndicator id="test-stepper-stepper-indicator" />`
      );
      assert
        .dom('#test-stepper-stepper-indicator')
        .hasClass('hds-stepper-stepper-indicator');
    });
  }
);

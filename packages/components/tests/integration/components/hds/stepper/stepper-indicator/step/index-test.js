import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/stepper/stepper-indicator/step/index',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the component', async function (assert) {
      await render(hbs`<Hds::Stepper::StepperIndicator::Step />`);
      assert.dom(this.element).exists();
    });
    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Stepper::StepperIndicator::Step id="test-stepper-indicator" />`
      );
      assert.dom('#test-stepper-indicator').hasClass('hds-stepper-indicator');
    });
  }
);

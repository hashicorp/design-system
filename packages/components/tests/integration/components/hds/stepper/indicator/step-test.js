import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/stepper/indicator/step',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the step indicator', async function (assert) {
      await render(hbs`<Hds::Stepper::Indicator::Step @text="1" @status="incomplete" />`);
      assert.dom(this.element).exists();
    });
    test('it should render with a CSS class that matches the component name', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Step id="test-stepper-indicator-step" @text="1" @status="incomplete" />`
      );
      assert
        .dom('#test-stepper-indicator-step')
        .hasClass('hds-stepper-indicator-step');
    });
  }
);

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | hds/stepper/indicator/step',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders the step indicator', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Step @text="1" @status="incomplete" />`
      );
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

    // IS INTERACTIVE
  
    test('it should render the non-interactive variant by default', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Step id="test-stepper-indicator-step" @status="incomplete" @test="1" />`
      )
      // Is there a way to test if an element DOESN'T have a class?
      assert.dom('#test-stepper-indicator-step').hasClass('hds-stepper-indicator-step')
    });

    test('it should render the interactive variant if passed the isInteractive property', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Step id="test-stepper-indicator-step" @status="incomplete" @isInteractive={{true}} />`
      )
      assert.dom('#test-stepper-indicator-step').hasClass('hds-stepper-indicator-step--is-interactive');
    })

    // STATUS

    // -- NON INTERACTIVE

    test('it should render the correct status if the @status="incomplete" prop is declared', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Step id="test-stepper-indicator-step" @status="incomplete" />`
      );
      assert.dom('#test-stepper-indicator-step').hasClass('hds-stepper-indicator-step--status-incomplete')
    })
    test('it should render the correct status if the @status="progress" prop is declared', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Step id="test-stepper-indicator-step" @status="progress" />`
      );
      assert.dom('#test-stepper-indicator-step').hasClass('hds-stepper-indicator-step--status-progress')
    })
    test('it should render the correct status if the @status="processing" prop is declared', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Step id="test-stepper-indicator-step" @status="processing" />`
      );
      assert.dom('#test-stepper-indicator-step').hasClass('hds-stepper-indicator-step--status-processing')
    })
    test('it should render the correct status if the @status="complete" prop is declared', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Step id="test-stepper-indicator-step" @status="complete" />`
      );
      assert.dom('#test-stepper-indicator-step').hasClass('hds-stepper-indicator-step--status-complete')
    })

    // -- INTERACTIVE

    test('it should render the correct status if the @status="incomplete" prop is declared', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Step id="test-stepper-indicator-step" @status="incomplete" @isInteractive={{true}} />`
      );
      assert.dom('#test-stepper-indicator-step').hasClass('hds-stepper-indicator-step--status-incomplete').hasClass('hds-stepper-indicator-step--is-interactive')
    })
    test('it should render the correct status if the @status="progress" prop is declared', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Step id="test-stepper-indicator-step" @status="progress" @isInteractive={{true}} />`
      );
      assert.dom('#test-stepper-indicator-step').hasClass('hds-stepper-indicator-step--status-progress').hasClass('hds-stepper-indicator-step--is-interactive')
    })
    test('it should render the correct status if the @status="processing" prop is declared', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Step id="test-stepper-indicator-step" @status="processing" @isInteractive={{true}} />`
      );
      assert.dom('#test-stepper-indicator-step').hasClass('hds-stepper-indicator-step--status-processing').hasClass('hds-stepper-indicator-step--is-interactive')
    })
    test('it should render the correct status if the @status="complete" prop is declared', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Step id="test-stepper-indicator-step" @status="complete" @isInteractive={{true}} />`
      );
      assert.dom('#test-stepper-indicator-step').hasClass('hds-stepper-indicator-step--status-complete').hasClass('hds-stepper-indicator-step--is-interactive')
    })    

    // TEXT

    test('it should render text within the indicator if the @text prop is declared', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Step id="test-stepper-indicator-step" @status="incomplete" @text="1" />`
      );
      assert.dom('#test-stepper-indicator-step').hasText('1');
    });

    // ICON

    test('it should render a flight icon if the @status="processing" prop is declared', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Step id="test-stepper-indicator-step" @status="processing" />`
      );
      assert.dom(this.element.querySelector('.flight-icon.flight-icon-loading')).exists();
    })
  }
);

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

    // IS INTERACTIVE

    test('it should render the non-interactive variant by default', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Task id="test-stepper-indicator-task" @status="incomplete" />`
      );
      assert
        .dom('#test-stepper-indicator-task')
        .hasClass('hds-stepper-indicator-task');
    });

    test('it should render the interactive variant if passed the isInteractive property', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Task id="test-stepper-indicator-task" @status="incomplete" @isInteractive={{true}} />`
      );
      assert
        .dom('#test-stepper-indicator-task')
        .hasClass('hds-stepper-indicator-task--is-interactive');
    });

    // STATUS

    // -- NON INTERACTIVE

    test('it should render the correct task status if the @status="incomplete" prop is declared', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Task id="test-stepper-indicator-task" @status="incomplete" />`
      );
      assert
        .dom('#test-stepper-indicator-task')
        .hasClass('hds-stepper-indicator-task--status-incomplete');
    });

    // -- INTERACTIVE

    test('it should render the correct status if the @status="incomplete" prop is declared', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Task id="test-stepper-indicator-task" @status="incomplete" @isInteractive={{true}} />`
      );
      assert
        .dom('#test-stepper-indicator-task')
        .hasClass('hds-stepper-indicator-task--status-incomplete')
        .hasClass('hds-stepper-indicator-task--is-interactive');
    });

    // ICON

    test('it should render a flight icon for any of the variants', async function (assert) {
      await render(
        hbs`<Hds::Stepper::Indicator::Task id="test-stepper-indicator-task" @status="processing" />`
      );
      assert
        .dom(this.element.querySelector('.flight-icon.flight-icon-loading'))
        .exists();
    });
  }
);

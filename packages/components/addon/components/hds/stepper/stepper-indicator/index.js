import Component from '@glimmer/component';
import { assert } from '@ember/debug';

// export const DEFAULT_STATUS = 'incomplete'
// export const DEFAULT_TYPE = 'step'
// export const DEFAULT_NUMBER = '1'

export const STATUSES = ["incomplete", "inProgress", "complete"];

export const TYPES = ["step", "task"];

export default class HdsStepperStepperIndicatorIndexComponent extends Component {
  /**
   * @param status
   * @type {string}
   * @default "incomplete"
   */

  get status() {
    let { status = "incomplete" } = this.args;

    assert(
      `@status for "Hds::Stepper::Indicator" must be one of the following: ${STATUSES.join(", ")}, received: ${status}`,
      STATUSES.includes(status)
    );

    return status;
  }

  /**
   * @param stepNumber
   * @type {string}
   * @default '1'
   */

  get stepNumber() {
    let { stepNumber = "1" } = this.args;

    return stepNumber;
  }

  /**
   * @param type
   * @type {string}
   * @default "step"
   */

  get type() {
    let { type = "step" } = this.args;

    return type;
  }

  /**
   * @param isProcessing
   * @type {boolean}
   * @default false
   */

  get isProcessing() {
    let { isProcessing = false } = this.args;

    return isProcessing;
  }

  /**
   * @param isInteractive
   * @type {boolean}
   * @default true
   */

  get isInteractive() {
    let { isInteractive = true } = this.args;

    return isInteractive;
  }

  /**
   * Get the class names to apply to the component.
   * @method StepperIndicator#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ["hds-stepper-indicator"];

    // add a class based on the @xxx argument
    // classes.push(`hds-stepper-stepper-indicator--[variant]-${this.xxx}`);

    // Based on the @status arg
    classes.push(`hds-stepper-indicator--status-${this.status}`);

    // Based on boolean isProcessing arg
    if (this.isProcessing) {
      classes.push(`hds-stepper-indicator--isProcessing`)
    };

    if (this.isInteractive) {
      classes.push(`isInteractive`)
    };

    return classes.join(" ");
  }
}

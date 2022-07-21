import Component from '@glimmer/component';
import { assert } from '@ember/debug'

export const DEFAULT_STATUS = "incomplete";
export const DEFAULT_INTERACTIVE = false;

export const STATUSES = ["incomplete", "progress", "processing", "complete"];

export default class HdsStepperStepperIndicatorTaskIndexComponent extends Component {

  /**
   * @param status
   * @type {string}
   * @default "incomplete"
   */

  get status() {
    let { status = DEFAULT_STATUS } = this.args;

    assert(
      `@status for "Hds::Stepper::Indicator::Task" must be one of the following: ${STATUSES.join(
        ', '
      )}, received: ${status}`,
      STATUSES.includes(status)
    );

    return status;
  }

  /**
   * @param isInteractive
   * @type {boolean}
   * @default false
   */

  get isInteractive() {
    let { isInteractive = DEFAULT_INTERACTIVE } = this.args;

    return isInteractive;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-stepper-indicator-task'];

    classes.push(`hds-stepper-indicator-task--status-${this.status}`);

    if (this.isInteractive) {
      classes.push(`hds-stepper-indicator-task--is-interactive`);
    }

    return classes.join(' ');
  }
}

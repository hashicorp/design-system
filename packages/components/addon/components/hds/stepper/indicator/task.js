import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_STATUS = 'incomplete';
export const STATUSES = ['incomplete', 'progress', 'processing', 'complete'];

export default class HdsStepperIndicatorTaskIndexComponent extends Component {
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
    return this.args.isInteractive || false;
  }

  /**
   * @param iconName
   * @type {string}
   */

  get iconName() {
    let status = this.args.status;

    // Check the status using a ternary operator and returning a icon name value
    const value =
      status === 'incomplete'
        ? 'circle'
        : status === 'progress'
        ? 'circle-half'
        : status === 'processing'
        ? 'loading'
        : status === 'complete'
        ? 'check-circle'
        : null;

    return value;
  }

  /**
   * Get the class names to apply to the component.
   * @method IndicatorTask#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-stepper-indicator-task'];

    // Based on the @status arg
    classes.push(`hds-stepper-indicator-task--status-${this.status}`);

    if (this.isInteractive) {
      classes.push(`hds-stepper-indicator-task--is-interactive`);
    }

    return classes.join(' ');
  }
}

import Component from '@glimmer/component';
import { assert } from '@ember/debug'

export const DEFAULT_STATUS = 'incomplete';
export const DEFAULT_NUMBER = '1';

export const STATUS = [
  'incomplete',
  'inProgress',
  'complete',
]

export default class HdsStepperStepperIndicatorIndexComponent extends Component {

  /**
   * @param status
   * @type {string}
   * @default 'incomplete'
   */

  get status() {
    let { status = DEFAULT_STATUS } = this.args

    assert(
      `@status for "Hds::Stepper::Indicator" must be one of the following: ${STATUS.join(', ')}, received: ${status}`,
      STATUS.includes(status)
    )

    return status
  }

  /**
   * @param number
   * @type {string}
   * @default '1'
   */

  get number() {
    let { number = DEFAULT_NUMBER } = this.args;

    return number
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-stepper-indicator'];

    // add a class based on the @xxx argument
    // classes.push(`hds-stepper-stepper-indicator--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}

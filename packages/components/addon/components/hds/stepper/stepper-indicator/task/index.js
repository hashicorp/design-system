import Component from '@glimmer/component';

export default class HdsStepperStepperIndicatorTaskIndexComponent extends Component {
  // UNCOMMENT THIS IF YOU NEED A CONSTRUCTOR
  // constructor() {
  //   super(...arguments);
  //   // ADD YOUR ASSERTIONS HERE
  // }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-stepper-stepper-indicator-task'];

    // add a class based on the @xxx argument
    // classes.push(`hds-stepper-stepper-indicator-task--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}

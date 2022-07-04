import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { getElementId } from '../utils/getElementId';
import { getAriaDescribedBy } from '../utils/getAriaDescribedBy';

export default class HdsFormFieldsetIndexComponent extends Component {
  @tracked ariaDescribedBy = getAriaDescribedBy(this);
  @tracked descriptors = [];
  @tracked isRequired = this.args.isRequired;

  @action
  appendDescriptor(element) {
    this.descriptors.push(element.id);
    this.ariaDescribedBy = getAriaDescribedBy(this);
  }

  /**
   * Sets the layout of the group
   *
   * @param layout
   * @type {enum}
   * @default 'vertical'
   */
  get layout() {
    return this.args.layout ?? 'vertical';
  }

  /**
   * Calculates the unique ID to assign to the fieldset
   */
  get id() {
    return getElementId(this);
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    // we just need a class for the layout
    let classes = ['hds-form-group'];

    // add a class based on the @layout argument
    classes.push(`hds-form-group--layout-${this.layout}`);

    return classes.join(' ');
  }
}

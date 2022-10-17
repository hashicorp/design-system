import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { getElementId } from '../form/utils/getElementId';

export const DEFAULT_SIZE = 'regular';
export const DEFAULT_TYPE = 'neutral';
export const SIZES = ['small', 'regular', 'large'];
export const TYPES = ['neutral', 'warning', 'critical'];

export default class HdsDialogIndexComponent extends Component {
  @action
  setupDialog(element) {
    // Store a reference of the `<dialog>` element
    this.element = element;

    // Register "onClose" callback function to be called when a native 'close' event is dispatched
    this.element.addEventListener('close', () => {
      if (this.args.onClose && typeof this.args.onClose === 'function') {
        this.args.onClose();
      }
    });

    // If the modal dialog is set to be open and it is not already open
    if (this.args.isOpen && !this.element.open) {
      this.openDialog();
    }
  }

  @action
  onClick(event) {
    // This may seem counterintuitive, but the <dialog> element is the target only when the backdrop is clicked
    // otherwise the target would be a child of the <dialog>
    if (event.target === this.element) {
      this.closeDialog();
    }
  }

  @action
  openDialog() {
    // Make modal dialog visible using the native `showModal` method
    this.element.showModal();

    // Call "onOpen" callback function
    if (this.args.onOpen && typeof this.args.onOpen === 'function') {
      this.args.onOpen();
    }
  }

  @action
  closeDialog() {
    // Make modal dialog invisible using the native `close` method
    this.element.close();
  }

  /**
   * Sets the size of the dialog
   * Accepted values: small, regular, large
   *
   * @param size
   * @type {string}
   * @default 'regular'
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Dialog" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * Sets the type of the dialog
   * Accepted values: neutral, warning, critical
   *
   * @param type
   * @type {string}
   * @default 'neutral'
   */
  get type() {
    let { type = DEFAULT_TYPE } = this.args;

    assert(
      `@type for "Hds::Dialog" must be one of the following: ${TYPES.join(
        ', '
      )}; received: ${type}`,
      TYPES.includes(type)
    );

    return type;
  }

  /**
   * Calculates the unique ID to assign to the title
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
    let classes = ['hds-dialog'];

    // add a class based on the @size argument
    classes.push(`hds-dialog--size-${this.size}`);

    // add a class based on the @type argument
    classes.push(`hds-dialog--type-${this.type}`);

    return classes.join(' ');
  }
}

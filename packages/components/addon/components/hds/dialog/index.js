import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { getElementId } from '../form/utils/getElementId';
import { tracked } from '@glimmer/tracking';

export const DEFAULT_SIZE = 'medium';
export const DEFAULT_COLOR = 'neutral';
export const SIZES = ['small', 'medium', 'large'];
export const COLORS = ['neutral', 'warning', 'critical'];

export default class HdsDialogIndexComponent extends Component {
  @tracked isActive = false;
  @action
  setupDialog(element) {
    // Store a reference of the `<dialog>` element
    this.element = element;

    // Register "onClose" callback function to be called when a native 'close' event is dispatched
    this.element.addEventListener('close', () => {
      this.isActive = false;

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
    this.isActive = true;

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
   * Accepted values: small, medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
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
   * Sets the color of the dialog
   * Accepted values: neutral, warning, critical
   *
   * @param color
   * @type {string}
   * @default 'neutral'
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Dialog" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
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

    // add a class based on the @color argument
    classes.push(`hds-dialog--color-${this.color}`);

    return classes.join(' ');
  }
}

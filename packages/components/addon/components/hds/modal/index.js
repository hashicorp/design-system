import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { getElementId } from '../form/utils/getElementId';
import { tracked } from '@glimmer/tracking';

export const DEFAULT_SIZE = 'medium';
export const DEFAULT_COLOR = 'neutral';
export const SIZES = ['small', 'medium', 'large'];
export const COLORS = ['neutral', 'warning', 'critical'];

export default class HdsModalIndexComponent extends Component {
  @tracked isOpen = false;

  /**
   * Sets the size of the modal dialog
   * Accepted values: small, medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Modal" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * Sets the color of the modal dialog
   * Accepted values: neutral, warning, critical
   *
   * @param color
   * @type {string}
   * @default 'neutral'
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Modal" must be one of the following: ${COLORS.join(
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
    let classes = ['hds-modal'];

    // add a class based on the @size argument
    classes.push(`hds-modal--size-${this.size}`);

    // add a class based on the @color argument
    classes.push(`hds-modal--color-${this.color}`);

    return classes.join(' ');
  }

  @action
  setup(element) {
    // Store a reference of the `<dialog>` element
    this.element = element;

    // Register `<dialog>` element for polyfilling
    if (!element.showModal && window.dialogPolyfill) {
      window.dialogPolyfill.registerDialog(element);
      // This unscoped class is defined in the dialog polyfill: https://github.com/GoogleChrome/dialog-polyfill/blob/master/dist/dialog-polyfill.css#L33
      element.classList.add('fixed');
    }

    // Register "onClose" callback function to be called when a native 'close' event is dispatched
    this.element.addEventListener('close', () => {
      this.isOpen = false;

      if (this.args.onClose && typeof this.args.onClose === 'function') {
        this.args.onClose();
      }
    });

    // If the modal dialog is not already open
    if (!this.element.open) {
      this.open();
    }
  }

  @action
  open() {
    // Make modal dialog visible using the native `showModal` method
    this.element.showModal();
    this.isOpen = true;

    // Call "onOpen" callback function
    if (this.args.onOpen && typeof this.args.onOpen === 'function') {
      this.args.onOpen();
    }
  }

  @action
  close() {
    // Make modal dialog invisible using the native `close` method
    this.element.close();
  }
}

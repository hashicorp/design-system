import Emitter from 'tiny-emitter';
import CopyToClipboard from './actions/CopyToClipboard';

/**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */
class Clipboard extends Emitter {
  /**
   * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
   * @param {Object} options
   */
  constructor(trigger, text, target, onSuccess, onError) {
    super();
    this.text = text;
    this.target = target;
    this.onSuccess = onSuccess;
    this.onError = onError;
    this.listenClick(trigger);
  }

  /**
   * Adds a click event listener to the passed trigger.
   * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
   */
  listenClick(trigger) {
    this.listener = trigger.addEventListener('click', (e) => this.onClick(e));
  }

  /**
   * Defines a new `ClipboardAction` on each click event.
   * @param {Event} e
   */
  onClick(e) {
    const trigger = e.delegateTarget || e.currentTarget;
    const success = CopyToClipboard(this.text, this.target);

    // Fires an event based on the copy operation result.
    const args = {
      triggger: trigger,
      text: this.text,
      target: this.target,
    };
    if (success) {
      this.onSuccess(args);
    } else {
      this.onError(args);
    }
  }

  /**
   * Returns the support for `navigator.clipboard`
   * See: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard
   */
  static isSupported() {
    return !!navigator.clipboard;
  }

  /**
   * Destroy lifecycle.
   */
  destroy() {
    this.listener.destroy();
  }
}

export default Clipboard;

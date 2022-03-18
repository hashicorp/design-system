import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export default class HdsAlertIndexComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method Alert#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  // "hds-alert"
  get classNames() {
    let classes = ['hds-alert'];

    // TODO: Add type classes, once type implemented
    return classes;
  }

  /**
   * @param icon
   * @type {string}
   * @default null
   * @description The name of the icon to be used.
   */
  get icon() {
    return this.args.icon ?? null;
  }

  /**
   * @param title
   * @type {string}
   * @description The text of the title.
   */
  get title() {
    let { title } = this.args;

    assert(
      '@title for "Hds::Alert" must have a valid value',
      title !== undefined
    );

    return title;
  }

  /**
   * @param body
   * @type {string}
   * @description The text of the body.
   */
  get body() {
    let { body } = this.args;

    return body ?? null;
  }
}

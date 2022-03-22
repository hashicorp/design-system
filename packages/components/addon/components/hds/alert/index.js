import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export default class HdsAlertIndexComponent extends Component {
  constructor() {
    super(...arguments);

    assert(
      `you need to pass @title or @description to the "Hds::Alert" component`,
      !(this.args.title === undefined && this.args.description === undefined)
    );
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
}

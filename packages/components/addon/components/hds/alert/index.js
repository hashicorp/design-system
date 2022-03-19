import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export default class HdsAlertIndexComponent extends Component {
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
   * We need a title or description to exist
   * @method Alert#entity
   * @return {object} { title, description }
   */
  get entity() {
    let entity = { title: this.args.title, description: this.args.description };

    if (this.args.title === undefined && this.args.description === undefined) {
      assert(
        `you need to pass @title or @description to the "Hds::Alert" component`,
        !(this.args.title === undefined && this.args.description === undefined)
      );
    }

    if (this.args.title) {
      entity.title = this.args.title;
    }
    if (this.args.description) {
      entity.description = this.args.description;
    }

    return entity;
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

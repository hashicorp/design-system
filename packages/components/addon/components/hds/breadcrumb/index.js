import Component from '@glimmer/component';

const noop = () => {};

export default class HdsBreadcrumbComponent extends Component {
  /**
   * @param registerContainer
   * @type {function}
   * @default () => {}
   */
  get registerContainer() {
    // TODO discuss with Matthew if this is the right way to create a guard for this method
    return this.args.registerContainer ?? noop;
  }

  /**
   * @param itemsCanWrap
   * @type {boolean}
   * @default true
   */
  get itemsCanWrap() {
    return this.args.itemsCanWrap ?? true;
  }

  /**
   * Get the class names to apply to the component.
   * @method Breadcrumb#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-breadcrumb'];

    // add a class based on the @itemsCanWrap argument
    if (this.itemsCanWrap) {
      classes.push('hds-breadcrumb--items-can-wrap');
    }

    return classes.join(' ');
  }
}

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const TYPES = ['numbered', 'compact'];

export default class HdsPaginationBarIndexComponent extends Component {
  // UNCOMMENT THIS IF YOU NEED A CONSTRUCTOR
  // constructor() {
  //   super(...arguments);
  //   // ADD YOUR ASSERTIONS HERE
  // }

  /**
   * Shows totalItems if true
   *
   * @param hasTotalItems
   * @type {boolean}
   * @default true
   */
  get hasTotalItems() {
    return this.args.hasTotalItems ?? true;
  }

  /**
   * Gets the type
   *
   * @param type
   * @type {string}
   * @default 'numbered'
   */
  get type() {
    let { type } = this.args;

    assert(
      `@type for "Hds::PaginationBar" must be one of the following: ${TYPES.join(
        ', '
      )}; received: ${type}`,
      TYPES.includes(type) || type === undefined
    );

    return type ?? 'numbered';
  }

  /**
   * Shows the TotalCount if true
   *
   * @param showTotalCount
   * @type {boolean}
   * @default true
   */
  get showTotalCount() {
    return this.args.showTotalCount ?? true;
  }

  /**
   * Shows the PageSize if true
   *
   * @param showPageSize
   * @type {boolean}
   * @default true
   */
  get showPageSize() {
    return this.args.showPageSize ?? true;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-pagination-bar'];

    // add a class based on the @xxx argument
    // classes.push(`hds-pagination--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}

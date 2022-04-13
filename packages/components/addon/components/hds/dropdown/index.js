import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_POSITION = 'right';
export const POSITIONS = ['right', 'left'];

export default class HdsDropdownIndexComponent extends Component {
  /**
   * @param listPosition
   * @type {string}
   * @default primary
   * @description Determines the position of the "list"
   */
  get listPosition() {
    let { listPosition = DEFAULT_POSITION } = this.args;

    assert(
      `@listPosition for "Hds::Dropdown::Index" must be one of the following: ${POSITIONS.join(
        ', '
      )}; received: ${listPosition}`,
      POSITIONS.includes(listPosition)
    );

    return listPosition;
  }

  /**
   * Get the class names to apply to the "list"
   * @method DropdownIndex#listClassNames
   * @return {string} The "class" attribute to apply to the "list" element
   */
  get listClassNames() {
    let classes = ['hds-dropdown-list'];

    // add a class based on the @listPosition argument
    classes.push(`hds-dropdown-list--position-${this.listPosition}`);

    // add a class based on the @width argument
    if (this.args.width) {
      classes.push('hds-dropdown-list--fixed-width');
    }

    return classes.join(' ');
  }
}

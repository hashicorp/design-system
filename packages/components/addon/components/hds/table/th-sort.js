import Component from '@glimmer/component';
import { assert } from '@ember/debug';

const NOOP = () => {};
const ALIGNMENTS = ['left', 'center', 'right'];
const DEFAULT_ALIGN = 'left';

export default class HdsTableThSortComponent extends Component {
  /**
   * @param ariaSort
   * @type {string}
   * @private
   * @description Sets the aria-sort attribute based on the sort order defined
   */
  get ariaSort() {
    if (this.args.isSorted) {
      return this.args.sortOrder === 'asc' ? 'ascending' : 'descending';
    } else {
      return undefined;
    }
  }

  /**
   * @param icon
   * @type {string}
   * @private
   * @default swap-vertical
   * @description Determines which icon to use based on the sort order defined
   */
  get icon() {
    if (this.args.isSorted && this.args.sortOrder) {
      return this.args.sortOrder === 'asc' ? 'arrow-up' : 'arrow-down';
    } else {
      return 'swap-vertical';
    }
  }

  /**
   * @param align
   * @type {string}
   * @default left
   * @description Determines the text alignment of the header or cell content. Options are: "left", "center", "right". If no align is defined, "left" is used.
   */
  get align() {
    let { align = DEFAULT_ALIGN } = this.args;

    assert(
      `@align for "Hds::Table" must be one of the following: ${ALIGNMENTS.join(
        ', '
      )}; received: ${align}`,
      ALIGNMENTS.includes(align)
    );
    return align;
  }

  /**
   * @param onClick
   * @type {function}
   * @default () => {}
   */
  get onClick() {
    let { onClick } = this.args;
    return onClick || NOOP;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-table__th-sort'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`.hds-table__th-sort--text-${this.align}`);
    }

    return classes.join(' ');
  }
}

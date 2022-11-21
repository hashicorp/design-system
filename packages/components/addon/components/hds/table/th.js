import Component from '@glimmer/component';

export default class HdsTableThComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-table__th'];
    // add a class based on the @alignRight argument (if present)
    if (this.args.alignRight) {
      classes.push(`hds-table__th--text-right`);
    }

    return classes.join(' ');
  }
}

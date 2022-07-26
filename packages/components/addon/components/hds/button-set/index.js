import Component from '@glimmer/component';
// import { assert } from '@ember/debug';

export default class HdsButtonSetIndexComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-button-set'];

    return classes.join(' ');
  }
}

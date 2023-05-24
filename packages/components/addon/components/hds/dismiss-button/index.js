import Component from '@glimmer/component';

export default class HdsDismissButtonIndexComponent extends Component {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Dismiss'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'Dismiss';
  }
}

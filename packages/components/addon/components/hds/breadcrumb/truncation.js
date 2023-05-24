import Component from '@glimmer/component';

export default class HdsBreadcrumbTruncationComponent extends Component {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'show more'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'show more';
  }
}

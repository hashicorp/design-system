import Component from '@glimmer/component';

export default class DocBannerComponent extends Component {
  get icon() {
    let icon;
    switch (this.args.type) {
      case 'info':
      case 'information':
        icon = 'info';
        break;
      case 'warning':
        icon = 'alert-triangle';
        break;
      case 'critical':
        icon = 'alert-diamond';
        break;
      case 'insight':
        icon = 'bulb';
        break;
      default:
        break;
    }
    return icon;
  }

  get classNames() {
    let classes = ['doc-banner'];

    // add a class based on the @type argument
    classes.push(`doc-banner--type-${this.args.type}`);

    return classes.join(' ');
  }
}

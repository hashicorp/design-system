import Component from '@glimmer/component';

export default class DocDoDontComponent extends Component {
  get label() {
    let label;
    switch (this.args.type) {
      case 'do':
        label = 'Do';
        break;
      case 'dont':
        label = 'Dont';
        break;
      default:
        break;
    }
    return label;
  }

  get classNames() {
    let classes = ['doc-do-dont'];

    // add a class based on the @type argument
    classes.push(`doc-do-dont--type-${this.args.type}`);

    return classes.join(' ');
  }
}

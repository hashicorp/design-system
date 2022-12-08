import Component from '@glimmer/component';
export default class DocBadgeComponent extends Component {
  get type() {
    return this.args.type ?? 'neutral';
  }

  get classNames() {
    let classes = ['doc-badge'];

    // add a class based on the @type argument
    classes.push(`doc-badge--type-${this.type}`);

    return classes.join(' ');
  }
}

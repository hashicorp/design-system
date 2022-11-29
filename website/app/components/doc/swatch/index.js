import Component from '@glimmer/component';

export default class DocSwatchComponent extends Component {
  get title() {
    return this.args.title;
  }

  get values() {
    return this.args.values;
  }

  get classNames() {
    let classes = ['doc-swatch'];

    return classes.join(' ');
  }
}

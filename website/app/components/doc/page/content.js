import Component from '@glimmer/component';

export default class DocPageContentComponent extends Component {
  get classNames() {
    let classes = ['doc-page-content'];

    // add a class based on the @breakthrough argument
    if (this.args.breakthrough) {
      classes.push(`doc-page-content--breakthrough`);
    }

    return classes.join(' ');
  }
}

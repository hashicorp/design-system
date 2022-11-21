import Component from '@glimmer/component';

export default class DocCardsDeckComponent extends Component {
  get cols() {
    return this.args.cols ?? '2';
  }
  get classNames() {
    let classes = ['doc-cards-deck'];

    // add a class based on the @color argument
    classes.push(`doc-cards-deck--layout-${this.cols}cols`);

    return classes.join(' ');
  }
}

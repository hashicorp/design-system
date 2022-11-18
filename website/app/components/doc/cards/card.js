import Component from '@glimmer/component';

export default class DocCardsCardComponent extends Component {
  get classNames() {
    let classes = ['doc-cards-card'];

    // add a class based on the @xxx argument
    // classes.push(`doc-cards-card--xxx-${this.xxx}`);

    return classes.join(' ');
  }
}

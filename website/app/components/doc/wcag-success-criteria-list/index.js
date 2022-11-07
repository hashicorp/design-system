import Component from '@glimmer/component';

export default class DocWcagSuccessCriteriaListComponent extends Component {
  get items() {
    return this.args.items ? this.args.items.split('|') : [];
  }
}

import Component from '@glimmer/component';

export default class DocLinkWithIconComponent extends Component {
  get models() {
    // we need to use this trick to overcome the problem of `<LinkTo>` going beserk if we pass
    // a `@model` argument which is undefined (while an empty `@models` array is OK)
    if (this.args.model) {
      return [this.args.model];
    } else if (this.args.models) {
      return this.args.models;
    } else {
      return [];
    }
  }
}

import Component from '@glimmer/component';

export default class DocBannerComponent extends Component {
  get classNames() {
    let classes = ['doc-banner'];
    return classes.join(' ');
  }
}

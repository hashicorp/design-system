import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class DummyTableOfContentsComponent extends Component {
  get leftPadStyle() {
    return htmlSafe(`padding-left:${this.args.level}em;`);
  }
}

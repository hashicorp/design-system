import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class DummyTableOfContentsComponent extends Component {
  get sortedTocs() {
    return this.args.tocs.sort((a, b) => {
      // index at the top always
      if(a.title === 'index' && b.title !== 'index') {
        return -1;
      }

      if(b.title === 'index' && a.title !== 'index') {
        return 1;
      }

      return a.title.localeCompare(b.title);
    });
  }

  get leftPadStyle() {
    return htmlSafe(`padding-left:${this.args.level}em;`);
  }
}
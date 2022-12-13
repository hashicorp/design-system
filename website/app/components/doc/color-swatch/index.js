import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class DocColorSwatchComponent extends Component {
  get colorName() {
    return this.args.color.colorName;
  }

  get cssVariable() {
    return this.args.color.cssVariable;
  }

  get cssHelper() {
    return this.args.color.cssHelper ?? false;
  }

  get hexValue() {
    return this.args.color.value;
  }

  get cardStyle() {
    let style = '';
    style += `background-color: ${this.hexValue};`;
    return htmlSafe(style);
  }
}

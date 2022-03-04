import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class DummyColorCardIndexComponent extends Component {
  get colorName() {
    return this.args.color.colorName;
  }

  get cssVariable() {
    return this.args.color.cssVariable;
  }

  get cssHelper() {
    return this.args.color.cssHelper ?? false;
  }

  get colorValue() {
    return this.args.color.value;
  }

  get contrastYIQ() {
    let r, g, b, a;
    if (this.colorValue.match(/^rgb/)) {
      const parts = this.colorValue.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      );
      [r, g, b] = parts;
      a = parts[3] ?? 1;
    } else if (this.colorValue.match(/^#([0-9a-fA-F]{2}){3}$/)) {
      r = parseInt(this.colorValue.substr(1, 2), 16);
      g = parseInt(this.colorValue.substr(3, 2), 16);
      b = parseInt(this.colorValue.substr(5, 2), 16);
      a = 1;
    } else if (this.colorValue.match(/^#([0-9a-fA-F]{2}){4}$/)) {
      r = parseInt(this.colorValue.substr(1, 2), 16);
      g = parseInt(this.colorValue.substr(3, 2), 16);
      b = parseInt(this.colorValue.substr(5, 2), 16);
      a = parseInt(this.colorValue.substr(7, 2), 16);
    }
    // we multiply by the "alpha" value to take in account colors with opacity
    const yiq = ((r * 299 + g * 587 + b * 114) / 1000) * a;
    return yiq;
  }

  get cardStyle() {
    let style = '';
    style += `color: ${this.contrastYIQ >= 128 ? '#000' : '#FFF'};`;
    style += `background-color: ${this.colorValue};`;
    return htmlSafe(style);
  }
}

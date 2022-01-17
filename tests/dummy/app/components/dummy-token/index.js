import Component from '@glimmer/component';

export default class DummyPlaceholderIndexComponent extends Component {
  get token() {
    let { token } = this.args;
    return token;
  }
  get colorPreviewStyle() {
    return this.token.isColor ? `color: ${this.token.value}` : undefined;
  }
}
